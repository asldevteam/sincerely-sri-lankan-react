import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, Star } from 'lucide-react';
import { useRef } from 'react';

interface Location {
  id: string;
  name: string;
  type: string;
  rating: number;
  image: string;
  description: string;
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    type: 'Cultural',
    rating: 5,
    image: '/placeholder.svg',
    description: 'Ancient rock fortress with stunning frescoes'
  },
  {
    id: '2',
    name: 'Mirissa Beach',
    type: 'Beach',
    rating: 4,
    image: '/placeholder.svg',
    description: 'Perfect for whale watching and surfing'
  },
  {
    id: '3',
    name: 'Yala National Park',
    type: 'Nature',
    rating: 5,
    image: '/placeholder.svg',
    description: 'Wildlife safari with leopards and elephants'
  },
  {
    id: '4',
    name: 'Ella Rock',
    type: 'Adventure',
    rating: 4,
    image: '/placeholder.svg',
    description: 'Scenic hiking trails and tea plantations'
  }
];

const FeaturedLocations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="featured" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured Locations / Activities
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={scrollRight}
            className="shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {locations.map((location) => (
            <Card 
              key={location.id}
              className="featured-card shrink-0 w-[350px] snap-start"
            >
              <CardContent className="p-0">
                <div className="relative h-48 bg-muted overflow-hidden rounded-t-lg">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium text-white">{location.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{location.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <p className="text-muted-foreground text-sm">{location.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;
