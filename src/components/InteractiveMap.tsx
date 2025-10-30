import mapImage from "@/assets/sri-lanka-map.jpg";
import mapImageMobile from "@/assets/sri-lanka-map-mobile-4-5.jpg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { destinations, type Destination } from "@/constants/destinations";
import { useIsMobile } from "@/hooks/use-mobile";

const InteractiveMap = () => {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(
    null
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cultural":
        return "bg-accent";
      case "beach":
        return "bg-primary";
      case "nature":
        return "bg-success";
      case "adventure":
        return "bg-secondary";
      default:
        return "bg-primary";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "cultural":
        return "bg-accent/20 text-accent-foreground border-accent/30";
      case "beach":
        return "bg-primary/20 text-primary-foreground border-primary/30";
      case "nature":
        return "bg-success/20 text-success-foreground border-success/30";
      case "adventure":
        return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      default:
        return "bg-primary/20 text-primary-foreground border-primary/30";
    }
  };

  const isMobile = useIsMobile();

  return (
    <section
      id="interactive-map"
      className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Explore Sri Lanka
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on any destination to discover immersive experiences, hidden
            gems, and cultural treasures that make Sri Lanka the pearl of the
            Indian Ocean.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <AspectRatio
              ratio={isMobile ? 4 / 5 : 16 / 13}
              className="map-container relative bg-cover bg-center rounded-2xl overflow-hidden border border-border/50"
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={mapImageMobile} />
                <img
                  src={mapImage}
                  alt="Interactive Sri Lanka Map"
                  className="w-full h-full object-cover"
                />
              </picture>

              {/* Destination Markers */}
              {destinations.map((destination) => {
                const pos =
                  isMobile && destination.mobilePosition
                    ? destination.mobilePosition
                    : destination.position;
                return (
                  <div
                    key={destination.id}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      position: "absolute",
                    }}
                    onClick={() => setSelectedDestination(destination)}
                    onMouseEnter={(e) => {
                      setHoveredDestination(destination.id);
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredDestination(null)}
                  >
                    <div
                      className={`destination-marker ${getTypeColor(
                        destination.type
                      )} transform transition duration-500 animate-pulse ${
                        hoveredDestination === destination.id
                          ? "scale-150"
                          : "scale-100"
                      }`}
                      style={{ position: "relative" }}
                    >
                      <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                    </div>
                  </div>
                );
              })}

              {/* Map Legend */}
              <div
                className={`absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg border border-border/50 ${
                  isMobile ? "p-2" : "p-4"
                }`}
              >
                <h3
                  className={`font-semibold ${
                    isMobile ? "mb-1 text-[10px]" : "mb-3 text-sm"
                  }`}
                >
                  Destination Types
                </h3>
                <div className={isMobile ? "space-y-1" : "space-y-2"}>
                  {["cultural", "beach", "nature", "adventure"].map((type) => (
                    <div
                      key={type}
                      className={`flex items-center ${
                        isMobile ? "gap-1" : "gap-2"
                      }`}
                    >
                      <div
                        className={`rounded-full ${getTypeColor(type)} ${
                          isMobile ? "w-2 h-2" : "w-3 h-3"
                        }`}
                      />
                      <span
                        className={`capitalize ${
                          isMobile ? "text-[9px]" : "text-xs"
                        }`}
                      >
                        {type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AspectRatio>
          </div>

          {/* Destination Details Panel */}
          <div className="lg:col-span-1">
            {selectedDestination ? (
              <Card className="testimonial-card h-fit ">
                <CardContent className="p-2 h-full ">
                  <div>
                    <img
                      src={selectedDestination.image}
                      alt={selectedDestination.name}
                      className="w-full h-full  rounded-lg mb-4"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {selectedDestination.name}
                      </h3>
                      <Badge
                        className={`${getTypeBadgeColor(
                          selectedDestination.type
                        )} hover:${getTypeBadgeColor(
                          selectedDestination.type
                        )} cursor-default`}
                      >
                        {selectedDestination.type}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {selectedDestination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.highlights.map(
                        (highlight, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {highlight}
                          </Badge>
                        )
                      )}
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
                    Click on any marker on the map to explore detailed
                    information, virtual tours, and insider tips for each
                    destination.
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
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
        >
          <p className="font-semibold text-sm">
            {destinations.find((d) => d.id === hoveredDestination)?.name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {destinations.find((d) => d.id === hoveredDestination)?.type}
          </p>
        </div>
      )}
    </section>
  );
};

export default InteractiveMap;
