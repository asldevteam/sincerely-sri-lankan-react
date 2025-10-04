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
    description: 'Rising majestically from the central plains, Sigiriya is an ancient rock fortress that served as a royal palace in the 5th century. This UNESCO World Heritage site features stunning frescoes of celestial maidens, the famous Mirror Wall with ancient graffiti, and water gardens that showcase advanced hydraulic engineering. The climb to the summit offers breathtaking panoramic views and a glimpse into Sri Lanka\'s rich historical legacy.',
    highlights: ['Ancient Architecture', 'Mirror Wall', '5th Century Frescoes'],
    duration: '4-6 hours',
    image: '/images/Sigiriya.webp'
  },
  {
    id: 'kandy',
    name: 'Temple of the Tooth',
    position: { x: 55, y: 50 },
    type: 'cultural',
    description: 'The cultural heart of Sri Lanka, Kandy is home to the sacred Temple of the Tooth Relic, one of Buddhism\'s most revered sites. This former royal capital nestles around a serene lake and offers visitors traditional dance performances, the Royal Botanical Gardens in nearby Peradeniya, and vibrant markets. The annual Esala Perahera festival transforms the city into a spectacular celebration of culture and spirituality.',
    highlights: ['Sacred Relic', 'Cultural Shows', 'Royal Palace'],
    duration: '3-4 hours',
    image: "/images/TempleToothRelic.webp"
  },
  {
    id: 'ella',
    name: 'Ella Rock & Nine Arch Bridge',
    position: { x: 65, y: 65 },
    type: 'nature',
    description: 'Perched in the misty hills of Sri Lanka\'s central highlands, Ella is a charming hill station that offers some of the country\'s most spectacular scenery. The iconic Nine Arch Bridge, carved through lush jungle, provides the perfect backdrop for the scenic train journey. Hiking trails lead to Ella Rock and Little Adam\'s Peak, offering panoramic views of tea plantations that stretch as far as the eye can see.',
    highlights: ['Hiking Trails', 'Tea Plantations', 'Train Rides'],
    duration: 'Full day',
    image: '/images/NineArchBridge.webp'
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    position: { x: 50, y: 85 },
    type: 'cultural',
    description: 'Galle Fort stands as a testament to Sri Lanka\'s colonial heritage, with its well-preserved Dutch architecture and cobblestone streets. This UNESCO World Heritage site houses charming boutique hotels, art galleries, and cafes within its ancient ramparts. Walk along the fort walls at sunset for spectacular ocean views, explore the lighthouse, and discover the unique blend of European and South Asian architectural influences that make this coastal gem truly special.',
    highlights: ['Colonial Architecture', 'Art Galleries', 'Sunset Views'],
    duration: '2-3 hours',
    image: '/images/GalleFort.webp'
  },
  {
    id: 'mirissa',
    name: 'Mirissa Beach',
    position: { x: 60, y: 80 },
    type: 'beach',
    description: 'Mirissa is Sri Lanka\'s premier whale watching destination, where the deep waters off the coast provide excellent opportunities to spot blue whales, sperm whales, and playful dolphins. Beyond marine adventures, this crescent-shaped bay offers pristine golden sand beaches perfect for surfing, swimming, and relaxation. The laid-back atmosphere, fresh seafood restaurants, and stunning sunsets make Mirissa an ideal tropical paradise for beach lovers.',
    highlights: ['Whale Watching', 'Surfing', 'Beach Parties'],
    duration: 'Full day',
    image: '/images/Mirissa.webp'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    position: { x: 65, y: 55 },
    type: 'nature',
    description: 'Yala National Park is Sri Lanka\'s most visited wildlife sanctuary, renowned for having one of the highest leopard densities in the world. This diverse ecosystem encompasses dry woodlands, grasslands, and lagoons that support over 200 bird species, majestic elephants, sloth bears, crocodiles, and countless other wildlife species. Early morning and evening safaris offer the best chances to witness these magnificent creatures in their natural habitat while exploring ancient Buddhist monasteries scattered throughout the park.',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Bird Watching'],
    duration: 'Half/Full day',
    image: '/images/Yala.webp'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    position: { x: 58, y: 55 },
    type: 'nature',
    description: 'Known as "Little England," Nuwara Eliya is a charming hill station that retains much of its colonial character with Tudor-style architecture, manicured gardens, and a cool climate year-round. Surrounded by emerald tea plantations, this mountain retreat offers visitors the chance to tour working tea factories, enjoy boat rides on Gregory Lake, play golf on one of Asia\'s oldest courses, and explore Horton Plains National Park with its dramatic World\'s End cliff.',
    highlights: ['Tea Factories', 'Gregory Lake', 'Colonial Architecture'],
    duration: '1-2 days',
    image: '/images/NuwaraEliya.webp'
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura',
    position: { x: 45, y: 25 },
    type: 'cultural',
    description: 'As Sri Lanka\'s first ancient capital, Anuradhapura is a sacred city that flourished for over 1,300 years. This UNESCO World Heritage site houses some of the world\'s oldest and largest stupas, including the magnificent Ruwanwelisaya and Jetavanaramaya. The sacred Sri Maha Bodhi tree, grown from a branch of the tree under which Buddha attained enlightenment, remains a major pilgrimage site. Ancient irrigation systems and monasteries showcase the advanced civilization that once thrived here.',
    highlights: ['Sacred Bodhi Tree', 'Ancient Stupas', 'Archaeological Sites'],
    duration: 'Full day',
    image: '/images/Anuradhapura.webp'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa',
    position: { x: 55, y: 30 },
    type: 'cultural',
    description: 'Polonnaruwa served as Sri Lanka\'s medieval capital and represents the golden age of Sinhalese civilization. This UNESCO World Heritage site features remarkably well-preserved ruins including the Royal Palace complex, the circular Vatadage, and the famous Gal Vihara with its magnificent rock-carved Buddha statues. The ancient city\'s sophisticated irrigation system, including the vast Parakrama Samudra reservoir, demonstrates the advanced engineering skills of its medieval rulers.',
    highlights: ['Gal Vihara', 'Royal Palace', 'Ancient Irrigation'],
    duration: 'Full day',
    image: '/images/Polonnaruwa.webp'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    position: { x: 80, y: 55 },
    type: 'beach',
    description: 'Arugam Bay is a world-renowned surfing destination that attracts wave riders from across the globe with its consistent breaks and pristine coastline. This laid-back beach town on Sri Lanka\'s east coast offers excellent surf conditions from April to October, complemented by a relaxed atmosphere, beachfront cafes, and stunning sunrises. Beyond surfing, visitors can explore nearby Kumana National Park, ancient temples, and enjoy fresh seafood while experiencing the authentic local culture.',
    highlights: ['World-class Surfing', 'Beach Culture', 'Seafood'],
    duration: '2-3 days',
    image: '/images/ArugamBay.webp'
  },
  {
    id: 'dambulla',
    name: 'Dambulla Cave Temple',
    position: { x: 58, y: 35 },
    type: 'cultural',
    description: 'The Dambulla Cave Temple, also known as the Golden Temple, is the largest and best-preserved cave temple complex in Sri Lanka. Dating back to the 1st century BC, these five caves contain over 150 Buddha statues and extensive frescoes covering 2,100 square meters of painted walls and ceilings. Perched on a massive rock outcrop, the temple offers panoramic views of the surrounding countryside and serves as an important pilgrimage site that beautifully preserves over 2,000 years of Buddhist art and culture.',
    highlights: ['Cave Paintings', 'Buddha Statues', 'Mountain Views'],
    duration: '2-3 hours',
    image: '/images/Dambulla.webp'
  },
  {
    id: 'bentota',
    name: 'Bentota Beach',
    position: { x: 45, y: 82 },
    type: 'beach',
    description: 'Bentota is a premier beach destination where the Bentota River meets the Indian Ocean, creating a perfect setting for both water sports and tranquil relaxation. The golden sandy beaches offer excellent conditions for jet skiing, windsurfing, and deep-sea fishing, while the river provides opportunities for boat safaris through mangrove forests. Visitors can also explore the nearby turtle hatchery, enjoy Ayurvedic spa treatments, and experience the region\'s rich cinnamon cultivation heritage.',
    highlights: ['Water Sports', 'Turtle Hatchery', 'River Safari'],
    duration: '1-2 days',
    image: '/images/Bentota.webp'
  },
  {
    id: 'negombo',
    name: 'Negombo',
    position: { x: 40, y: 40 },
    type: 'beach',
    description: 'Known as "Little Rome" for its strong Catholic influence, Negombo is a vibrant coastal city just minutes from the international airport. The bustling fish market comes alive at dawn with traditional outrigger boats bringing in the night\'s catch, while colonial-era churches and Dutch canal systems tell stories of the city\'s multicultural past. The lagoon offers excellent boat tours through mangroves, and the beach provides a perfect introduction to Sri Lankan coastal life with its colorful fishing boats and fresh seafood restaurants.',
    highlights: ['Fish Market', 'Colonial Churches', 'Lagoon Tours'],
    duration: 'Half day',
    image: '/images/Negambo.webp'
  },
  {
    id: 'haputale',
    name: 'Haputale',
    position: { x: 62, y: 60 },
    type: 'nature',
    description: 'Haputale is a scenic mountain town perched on the edge of Sri Lanka\'s hill country, offering some of the most spectacular panoramic views in the country. The famous Lipton\'s Seat provides breathtaking 360-degree views across tea plantations to the distant coastline. This charming town serves as a gateway to exploring working tea estates, hiking through cloud forests, and visiting the sacred Adisham Monastery. The cool climate and stunning scenery make it a perfect retreat for nature lovers and photography enthusiasts.',
    highlights: ['Lipton\'s Seat', 'Tea Plantations', 'Mountain Views'],
    duration: '1-2 days',
    image: '/images/Haputhale.webp'
  },
  {
    id: 'hikkaduwa',
    name: 'Hikkaduwa',
    position: { x: 48, y: 83 },
    type: 'beach',
    description: 'Hikkaduwa is a vibrant beach destination that perfectly balances natural beauty with lively entertainment. The coral sanctuary offers excellent snorkeling and diving opportunities among colorful marine life, while the consistent waves attract surfers year-round. As the sun sets, the town transforms into a bustling hub of beachfront restaurants, bars, and live music venues. The annual beach festival and turtle watching opportunities add to the diverse experiences this coastal gem offers to visitors seeking both adventure and relaxation.',
    highlights: ['Coral Sanctuary', 'Surfing', 'Beach Parties'],
    duration: '1-2 days',
    image: '/images/Hikkaduwa.webp'
  },
  {
    id: 'adams-peak',
    name: 'Adam\'s Peak',
    position: { x: 53, y: 58 },
    type: 'adventure',
    description: 'Adam\'s Peak, known locally as Sri Pada, is Sri Lanka\'s most sacred mountain, revered by multiple religions for the sacred footprint at its summit. The challenging overnight hike to the 2,243-meter peak is rewarded with one of the world\'s most spectacular sunrises and the mystical phenomenon of the mountain\'s perfect triangular shadow cast across the landscape. During pilgrimage season (December to May), thousands of devotees make this spiritual journey, creating a unique cultural experience along the illuminated trail.',
    highlights: ['Sunrise Hike', 'Sacred Footprint', 'Pilgrimage Site'],
    duration: 'Overnight hike',
    image: '/images/AdamsPeak.webp'
  },
  {
    id: 'jaffna',
    name: 'Jaffna',
    position: { x: 30, y: 7 },
    type: 'cultural',
    description: 'Jaffna, the cultural capital of Sri Lanka\'s north, offers visitors a unique glimpse into Tamil heritage and resilient community spirit. The imposing Dutch fort, built in 1680, stands as a testament to the city\'s strategic importance throughout history. Vibrant Hindu temples, traditional palmyra palm cultivation, and distinctive cuisine reflect the rich Tamil culture. Despite its turbulent past, Jaffna has emerged as a fascinating destination where ancient traditions blend with modern reconstruction efforts.',
    highlights: ['Jaffna Fort', 'Hindu Temples', 'Tamil Culture'],
    duration: '1-2 days',
    image: '/images/JaffnaFort.webp'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    position: { x: 55, y: 20 },
    type: 'beach',
    description: 'Trincomalee boasts one of the world\'s finest natural harbors and some of Sri Lanka\'s most pristine beaches. The ancient Koneswaram Temple, perched dramatically on Swami Rock, offers spiritual significance and breathtaking ocean views. Nilaveli and Uppuveli beaches provide crystal-clear waters perfect for swimming and snorkeling, while Pigeon Island National Park offers excellent diving among coral reefs. The city\'s strategic location also makes it an ideal base for whale watching and exploring the culturally rich eastern province.',
    highlights: ['Nilaveli Beach', 'Koneswaram Temple', 'Whale Watching'],
    duration: '2-3 days',
    image: '/images/Koneshwaram.webp'
  },
  {
    id: 'mannar',
    name: 'Mannar Island',
    position: { x: 35, y: 18 },
    type: 'nature',
    description: 'Mannar Island is a remote and mystical destination where ancient baobab trees create an almost African landscape in the heart of Sri Lanka. This unique ecosystem supports over 150 bird species, making it a paradise for birdwatchers, especially during migration seasons. The island\'s rich history includes ancient trade routes, Portuguese and Dutch fortifications, and the legendary Adam\'s Bridge connecting to India. Pearl diving traditions, salt production, and the distinctive Mannar culture offer visitors an authentic glimpse into a lesser-known side of Sri Lanka.',
    highlights: ['Baobab Trees', 'Bird Sanctuary', 'Adam\'s Bridge'],
    duration: '1-2 days',
    image: '/images/Mannar.webp'
  },
  {
    id: 'vavuniya',
    name: 'Vavuniya',
    position: { x: 45, y: 22 },
    type: 'cultural',
    description: 'Vavuniya serves as the gateway to Sri Lanka\'s northern province, offering visitors their first taste of the region\'s distinct culture and history. The town features an excellent archaeological museum showcasing artifacts from ancient settlements, while the historic Vavuniya Tank demonstrates sophisticated irrigation engineering. As a crossroads of different communities, Vavuniya presents a unique blend of Sinhalese, Tamil, and Muslim cultures, reflected in its temples, churches, mosques, and diverse culinary traditions.',
    highlights: ['Archaeological Museum', 'Vavuniya Tank', 'Cultural Sites'],
    duration: 'Half day',
    image: '/images/Vavniya.webp'
  },
  {
    id: 'kilinochchi',
    name: 'Kilinochchi',
    position: { x: 42, y: 15 },
    type: 'cultural',
    description: 'Kilinochchi holds profound historical significance as the former administrative center of the LTTE during Sri Lanka\'s civil conflict. Today, the town stands as a symbol of resilience and reconstruction, with war memorials and peace monuments telling stories of both struggle and hope. Visitors can learn about this complex period in Sri Lankan history while observing the remarkable recovery and development efforts. The surrounding area offers glimpses into traditional northern Sri Lankan rural life and agricultural practices.',
    highlights: ['War Memorial', 'Cultural Heritage', 'Local Markets'],
    duration: 'Half day',
    image: '/images/Kilinochchi.webp'
  },
  {
    id: 'point-pedro',
    name: 'Point Pedro',
    position: { x: 32, y: 5 },
    type: 'beach',
    description: 'Point Pedro marks the northernmost tip of Sri Lanka, where the historic lighthouse has guided ships through the treacherous waters of the Palk Strait for generations. This remote coastal town offers pristine, undeveloped beaches and traditional fishing villages where ancient Tamil maritime culture remains largely unchanged. The area provides excellent opportunities for experiencing authentic northern Sri Lankan coastal life, fishing excursions, and stunning sunrises over the Bay of Bengal, all while enjoying the warm hospitality of the local Tamil community.',
    highlights: ['Point Pedro Lighthouse', 'Northern Beaches', 'Fishing Villages'],
    duration: 'Half day',
    image: '/images/PointPedro.webp'
  }
];

const InteractiveMap = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
                  onMouseEnter={(e) => {
                    setHoveredDestination(destination.id);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
                  }}
                  onMouseLeave={() => setHoveredDestination(null)}
                >
                  <div
                    className={`destination-marker ${getTypeColor(destination.type)} transform transition duration-500 animate-pulse ${hoveredDestination === destination.id ? 'scale-150' : 'scale-100'}`}
                    style={{ position: 'relative' }}
                  >
                    <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                  </div>

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
      
      {/* Global Tooltip */}
      {hoveredDestination && (
        <div 
          className="fixed pointer-events-none bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 whitespace-nowrap shadow-xl"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
        >
          <p className="font-semibold text-sm">
            {destinations.find(d => d.id === hoveredDestination)?.name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {destinations.find(d => d.id === hoveredDestination)?.type}
          </p>
        </div>
      )}
    </section>
  );
};

export default InteractiveMap;