import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import DropdownComponent from './DropdownComponent';

import OpportunityCard from './OportunityCard';
import { CalendarInput } from './CalanderInputComponent';


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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sdg, setSdg] = useState('');
  const [startOfStartDateRange, setStartOfStartDateRange] = useState('');
  const [endOfStartDateRange, setEndOfStartDateRange] = useState('');
  const [startOfEndDateRange, setStartOfEndDateRange] = useState('');
  const [endOfEndDateRange, setEndOfEndDateRange] = useState('');


  const [workfield, setWorkfield] = useState('');
  const [category, setCategory] = useState('');
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

  const categoryOptions = [
    { value: 'GV', label: 'GV' },
    { value: 'GTa', label: 'GTa' },
    { value: 'Gte', label: 'GTe' },
  ];
  return (
    <section id="opportunities" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Find Your Opportunity
        </h2>

        <div className="flex flex-col gap-y-[20px] ">
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');


  const handleSearch = async () => {
    // Validate required fields
    if (!startOfStartDateRange || !endOfStartDateRange || !startOfEndDateRange || !endOfEndDateRange || !category) {
      setError('Please fill in all date range fields and select a category');
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
    } catch (err) {
      console.error('Error fetching API data:', err);
      setError('Failed to fetch opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const locationOptions = ['COLOMBO CENTRAL','COLOMBO NORTH','COLOMBO SOUTH','KANDY','NIBM','NSBM','RAJARATA','RUHUNA','SLIIT','USJ'];
  const durationOptions = ['1 day', '2 days', '3 days', '1 week', '2 weeks'];
  const categoryOptions = ['GV', 'GTa', 'GTe'];

  return (
      <section id="opportunities" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Find Your Opportunity</h2>

          <div className="flex flex-col gap-y-[20px] ">
            {/* Opportunity Search */}
            <div className="lg:col-span-2 mb-[20px]">
              <Card className="pt-[25px]">
                <CardContent className="space-y-4">
                  {error && (
                      <div className="text-red-500 text-center">{error}</div>
                  )}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                          placeholder="Search opportunities..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">
                    <DropdownComponent label="Select Location" options={locationOptions} selectedOption={location} onSelect={setLocation} />
                    <DropdownComponent label="Select Duration" options={durationOptions} selectedOption={duration} onSelect={setDuration} />
                    <div className="lg:col-span-2">
                      <DropdownComponent label="Select Category" options={categoryOptions} selectedOption={category} onSelect={setCategory} />
                    </div>

                    <CalendarInput
                        label="Start of Start Date Range"
                        date={startOfStartDateRange ? new Date(startOfStartDateRange) : undefined}
                        setDate={(date) => setStartOfStartDateRange(date ? date.toISOString().split('T')[0] : '')}
                    />
                <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">
                  <div className='lg:col-span-2'>
                    <CalendarInput
                        label="End of Start Date Range"
                        date={endOfStartDateRange ? new Date(endOfStartDateRange) : undefined}
                        setDate={(date) => setEndOfStartDateRange(date ? date.toISOString().split('T')[0] : '')}
                    />

                    <CalendarInput
                        label="Start of End Date Range"
                        date={startOfEndDateRange ? new Date(startOfEndDateRange) : undefined}
                        setDate={(date) => setStartOfEndDateRange(date ? date.toISOString().split('T')[0] : '')}
                    />

                    <CalendarInput
                        label="End of End Date Range"
                        date={endOfEndDateRange ? new Date(endOfEndDateRange) : undefined}
                        setDate={(date) => setEndOfEndDateRange(date ? date.toISOString().split('T')[0] : '')}
                    />
                  </div>
                  <CalendarInput
                    label='Start of Start Date Range'
                    date={startOfStartDateRange ? new Date(startOfStartDateRange) : undefined}
                    setDate={(date) => setStartOfStartDateRange(date ? date.toISOString().split('T')[0] : '')}
                  />



                  <CalendarInput
                    label='End of Start Date Range'
                    date={endOfStartDateRange ? new Date(endOfStartDateRange) : undefined}
                    setDate={(date) => setEndOfStartDateRange(date ? date.toISOString().split('T')[0] : '')}
                  />


                  <CalendarInput
                    label='Start of End Date Range'
                    date={startOfEndDateRange ? new Date(startOfEndDateRange) : undefined}
                    setDate={(date) => setStartOfEndDateRange(date ? date.toISOString().split('T')[0] : '')}
                  />

                  <CalendarInput
                    label='End of End Date Range'
                    date={endOfEndDateRange ? new Date(endOfEndDateRange) : undefined}
                    setDate={(date) => setEndOfEndDateRange(date ? date.toISOString().split('T')[0] : '')}
                  />

                        {category=="GV" && <DropdownComponent
                      label="SDG"
                      options={sdgOptions}
                      selectedOption={sdg}
                      onSelect={setSdg}
                    />}


                   { 
                   
                   category== "GTa" &&<DropdownComponent
                      label="Work Field"
                      options={workFieldOptions}
                      selectedOption={workfield}
                      onSelect={setWorkfield}
                    />
                    
                    }
                  <Button
                      onClick={handleSearch}
                      className="w-full bg-primary text-black hover:bg-primary/90 focus:bg-primary/90 text-md"
                      disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search Opportunities'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

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
                    {results.length > 0 ? (
                        results.map((result) => (
                            <OpportunityCard key={result.id} opportunity={result} />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No opportunities found. Please try searching with different filters.</p>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>
      </section>
  );
};

export default OpportunitySearch;