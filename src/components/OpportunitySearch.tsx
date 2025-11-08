import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useState } from 'react';
import DropdownComponent from './DropdownComponent';
import OpportunityCard from './OportunityCard';
import { DateRangePicker } from './CalanderInputComponent';

export interface Opportunity {
  id: string;
  title: string;
  committee: string;
  date: string;
  duration: string;
  participants: string;
  category: string;
  description: string;
  slots: { id: number; startingDate: string; endDate: string; name: string; openings: number }[];
  applyLink: string;
}

// ---------------- Fetch Logic ----------------
const GRAPHQL_ENDPOINT = 'https://gis-api.aiesec.org/graphql';
const AUTH_TOKEN = '4fwM3iqTizYG_WWnzXOA5nuuUwwNnxeGd2unjQO85fQ';

async function fetchOpportunities(filters: {
  startOfStartDateRange: string;
  endOfStartDateRange: string;
  startOfEndDateRange: string;
  endOfEndDateRange: string;
  category: string;
  sdg?: string[];
  committee?: string[];
  workField?: string[];
  background?: string[];
}): Promise<Opportunity[]> {
  let page = 1;
  const perPage = 1000;
  let allOpportunities: Opportunity[] = [];

  // Map category to programme ID
  const categoryMap: { [key: string]: number } = {
    GV: 7,
    GTa: 8,
    GTe: 9,
  };

  while (true) {
    const query = `query {
      opportunities(page: ${page}, per_page: ${perPage}, 
      filters: {
        status: "open",
        committee: 1623,
        earliest_start_date: {
          from: "${filters.startOfStartDateRange}",
          to: "${filters.endOfStartDateRange}"
        },
        latest_end_date: {
          from: "${filters.startOfEndDateRange}",
          to: "${filters.endOfEndDateRange}"
        },
        ${filters.category ? `programmes: [${categoryMap[filters.category] || 0}],` : ''}
        ${filters.sdg && filters.sdg.length > 0 ? `sdg_goals: [${filters.sdg.join(', ')}],` : ''}
        ${filters.committee && filters.committee.length > 0 ? `committee_scope: [${filters.committee.join(', ')}],` : ''}
        ${filters.background && filters.background.length > 0 ? `background_ids: [${filters.background.join(', ')}],` : ''}
        ${filters.workField && filters.workField.length > 0 ? `sub_products: [${filters.workField.join(', ')}],` : ''}
      }) {
        data {
          id
          title
          status
          programmes { short_name_display }
          openings
          home_lc { name }
          slots {
            title
            start_date
            end_date
            openings
          }
        }
        paging {
          total_pages
          current_page
        }
      }
    }`;

    console.log(query);

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH_TOKEN,
      },
      body: JSON.stringify({ query }),
    });
    console.log("response",response);

    if (!response.ok) {
      console.error("GraphQL request failed with HTTP code:", response.status);
      break;
    }

    const raw = await response.text();
    console.log("Raw API response:", raw);

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Response not JSON (see raw above)");
      break;
    }

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      break;
    }

    const opportunities = data?.data?.opportunities?.data || [];
    console.log("opportunities", opportunities);
    const paging = data?.data?.opportunities?.paging;

    const mapped: Opportunity[] = opportunities
      .filter((op: any) => op.openings && op.openings > 0)
      .map((op: any) => {
        let duration = 'N/A';
        if (op.slots?.[0]?.start_date && op.slots?.[0]?.end_date) {
          const startDate = new Date(op.slots[0].start_date);
          const endDate = new Date(op.slots[0].end_date);
          const diffInMs = endDate.getTime() - startDate.getTime();
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

          console.log("start end diffinM ", startDate, endDate, diffInMs, diffInMs);
          if (diffInDays >= 7) {
            const weeks = Math.round(diffInDays / 7);
            duration = `${weeks} week${weeks > 1 ? 's' : ''}`;
          } else {
            duration = `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
          }
        }

        const program = op.programmes?.[0]?.short_name_display;
        console.log("program",program);
        let programSegment: string;
        switch (program) {
          case 'GTa':
            programSegment = 'global-talent';
            break;
          case 'GTe':
            programSegment = 'global-teacher';
            break;
          case 'GV':
            programSegment = 'global-volunteer';
            break;
          default:
            programSegment = 'opportunity';
        }

        return {
          id: op.id,
          title: op.title,
          committee: op.home_lc?.name || 'Unknown',
          date: op.slots?.[0]?.start_date || '',
          duration,
          participants: `${op.openings} spots`,
          category: op.programmes?.[0]?.short_name_display || 'N/A',
          description: '',
          slots: (op.slots || []).map((s: any, idx: number) => ({
            id: idx,
            startingDate: s.start_date,
            endDate: s.end_date,
            name: s.title,
            openings: s.openings,
          })),
          applyLink: `https://aiesec.org/opportunity/${programSegment}/${op.id}`,
        };
      });

    allOpportunities = allOpportunities.concat(mapped);

    if (paging?.current_page >= paging?.total_pages) {
      break;
    }
    page++;
  }

  return allOpportunities;
}

