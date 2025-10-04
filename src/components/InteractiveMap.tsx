import mapImage from '@/assets/sri-lanka-map.jpg';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

interface Destination {
  id: string;
  name: string;
  position: { x: number; y: number };
  type: 'cultural' | 'beach' | 'nature' | 'adventure';
  description: string;
  highlights: string[];
  duration: string;

  image?: string;

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
    image: '/images/Sigiriya.webp'
  },
  {
    id: 'kandy',
    name: 'Temple of the Tooth',
    position: { x: 55, y: 50 },
    type: 'cultural',
    description: 'Sacred Buddhist temple housing the relic of Buddha\'s tooth.',
    highlights: ['Sacred Relic', 'Cultural Shows', 'Royal Palace'],
    duration: '3-4 hours',
    image: "/images/TempleToothRelic.webp"
  },
  {
    id: 'ella',
    name: 'Ella Rock & Nine Arch Bridge',
    position: { x: 65, y: 65 },
    type: 'nature',
    description: 'Scenic hill station with hiking trails and colonial charm.',
    highlights: ['Hiking Trails', 'Tea Plantations', 'Train Rides'],
    duration: 'Full day',
    image: '/images/NineArchBridge.webp'
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    position: { x: 50, y: 85 },
    type: 'cultural',
    description: 'Dutch colonial fort with cobblestone streets and ocean views.',
    highlights: ['Colonial Architecture', 'Art Galleries', 'Sunset Views'],
    duration: '2-3 hours',
    image: '/images/GalleFort.webp'
  },
  {
    id: 'mirissa',
    name: 'Mirissa Beach',
    position: { x: 60, y: 80 },
    type: 'beach',
    description: 'Perfect for whale watching and pristine beach relaxation.',
    highlights: ['Whale Watching', 'Surfing', 'Beach Parties'],
    duration: 'Full day',
    image: '/images/Mirissa.webp'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    position: { x: 65, y: 55 },
    type: 'nature',
    description: 'Wildlife safari destination famous for leopards and elephants.',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching'],
    duration: 'Half/Full day',
    image: '/images/Yala.webp'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    position: { x: 58, y: 55 },
    type: 'nature',
    description: 'Hill station known as "Little England" with tea plantations and cool climate.',
    highlights: ['Tea Factories', 'Gregory Lake', 'Colonial Architecture'],
    duration: '1-2 days',
    image: '/images/NuwaraEliya.webp'
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura',
    position: { x: 45, y: 25 },
    type: 'cultural',
    description: 'Ancient capital with sacred Buddhist temples and archaeological wonders.',
    highlights: ['Sacred Bodhi Tree', 'Ancient Stupas', 'Archaeological Sites'],
    duration: 'Full day',
    image: '/images/Anuradhapura.webp'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa',
    position: { x: 55, y: 30 },
    type: 'cultural',
    description: 'Medieval capital showcasing ancient Sri Lankan architecture and sculptures.',
    highlights: ['Gal Vihara', 'Royal Palace', 'Ancient Irrigation'],
    duration: 'Full day',
    image: '/images/Polonnaruwa.webp'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    position: { x: 80, y: 55 },
    type: 'beach',
    description: 'World-famous surfing destination with pristine beaches and laid-back vibe.',
    highlights: ['World-class Surfing', 'Beach Culture', 'Seafood'],
    duration: '2-3 days',
    image: '/images/ArugamBay.webp'
  },
  {
    id: 'dambulla',
    name: 'Dambulla Cave Temple',
    position: { x: 58, y: 35 },
    type: 'cultural',
    description: 'Ancient cave temple complex with stunning Buddhist art and statues.',
    highlights: ['Cave Paintings', 'Buddha Statues', 'Mountain Views'],
    duration: '2-3 hours',
    image: '/images/Dambulla.webp'
  },
  {
    id: 'bentota',
    name: 'Bentota Beach',
    position: { x: 45, y: 82 },
    type: 'beach',
    description: 'Golden sandy beaches perfect for water sports and relaxation.',
    highlights: ['Water Sports', 'Turtle Hatchery', 'River Safari'],
    duration: '1-2 days',
    image: '/images/Bentota.webp'
  },
  {
    id: 'negombo',
    name: 'Negombo',
    position: { x: 40, y: 40 },
    type: 'beach',
    description: 'Coastal city near airport with fishing culture and colonial heritage.',
    highlights: ['Fish Market', 'Colonial Churches', 'Lagoon Tours'],
    duration: 'Half day',
    image: '/images/Negambo.webp'
  },
  {
    id: 'haputale',
    name: 'Haputale',
    position: { x: 62, y: 60 },
    type: 'nature',
    description: 'Mountain town with breathtaking views and tea plantation walks.',
    highlights: ['Lipton\'s Seat', 'Tea Plantations', 'Mountain Views'],
    duration: '1-2 days',
    image: '/images/Haputhale.webp'
  },
  {
    id: 'hikkaduwa',
    name: 'Hikkaduwa',
    position: { x: 48, y: 83 },
    type: 'beach',
    description: 'Vibrant beach town known for coral reefs and nightlife.',
    highlights: ['Coral Sanctuary', 'Surfing', 'Beach Parties'],
    duration: '1-2 days',
    image: '/images/Hikkaduwa.webp'
  },
  {
    id: 'adams-peak',
    name: 'Adam\'s Peak',
    position: { x: 53, y: 58 },
    type: 'adventure',
    description: 'Sacred mountain pilgrimage site with sunrise hiking trails.',
    highlights: ['Sunrise Hike', 'Sacred Footprint', 'Pilgrimage Site'],
    duration: 'Overnight hike',
    image: '/images/AdamsPeak.webp'
  },
  {
    id: 'jaffna',
    name: 'Jaffna',
    position: { x: 30, y: 7 },
    type: 'cultural',
    description: 'Northern cultural capital with Tamil heritage and historic fort.',
    highlights: ['Jaffna Fort', 'Hindu Temples', 'Tamil Culture'],
    duration: '1-2 days',
    image: '/images/JaffnaFort.webp'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    position: { x: 55, y: 20 },
    type: 'beach',
    description: 'Eastern port city with pristine beaches and natural harbor.',
    highlights: ['Nilaveli Beach', 'Koneswaram Temple', 'Whale Watching'],
    duration: '2-3 days',
    image: '/images/Koneshwaram.webp'
  },
  {
    id: 'mannar',
    name: 'Mannar Island',
    position: { x: 35, y: 18 },
    type: 'nature',
    description: 'Remote island known for baobab trees and bird sanctuary.',
    highlights: ['Baobab Trees', 'Bird Sanctuary', 'Adam\'s Bridge'],
    duration: '1-2 days',
    image: '/images/Mannar.webp'
  },
  {
    id: 'vavuniya',
    name: 'Vavuniya',
    position: { x: 45, y: 22 },
    type: 'cultural',
    description: 'Gateway to the north with archaeological sites and cultural heritage.',
    highlights: ['Archaeological Museum', 'Vavuniya Tank', 'Cultural Sites'],
    duration: 'Half day',
    image: '/images/Vavniya.webp'
  },
  {
    id: 'kilinochchi',
    name: 'Kilinochchi',
    position: { x: 42, y: 15 },
    type: 'cultural',
    description: 'Historical town with war memorials and cultural significance.',
    highlights: ['War Memorial', 'Cultural Heritage', 'Local Markets'],
    duration: 'Half day',
    image: '/images/Kilinochchi.webp'
  },
  {
    id: 'point-pedro',
    name: 'Point Pedro',
    position: { x: 32, y: 5 },
    type: 'beach',
    description: 'Northernmost point of Sri Lanka with lighthouse and beaches.',
    highlights: ['Point Pedro Lighthouse', 'Northern Beaches', 'Fishing Villages'],
    duration: 'Half day',
    image: '/images/PointPedro.webp'
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
                  style={{
                    left: `${destination.position.x}%`,
                    top: `${destination.position.y}%`,
                    position: 'absolute',
                  }}
                  onClick={() => setSelectedDestination(destination)}
                  onMouseEnter={() => setHoveredDestination(destination.id)}
                  onMouseLeave={() => setHoveredDestination(null)}
                >
                  <div
                    className={`destination-marker ${getTypeColor(destination.type)} transform transition duration-500 animate-pulse ${hoveredDestination === destination.id ? 'scale-150' : 'scale-100'}`}
                    style={{ position: 'relative' }}
                  >
                    <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                  </div>
                  {/* Hover Tooltip */}
                  {hoveredDestination === destination.id && (
                    <div className="z-10 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 whitespace-nowrap">
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
              <Card className="testimonial-card h-fit ">
                <CardContent className="p-2 h-full ">
                  <div>

                    <img src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-full  rounded-lg mb-4" />

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