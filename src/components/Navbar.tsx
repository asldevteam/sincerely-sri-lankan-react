import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  MapPin, 
  Camera, 
  Heart, 
  MessageCircle, 
  HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: null },
    { name: "Destinations", href: "#destinations", icon: MapPin },
    { name: "Stories", href: "#stories", icon: Heart },
    { name: "Explore", href: "#experiences", icon: Camera },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
    { name: "Contact", href: "#footer", icon: MessageCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/images/Logo4.webp"
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
     
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sincerely Sri Lankan
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Authentic Travel Experiences
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-muted/50 hover:text-primary group ${
                  isScrolled ? 'text-foreground' : 'text-white hover:text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {link.icon && (
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{link.name}</span>
                </div>
              </button>
            ))}
          </div>



          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`lg:hidden p-2 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Sincerely Sri Lankan
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Authentic Travel
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 py-6">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        {link.icon && (
                          <link.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        )}
                        <span className="font-medium">{link.name}</span>
                      </button>
                    ))}
                  </div>
                </div>


              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;