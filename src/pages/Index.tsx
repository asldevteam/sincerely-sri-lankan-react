import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InteractiveMap from '@/components/InteractiveMap';
import StoriesSection from '@/components/StoriesSection';
import OpportunitySearch from '@/components/OpportunitySearch';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* Interactive Map Section */}
      <section id="destinations">
        <InteractiveMap />
      </section>

      {/* Stories Section */}
      <section id="stories">
        <StoriesSection />
      </section>
      
      {/* Opportunity Search Tools */}
      <section id="experiences">
        <OpportunitySearch />
      </section>
      
      {/* FAQ Section */}
      <section id="faq">
        <FAQSection />
      </section>
      
      {/* Footer with Story Sharing */}
      <Footer />
    </div>
  );
};

export default Index;
