import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Search, Users } from 'lucide-react';
import { useState } from 'react';
import DropdownComponent from './DropdownComponent';
import { Calendar22 } from './CalanderInputComponent';

interface Opportunity {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  participants: string;
  category: string;
  description: string;
}

const featuredOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Beach Cleanup Volunteer',
    location: 'Mirissa Beach',
    date: 'Jan 15, 2025',
    duration: '3 hours',
    participants: '20 spots',
    category: 'Environmental',
    description: 'Join us in cleaning up beautiful Mirissa Beach'
  },
  {
    id: '2',
    title: 'Temple Restoration',
    location: 'Kandy',
    date: 'Jan 20, 2025',
    duration: '2 days',
    participants: '15 spots',
    category: 'Cultural',
    description: 'Help restore ancient temple structures'
  },
  {
    id: '3',
    title: 'Wildlife Conservation',
    location: 'Yala National Park',
    date: 'Feb 5, 2025',
    duration: '1 week',
    participants: '10 spots',
    category: 'Nature',
    description: 'Assist in wildlife monitoring and conservation'
  },
  {
    id: '4',
    title: 'Teaching English',
    location: 'Ella',
    date: 'Jan 25, 2025',
    duration: '5 days',
    participants: '8 spots',
    category: 'Education',
    description: 'Teach English to local school children'
  }
];

const searchResults: Opportunity[] = [
  {
    id: '4',
    title: 'Teaching English',
    location: 'Ella',
    date: 'Jan 25, 2025',
    duration: '5 days',
    participants: '8 spots',
    category: 'Education',
    description: 'Teach English to local school children'
  },
  {
    id: '5',
    title: 'Organic Farming',
    location: 'Nuwara Eliya',
    date: 'Feb 1, 2025',
    duration: '1 week',
    participants: '12 spots',
    category: 'Agriculture',
    description: 'Learn and help with organic tea farming'
  },
  {
    id: '6',
    title: 'Community Art Project',
    location: 'Galle',
    date: 'Feb 10, 2025',
    duration: '4 days',
    participants: '20 spots',
    category: 'Arts',
    description: 'Create murals with local artists'
  },
  {
    id: '7',
    title: 'Eco-Tourism Guide Training',
    location: 'Sigiriya',
    date: 'Feb 15, 2025',
    duration: '3 days',
    participants: '15 spots',
    category: 'Tourism',
    description: 'Train to become a certified eco-tourism guide'
  }
];

const OpportunitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
    <Card className="testimonial-card  p-0   hover:border-white hover:border-2 border-2 transition-colors duration-300 hover:shadow-lg">
      <CardContent className=" p-[20px]">
        <div className='flex lg:flex-row justify-between flex-col-reverse'>

       
      
        <h3 className="text-lg font-bold mb-3">{opportunity.title}</h3>
       <Badge className="mb-3 w-auto max-w-fit">{opportunity.category}</Badge>  </div>  <div >
          <p className="text-sm text-muted-foreground mb-4 ">{opportunity.description}</p>
          <div className=" text-sm gap-x-4 flex flex-col md:flex-row">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{opportunity.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{opportunity.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{opportunity.participants}</span>
            </div>
          </div>
        </div>
        <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );

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
