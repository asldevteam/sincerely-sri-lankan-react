import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Search, Users } from 'lucide-react';
import { useState } from 'react';
import DropdownComponent from './DropdownComponent';
import { Calendar22 } from './CalanderInputComponent';
import OpportunityCard from './OportunityCard';

export interface Opportunity {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  participants: string;
  category: string;
  description: string;
  slots: { id: number; startingDate: string; endDate: string }[];
  applyLink: string;
}


const searchResults: Opportunity[] = [
  {
    id: '4',
    title: 'Teaching English',
    location: 'Ella',
    date: 'Jan 25, 2025',
    duration: '5 days',
    participants: '8 spots',
    category: 'Education',
    description: 'Teach English to local school children',
    slots:[
      { id:1, startingDate:'2025/01/25', endDate:'2025/01/30' }
     
    ],
    applyLink: 'https://example.com/apply-teaching-english'

  },
  {
    id: '5',
    title: 'Organic Farming',
    location: 'Nuwara Eliya',
    date: 'Feb 1, 2025',
    duration: '1 week',
    participants: '12 spots',
    category: 'Agriculture',
    description: 'Learn and help with organic tea farming',
    slots:[
      { id:1, startingDate:'2025/02/01', endDate:'2025/02/08' },
      { id:2, startingDate:'2025/03/05', endDate:'2025/03/12' },
      {id: 3, startingDate:'2025/04/10', endDate:'2025/04/17' },
      {id:4, startingDate:'2025/05/01', endDate:'2025/05/08' },
      {id:5, startingDate:'2025/06/10', endDate:'2025/06/17' },
      {id:6, startingDate:'2025/07/15', endDate:'2025/07/22' },
      {id:7, startingDate:'2025/08/05', endDate:'2025/08/12' },
      {id:8, startingDate:'2025/09/10', endDate:'2025/09/17' }
    ],
    applyLink: 'https://example.com/apply-organic-farming'
  },
  {
    id: '6',
    title: 'Community Art Project',
    location: 'Galle',
    date: 'Feb 10, 2025',
    duration: '4 days',
    participants: '20 spots',
    category: 'Arts',
    description: 'Create murals with local artists',
    slots:[
      { id:1, startingDate:'2025/02/10', endDate:'2025/02/14' },
      { id:2, startingDate:'2025/03/15', endDate:'2025/03/19' },
      {id:3, startingDate:'2025/04/20', endDate:'2025/04/24' }
    ],
    applyLink: 'https://example.com/apply-community-art'
  },
  {
    id: '7',
    title: 'Eco-Tourism Guide Training',
    location: 'Sigiriya',
    date: 'Feb 15, 2025',
    duration: '3 days',
    participants: '15 spots',
    category: 'Tourism',
    description: 'Train to become a certified eco-tourism guide',
    slots:[
      { id:1, startingDate:'2025/02/15', endDate:'2025/02/18' },
      { id:2, startingDate:'2025/03/20', endDate:'2025/03/23' },
      {id:3, startingDate:'2025/04/25', endDate:'2025/04/28' }
    ],
    applyLink: 'https://example.com/apply-eco-tourism'
  }
];

const OpportunitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');




  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const locationOptions = ["Mirissa Beach", "Kandy", "Yala National Park", "Ella", "Nuwara Eliya", "Galle", "Sigiriya"]
  const durationOptions = ["1 day", "2 days", "3 days", "1 week", "2 weeks"]
  const categoryOptions = ["Education", "Agriculture", "Arts", "Tourism"]
  return (
    <section id="opportunities" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Find Your Opportunity
        </h2>

        <div className="flex flex-col gap-y-[20px] ">



          {/* Opportunity Search */}
          <div className="lg:col-span-2 mb-[20px]">
            <div className='text-[25px] font-bold mb-[20px]'>Search for more opportunities
            </div>
            <Card className='pt-[25px]'>

              <CardContent className="space-y-4">
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
                  <Button>Search</Button>
                </div>

                <div

                  className="w-full bg-primary text-black text-center p-2 rounded-md "

                >
                  Advanced Options
                </div>


                <div className="grid md:grid-cols-2 gap-4 p-4 border border-border rounded-lg animate-fade-in">

                  <DropdownComponent
                    label="Location"
                    options={locationOptions}
                    selectedOption={location}
                    onSelect={setLocation}
                  />

            <Calendar22
            label='Start Date'
            date={startDate ? new Date(startDate) : undefined}
            setDate={(date) => setStartDate(date ? date.toISOString().split('T')[0] : '')}
            
            />

                  <DropdownComponent
                    label="Duration"
                    options={durationOptions}
                    selectedOption={duration}
                    onSelect={setDuration}
                  />

                  <DropdownComponent
                    label="Category"
                    options={categoryOptions}
                    selectedOption={category}
                    onSelect={setCategory}
                  />
                </div>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Results */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Search Results</h3>
          <div className="flex flex-col max-h-[600px] border-white rounded-xl overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
<div className='flex flex-col gap-y-[10px] pr-[10px]'>
    
            {searchResults.map((result) => (
              <OpportunityCard key={result.id} opportunity={result} />
            ))}
           </div>    </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySearch;
