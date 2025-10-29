import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import OpportunitySearch from "@/components/OpportunitySearch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const SearchPage = () => {
return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
        <OpportunitySearch/>
      {/* Footer with Story Sharing */}
      <Footer />
    </div>
  );
};

export default SearchPage;