// ---------------- Component ----------------
const OpportunitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Opportunity[]>([]);
  const [filteredResults, setFilteredResults] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [committee, setLocation] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [activeTab, setActiveTab] = useState('GV');
  const [sdg, setSdg] = useState<string[]>([]);
  const [background, setBackground] = useState<string[]>([]);
  const [workField, setWorkfield] = useState<string[]>([]);
  const [startOfStartDateRange, setStartOfStartDateRange] = useState('');
  const [endOfStartDateRange, setEndOfStartDateRange] = useState('');
  const [startOfEndDateRange, setStartOfEndDateRange] = useState('');
  const [endOfEndDateRange, setEndOfEndDateRange] = useState('');

  const sdgOptions = [
    { value: '11101', label: 'No Poverty' },
    { value: '11102', label: 'Zero Hunger' },
    { value: '11103', label: 'Good Health' },
    { value: '11104', label: 'Quality Education' },
    { value: '11105', label: 'Gender Equality' },
    { value: '11106', label: 'Clean Water' },
    { value: '11107', label: 'Affordable Energy' },
    { value: '11108', label: 'Decent Work' },
    { value: '11109', label: 'Industry Innovation' },
    { value: '11110', label: 'Reduced Inequalities' },
    { value: '11111', label: 'Sustainable Cities' },
    { value: '11112', label: 'Responsible Consumption' },
    { value: '11113', label: 'Climate Action' },
    { value: '11114', label: 'Life Below Water' },
    { value: '11115', label: 'Life on Land' },
    { value: '11116', label: 'Peace Justice' },
    { value: '11117', label: 'Partnerships for Goals' },
  ];

  const workFieldOptions = [
    { value: '54', label: 'Business Administration' },
    { value: '55', label: 'Information Technology' },
    { value: '56', label: 'Marketing' },
    { value: '57', label: 'Engineering' },
    { value: '58', label: 'Other' },
    { value: '60', label: 'Business Development' },
    { value: '59', label: 'Finance' }
  ];

  const locationOptions = [
    { value: '222', label: 'Colombo Central' },
    { value: '872', label: 'Colombo North' },
    { value: '1340', label: 'Colombo South' },
    { value: '2204', label: 'Kandy' },
    { value: '4535', label: 'NIBM' },
    { value: '2186', label: 'NSBM' },
    { value: '5490', label: 'Rajarata' },
    { value: '2175', label: 'Ruhuna' },
    { value: '2188', label: 'SLIIT' },
    { value: '221', label: 'USJ' }
  ];

  const durationOptions = [
    { value: '1 day', label: '1 Day' },
    { value: '2 days', label: '2 Days' },
    { value: '3 days', label: '3 Days' },
    { value: '1 week', label: '1 Week' },
    { value: '2 weeks', label: '2 Weeks' },
  ];

  const categoryOptions = [
    { value: 'GV', label: 'Global Volunteer' },
    { value: 'GTa', label: 'Global Talent' },
    { value: 'GTe', label: 'Global Teacher' },
  ];

  const backgroundOptions = [
    { value: 'arts-humanities', label: 'Arts/Humanities Background' },
    { value: 'business', label: 'Business Background' },
    { value: 'education', label: 'Education Background' },
    { value: 'engineering', label: 'Engineering Background' },
    { value: 'european', label: 'European' },
    { value: 'female', label: 'Female' },
    { value: 'it-computer-science', label: 'IT/Computer Science Background' },
    { value: 'law', label: 'Law Background' },
    { value: 'male', label: 'Male' },
    { value: 'medical-health', label: 'Medical/Health Background' },
    { value: 'non-asian', label: 'Non-Asian' },
    { value: 'science', label: 'Science Background' },
    { value: 'social-sciences', label: 'Social Sciences Background' },
  ];

  const handleSearch = async (category: string) => {

    console.log('Starting search with filters:', {
      startOfStartDateRange,
      endOfStartDateRange,
      startOfEndDateRange,
      endOfEndDateRange,
      category,
    });
    // Validate required fields
    if (!startOfStartDateRange || !endOfStartDateRange) {
      setError('Please complete the Start Date Range');
      return;
    }

    setError(null);
    setLoading(true);
    console.log(workField)

    try {
      const apiData = await fetchOpportunities({
        startOfStartDateRange,
        endOfStartDateRange,
        startOfEndDateRange,
        endOfEndDateRange,
        category,
        sdg,
        committee,
        workField,
        background,
      });
      console.log("apidata start of start",apiData[startOfStartDateRange])
      console.log("apidata end of start",apiData[endOfStartDateRange])
      console.log("apidata start of end",apiData[startOfEndDateRange])
      console.log("apidata end of end",apiData[endOfEndDateRange])
      setResults(apiData);
      console.log("results",results);
      setFilteredResults(apiData);
      console.log("")
      console.log("filtered results before",apiData);
    } catch (err) {
      console.error('Error fetching API data:', err);
      setError('Failed to fetch opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="opportunities" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Find Your Opportunity</h2>

        <Tabs defaultValue="GV" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="GV">Global Volunteer</TabsTrigger>
            <TabsTrigger value="GTa">Global Talent</TabsTrigger>
            <TabsTrigger value="GTe">Global Teacher</TabsTrigger>
          </TabsList>

          <TabsContent value="GV" className="space-y-[20px]">
            <Card className="pt-[25px]">
              <CardContent className="space-y-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={results.length > 0 ? "Search opportunities..." : "Use filters first to get results, then search"}
                      value={searchQuery}
                      onChange={(e) => {
                        const query = e.target.value;
                        setSearchQuery(query);

                        if (results.length > 0) {
                          if (query.trim() === '') {
                            setFilteredResults(results);
                          } else {
                            const filtered = results.filter(opportunity =>
                              opportunity.title.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.committee.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.category.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.description.toLowerCase().includes(query.toLowerCase())
                            );
                            setFilteredResults(filtered);
                            console.log("filtered results after", filteredResults);

                          }
                        }
                      }}
                      className="pl-10"
                      disabled={results.length === 0}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">
                  <DateRangePicker
                    label="Start Date Range"
                    startDate={startOfStartDateRange ? new Date(startOfStartDateRange + 'T00:00:00') : undefined}
                    endDate={endOfStartDateRange ? new Date(endOfStartDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfStartDateRange(`${year}-${month}-${day}`)
                      } else {
                        setStartOfStartDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfStartDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfStartDateRange('')
                      }
                    }}
                  />

                  <DateRangePicker
                    label="End Date Range"
                    startDate={startOfEndDateRange ? new Date(startOfEndDateRange + 'T00:00:00') : undefined}
                    endDate={endOfEndDateRange ? new Date(endOfEndDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setStartOfEndDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfEndDateRange('')
                      }
                    }}
                  />

                  <DropdownComponent label="Select Local Entity (Optional)" options={locationOptions} selectedOption={committee} onSelect={(selectedIds) => setLocation(selectedIds)} />
                  <DropdownComponent label="Select SDG Goal (Optional)" options={sdgOptions} selectedOption={sdg}   onSelect={(selectedIds) => setSdg(selectedIds)} />

                  <Button
                    onClick={() => handleSearch('GV')}
                    className="w-full bg-primary text-black hover:bg-primary/90 focus:bg-primary/90 text-md md:col-span-2"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search Opportunities'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6">Search Results</h3>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                  <span className="ml-4 text-lg text-muted-foreground">Loading opportunities...</span>
                </div>
              ) : (
                <div className="flex flex-col max-h-[600px] border-white rounded-xl overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
                  <div className="flex flex-col gap-y-[10px] pr-[10px]">
                    {results.length === 0 ? (
                      <p className="text-center text-muted-foreground">No opportunities found. Please try searching with different filters.</p>
                    ) : filteredResults.length > 0 ? (
                      filteredResults.map((result) => <OpportunityCard key={result.id} opportunity={result} />)
                    ) : (
                      <p className="text-center text-muted-foreground">No opportunities match your search. Try different keywords.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="GTa" className="space-y-[20px]">
            <Card className="pt-[25px]">
              <CardContent className="space-y-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={results.length > 0 ? "Search opportunities..." : "Use filters first to get results, then search"}
                      value={searchQuery}
                      onChange={(e) => {
                        const query = e.target.value;
                        setSearchQuery(query);

                        if (results.length > 0) {
                          if (query.trim() === '') {
                            setFilteredResults(results);
                          } else {
                            const filtered = results.filter(opportunity =>
                              opportunity.title.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.committee.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.category.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.description.toLowerCase().includes(query.toLowerCase())
                            );
                            setFilteredResults(filtered);
                           console.log("filtered results after", filteredResults);

                          }
                        }
                      }}
                      className="pl-10"
                      disabled={results.length === 0}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">
                  <DateRangePicker
                    label="Start Date Range"
                    startDate={startOfStartDateRange ? new Date(startOfStartDateRange + 'T00:00:00') : undefined}
                    endDate={endOfStartDateRange ? new Date(endOfStartDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfStartDateRange(`${year}-${month}-${day}`)
                      } else {
                        setStartOfStartDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfStartDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfStartDateRange('')
                      }
                    }}
                  />

                  <DateRangePicker
                    label="End Date Range"
                    startDate={startOfEndDateRange ? new Date(startOfEndDateRange + 'T00:00:00') : undefined}
                    endDate={endOfEndDateRange ? new Date(endOfEndDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setStartOfEndDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfEndDateRange('')
                      }
                    }}
                  />

                  <DropdownComponent label="Select Local Entity (Optional)" options={locationOptions} selectedOption={committee} onSelect={(selectedIds) => setLocation(selectedIds)} />


                  <DropdownComponent label="Select Background (Optional)" options={backgroundOptions} selectedOption={background} onSelect={(selectedIds) => setBackground(selectedIds)} />

                  <DropdownComponent label="Select Work Field (Optional)" options={workFieldOptions} selectedOption={workField} onSelect={(selectedIds) => setWorkfield(selectedIds)} />

                  <Button
                    onClick={() => handleSearch('GTa')}
                    className="w-full bg-primary text-black hover:bg-primary/90 focus:bg-primary/90 text-md md:col-span-2"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search Opportunities'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6">Search Results</h3>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                  <span className="ml-4 text-lg text-muted-foreground">Loading opportunities...</span>
                </div>
              ) : (
                <div className="flex flex-col max-h-[600px] border-white rounded-xl overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
                  <div className="flex flex-col gap-y-[10px] pr-[10px]">
                    {results.length === 0 ? (
                      <p className="text-center text-muted-foreground">No opportunities found. Please try searching with different filters.</p>
                    ) : filteredResults.length > 0 ? (
                      filteredResults.map((result) => <OpportunityCard key={result.id} opportunity={result} />)
                    ) : (
                      <p className="text-center text-muted-foreground">No opportunities match your search. Try different keywords.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="GTe" className="space-y-[20px]">
            <Card className="pt-[25px]">
              <CardContent className="space-y-4">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={results.length > 0 ? "Search opportunities..." : "Use filters first to get results, then search"}
                      value={searchQuery}
                      onChange={(e) => {
                        const query = e.target.value;
                        setSearchQuery(query);

                        if (results.length > 0) {
                          if (query.trim() === '') {
                            setFilteredResults(results);
                          } else {
                            const filtered = results.filter(opportunity =>
                              opportunity.title.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.committee.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.category.toLowerCase().includes(query.toLowerCase()) ||
                              opportunity.description.toLowerCase().includes(query.toLowerCase())
                            );
                            setFilteredResults(filtered);

                          }
                        }
                      }}
                      className="pl-10"
                      disabled={results.length === 0}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">
                  <DateRangePicker
                    label="Start Date Range"
                    startDate={startOfStartDateRange ? new Date(startOfStartDateRange + 'T00:00:00') : undefined}
                    endDate={endOfStartDateRange ? new Date(endOfStartDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfStartDateRange(`${year}-${month}-${day}`)
                        console.log("Input - Start Date Range - start Date:", startOfStartDateRange); // ✅ log here
                      } else {
                        setStartOfStartDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfStartDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfStartDateRange('')
                      }
                    }}
                  />

                  <DateRangePicker
                    label="End Date Range"
                    startDate={startOfEndDateRange ? new Date(startOfEndDateRange + 'T00:00:00') : undefined}
                    endDate={endOfEndDateRange ? new Date(endOfEndDateRange + 'T00:00:00') : undefined}
                    setStartDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setStartOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setStartOfEndDateRange('')
                      }
                    }}
                    setEndDate={(date) => {
                      if (date) {
                        const year = date.getFullYear()
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        setEndOfEndDateRange(`${year}-${month}-${day}`)
                      } else {
                        setEndOfEndDateRange('')
                      }
                    }}
                  />

                  <DropdownComponent label="Select Local Entity (Optional)" options={locationOptions} selectedOption={committee} onSelect={setLocation} />

                  <DropdownComponent label="Select Background (Optional)" options={backgroundOptions} selectedOption={background} onSelect={setBackground} />

                  <Button
                    onClick={() => handleSearch('GTe')}
                    className="w-full bg-primary text-black hover:bg-primary/90 focus:bg-primary/90 text-md md:col-span-2"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search Opportunities'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6">Search Results</h3>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                  <span className="ml-4 text-lg text-muted-foreground">Loading opportunities...</span>
                </div>
              ) : (
                <div className="flex flex-col max-h-[600px] border-white rounded-xl overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
                  <div className="flex flex-col gap-y-[10px] pr-[10px]">
                    {results.length === 0 ? (
                      <p className="text-center text-muted-foreground">No opportunities found. Please try searching with different filters.</p>
                    ) : filteredResults.length > 0 ? (
                      filteredResults.map((result) => <OpportunityCard key={result.id} opportunity={result} />)
                    ) : (
                      <p className="text-center text-muted-foreground">No opportunities match your search. Try different keywords.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default OpportunitySearch;