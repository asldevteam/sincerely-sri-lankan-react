import HeroSection from '@/components/HeroSection';
import InteractiveMap from '@/components/InteractiveMap';
import StoriesSection from '@/components/StoriesSection';
import OpportunitySearch from '@/components/OpportunitySearch';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
 
      
      {/* Interactive Map Section */}
      <InteractiveMap />
      

      
      {/* Stories Section */}
      <StoriesSection />
      
      {/* Opportunity Search Tools */}
      <OpportunitySearch />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer with Story Sharing */}
      <Footer />
    </div>
  );
};

export default Index;
