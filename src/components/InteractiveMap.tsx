import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Play, X, Star, Clock, Users } from 'lucide-react';
import mapImage from '@/assets/sri-lanka-map.jpg';

interface Destination {
  id: string;
  name: string;
  position: { x: number; y: number };
  type: 'cultural' | 'beach' | 'nature' | 'adventure';
  description: string;
  highlights: string[];
  duration: string;

  videoUrl?: string;
  images: string[];
}

const destinations: Destination[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock Fortress',
    position: { x: 60, y: 35 },
    type: 'cultural',
    description: 'Ancient rock fortress with breathtaking frescoes and panoramic views.',
    highlights: ['Ancient Architecture', 'Mirror Wall', '5th Century Frescoes'],
    duration: '4-6 hours',


    images: ['/placeholder.svg']
  },
  {
    id: 'kandy',
    name: 'Temple of the Tooth',
    position: { x: 55, y: 50 },
    type: 'cultural',
    description: 'Sacred Buddhist temple housing the relic of Buddha\'s tooth.',
    highlights: ['Sacred Relic', 'Cultural Shows', 'Royal Palace'],
    duration: '3-4 hours',

    images: ['/placeholder.svg']
  },
  {
    id: 'ella',
    name: 'Ella Rock & Nine Arch Bridge',
    position: { x: 65, y: 65 },
    type: 'nature',
    description: 'Scenic hill station with hiking trails and colonial charm.',
    highlights: ['Hiking Trails', 'Tea Plantations', 'Train Rides'],
    duration: 'Full day',

    images: ['/placeholder.svg']
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    position: { x: 50, y: 85 },
    type: 'cultural',
    description: 'Dutch colonial fort with cobblestone streets and ocean views.',
    highlights: ['Colonial Architecture', 'Art Galleries', 'Sunset Views'],
    duration: '2-3 hours',

    images: ['/placeholder.svg']
  },
  {
    id: 'mirissa',
    name: 'Mirissa Beach',
    position: { x: 60, y: 80 },
    type: 'beach',
    description: 'Perfect for whale watching and pristine beach relaxation.',
    highlights: ['Whale Watching', 'Surfing', 'Beach Parties'],
    duration: 'Full day',

    images: ['/placeholder.svg']
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    position: { x: 65, y: 55 },
    type: 'nature',
    description: 'Wildlife safari destination famous for leopards and elephants.',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching'],
    duration: 'Half/Full day',

    images: ['/placeholder.svg']
  }
];

const InteractiveMap = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-accent';
      case 'beach': return 'bg-primary';
      case 'nature': return 'bg-success';
      case 'adventure': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'beach': return 'bg-primary/20 text-primary-foreground border-primary/30';
      case 'nature': return 'bg-success/20 text-success-foreground border-success/30';
      case 'adventure': return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
      default: return 'bg-primary/20 text-primary-foreground border-primary/30';
    }
  };

  return (
    <section id="interactive-map" className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Explore Sri Lanka
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on any destination to discover immersive experiences, hidden gems, and cultural treasures
            that make Sri Lanka the pearl of the Indian Ocean.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="map-container relative h-[600px] lg:h-[700px] bg-cover bg-center rounded-2xl overflow-hidden border border-border/50">
              <img
                src={mapImage}
                alt="Interactive Sri Lanka Map"
                className="w-full h-full object-cover"
              />

              {/* Destination Markers */}
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`destination-marker ${getTypeColor(destination.type)} transform transition duration-500 animate-pulse ${hoveredDestination === destination.id ? 'scale-150' : 'scale-100'
                    }`}
                  style={{
                    left: `${destination.position.x}%`,
                    top: `${destination.position.y}%`
                  }}
                  onClick={() => setSelectedDestination(destination)}
                  onMouseEnter={() => setHoveredDestination(destination.id)}
                  onMouseLeave={() => setHoveredDestination(null)}
                >
                  <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />

                  {/* Hover Tooltip */}
                  {hoveredDestination === destination.id && (
                    <div className="z-10 absolute bottom-full bg-black left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 whitespace-nowrap">
                      <p className="font-semibold text-sm">{destination.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{destination.type}</p>
                    </div>
                  )}
                </div>

              ))}

              {/* Map Legend */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <h3 className="font-semibold mb-3 text-sm">Destination Types</h3>
                <div className="space-y-2">
                  {['cultural', 'beach', 'nature', 'adventure'].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
                      <span className="text-xs capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Destination Details Panel */}
          <div className="lg:col-span-1">
            {selectedDestination ? (
              <Card className="testimonial-card h-full ">
                <CardContent className="p-2 h-full ">
                  <div>

                    <img src={selectedDestination.images[0]} alt={selectedDestination.name} className="w-full h-full  rounded-lg mb-4" />

                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{selectedDestination.name}</h3>
                      <Badge className={`${getTypeBadgeColor(selectedDestination.type)} hover:${getTypeBadgeColor(selectedDestination.type)} cursor-default`}>
                        {selectedDestination.type}
                      </Badge>
                    </div>

                  </div>

                  <p className="text-muted-foreground mb-4">{selectedDestination.description}</p>



                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>


                </CardContent>
              </Card>
            ) : (
              <Card className="testimonial-card h-fit">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Discover Destinations</h3>
                  <p className="text-muted-foreground text-sm">
                    Click on any marker on the map to explore detailed information,
                    virtual tours, and insider tips for each destination.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;