import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OpportunitySearchButton = () => {
  const navigate = useNavigate();

  return (
     <section
      id="opportunities"
      className="py-32 px-4 bg-gradient-to-b from-background to-muted/20 flex items-center justify-center"
    >
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Discover Global Opportunities
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore internships, volunteer programs, and exchange experiences around the world.
        </p>

        <Button
          onClick={() => navigate('/search-tool')}
          className="group flex items-center gap-3 mx-auto px-10 py-6 text-lg rounded-2xl 
                     bg-primary text-primary-foreground hover:bg-primary/90 transition-all 
                     duration-300 shadow-lg hover:shadow-2xl"
        >
          <Search className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          <span>Find Your Opportunity</span>
        </Button>
      </div>
    </section>
  );
};

export default OpportunitySearchButton;
