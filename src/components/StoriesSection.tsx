import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  title: string;
  content: string;
  ImageUrl: string;
  postBy: string;
  visitorCountry: string;

}

const stories: Story[] = [
  {
    id: '1',
    title: 'Ancient Wonders',
    content: 'Discover the rich cultural heritage of Sri Lanka through its ancient monuments and archaeological sites. From the magnificent Sigiriya Rock Fortress to the sacred Temple of the Tooth, every destination tells a story of centuries past.',
    ImageUrl: '/images/AncientWonders.webp',
    postBy: 'John Doe',
    visitorCountry: 'USA'

  },
  {
    id: '2',
    title: 'Beach Paradise',
    content: 'Experience the pristine beaches and crystal-clear waters of Sri Lanka. From surfing in Arugam Bay to whale watching in Mirissa, the coastal beauty offers endless adventures and relaxation.',
    ImageUrl: '/images/BeachParadise.webp',
    postBy: 'Jane Smith',
    visitorCountry: 'UK'

  },
  {
    id: '3',
    title: 'Wildlife Safari',
    content: 'Embark on thrilling wildlife safaris through lush national parks. Spot majestic leopards, gentle elephants, and exotic birds in their natural habitats across Yala and Udawalawe.',
    ImageUrl: '/images/WildSafari.webp',
    postBy: 'Alice Johnson',
    visitorCountry: 'Canada'

  }
];

const StoriesSection = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const story = stories[currentStory];

  return (
    <section id="stories" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
         Testimonials & Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Media Area */}
          <div className="relative h-[400px] md:h-[500px] bg-muted rounded-lg overflow-hidden">
          
              <img 
                src={story.ImageUrl} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
           
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Text Area */}
          <div className="space-y-6 ">
            <h3 className="text-3xl font-bold text-foreground">
              {story.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed lg:min-h-[150px]">
              {story.content}
            </p>
            <p className="text-md text-muted-foreground ">
              {story.postBy}, {story.visitorCountry}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button
               className='bg-transparent hover:bg-primary '
                size="icon"
                onClick={prevStory}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </Button>
              <div className="flex gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStory 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <Button

             className='bg-transparent hover:bg-primary '
                size="icon"
                onClick={nextStory}
              >
                <ChevronRight className="w-4 h-4 text-white border-white " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
