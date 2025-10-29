import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import DropdownComponent from './DropdownComponent';
import OpportunityCard from './OportunityCard';
import { DateRangePicker } from './CalanderInputComponent';

export interface Opportunity {
  id: string;
  title: string;
  location: string;
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
      opportunities(page: ${page}, per_page: ${perPage}, filters: {
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
        ${filters.category ? `programmes: ${categoryMap[filters.category] || 0},` : ''}
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

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

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

          if (diffInDays >= 7) {
            const weeks = Math.round(diffInDays / 7);
            duration = `${weeks} week${weeks > 1 ? 's' : ''}`;
          } else {
            duration = `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
          }
        }

        const program = op.programmes?.[0]?.short_name_display;
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
          location: op.home_lc?.name || 'Unknown',
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
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [sdg, setSdg] = useState('');
  const [workfield, setWorkfield] = useState('');
  const [startOfStartDateRange, setStartOfStartDateRange] = useState('');
  const [endOfStartDateRange, setEndOfStartDateRange] = useState('');
  const [startOfEndDateRange, setStartOfEndDateRange] = useState('');
  const [endOfEndDateRange, setEndOfEndDateRange] = useState('');

  const sdgOptions = [
    { value: 'no-poverty', label: 'No Poverty' },
    { value: 'zero-hunger', label: 'Zero Hunger' },
    { value: 'good-health', label: 'Good Health' },
    { value: 'quality-education', label: 'Quality Education' },
    { value: 'gender-equality', label: 'Gender Equality' },
    { value: 'clean-water', label: 'Clean Water' },
    { value: 'affordable-energy', label: 'Affordable Energy' },
    { value: 'decent-work', label: 'Decent Work' },
    { value: 'industry-innovation', label: 'Industry Innovation' },
    { value: 'reduced-inequalities', label: 'Reduced Inequalities' },
    { value: 'sustainable-cities', label: 'Sustainable Cities' },
    { value: 'responsible-consumption', label: 'Responsible Consumption' },
    { value: 'climate-action', label: 'Climate Action' },
    { value: 'life-below-water', label: 'Life Below Water' },
    { value: 'life-on-land', label: 'Life on Land' },
    { value: 'peace-justice', label: 'Peace Justice' },
    { value: 'partnerships-for-goals', label: 'Partnerships for Goals' },
  ];

  const workFieldOptions = [
    { value: '54', label: 'Business Administration' },
    { value: '55', label: 'Information Technology' },
    { value: '56', label: 'Marketing' },
    { value: '57', label: 'Engineering' },
    { value: '59', label: 'Finance' },
    { value: '60', label: 'Business Development' },
    { value: '58', label: 'Other' },
  ];

  const locationOptions = [
    { value: 'COLOMBO CENTRAL', label: 'Colombo Central' },
    { value: 'COLOMBO NORTH', label: 'Colombo North' },
    { value: 'COLOMBO SOUTH', label: 'Colombo South' },
    { value: 'KANDY', label: 'Kandy' },
    { value: 'NIBM', label: 'NIBM' },
    { value: 'NSBM', label: 'NSBM' },
    { value: 'RAJARATA', label: 'Rajarata' },
    { value: 'RUHUNA', label: 'Ruhuna' },
    { value: 'SLIIT', label: 'SLIIT' },
    { value: 'USJ', label: 'USJ' },
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

  const handleSearch = async () => {

    console.log('Starting search with filters:', {
      startOfStartDateRange,
      endOfStartDateRange,
      startOfEndDateRange,
      endOfEndDateRange,
      category,
    }); 
    // Validate required fields
    if (!startOfStartDateRange || !endOfStartDateRange || !category) {
      setError('Please select a category and complete the Start Date Range');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const apiData = await fetchOpportunities({
        startOfStartDateRange,
        endOfStartDateRange,
        startOfEndDateRange,
        endOfEndDateRange,
        category,
      });
      setResults(apiData);
      setFilteredResults(apiData);
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

        <div className="flex flex-col gap-y-[20px]">
          {/* Opportunity Search */}
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
                            opportunity.location.toLowerCase().includes(query.toLowerCase()) ||
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
                <div className="md:col-span-2">
                  <DropdownComponent label="Select Category" options={categoryOptions} selectedOption={category} onSelect={setCategory} />
                </div>
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

                <Button
                  onClick={handleSearch}
                  className="w-full bg-primary text-black hover:bg-primary/90 focus:bg-primary/90 text-md md:col-span-2"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Opportunities'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
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
        </div>
      </div>
    </section>
  );
};

export default OpportunitySearch;