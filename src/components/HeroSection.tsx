import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Volume2, VolumeX } from 'lucide-react';
import heroImage from '@/assets/hero-sri-lanka.jpg';

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    "Sincerely\nSri Lankan",
    "Discover Paradise",
    "Experience Culture",
    "Create Memories"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    const mapSection = document.getElementById('interactive-map');
    mapSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-video relative">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed "
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Overlay */}
      <div className="hero-overlay bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      
      {/* Cultural Pattern Overlay */}
      <div className="absolute flex inset-0 cultural-pattern opacity-20" />
   
      {/* Hero Content */}
      <div className="hero-content relative z-30 max-w-6xl mx-auto px-4 -mt-[200px] lg:mt-0 ">
           <div>
        <img src="/images/Logo3.webp" alt="Hero" className="object-contain  max-w-sm  mb-[50px] lg:mb-0  lg:max-w-md mx-auto lg:mt-[50px]" />
      </div>
        {/* Main Title with Text Animation */}
        <div className="mb-8 overflow-hidden">
          <h1 
            key={currentText}
            className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in"
          >
            {heroTexts[currentText].includes('\n')
              ? heroTexts[currentText].split('\n').map((line, idx) => (
                  <span key={idx} className="block">{line}</span>
                ))
              : heroTexts[currentText]}
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
          Immerse yourself in the pearl of the Indian Ocean. From ancient kingdoms to pristine beaches, 
          discover a land where every moment tells a story.
        </p>
        
        {/* CTA Buttons */}
        <div className=" hidden flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full glow-primary transform hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
          >
            Watch Stories
          </Button>
          
          {/* Video Control */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="text-foreground/70 hover:text-primary"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </Button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 float-animation delay-1000">
          <div className="w-4 h-4 bg-primary rounded-full glow-primary opacity-60" />
        </div>
        <div className="absolute top-1/3 right-20 float-animation delay-2000">
          <div className="w-6 h-6 bg-secondary rounded-full glow-accent opacity-50" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 float-animation delay-3000">
          <div className="w-3 h-3 bg-accent rounded-full glow-accent opacity-70" />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToNextSection}>
        <ChevronDown className="w-8 h-8 text-primary animate-pulse-glow" />
      </div>
      
      {/* Side Navigation Dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {['Hero', 'Explore', 'Stories', 'Plan'].map((section, index) => (
          <div 
            key={section}
            className="w-3 h-3 rounded-full border-2 border-primary/50 hover:bg-primary/50 cursor-pointer transition-all duration-300"
            title={section}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;