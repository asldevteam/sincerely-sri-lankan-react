import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter,
  Send,
  Heart,
  Camera,
  Upload,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [storyForm, setStoryForm] = useState({
    name: '',
    email: '',
    location: '',
    experience: '',
    story: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Story Submitted! 🎉",
      description: "Thank you for sharing your Sri Lankan adventure with us!",
    });
    
    setStoryForm({
      name: '',
      email: '',
      location: '',
      experience: '',
      story: '',
      rating: 5
    });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Share Your Stories Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Share Your Sri Lanka Story
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Inspire other travelers by sharing your authentic Sri Lankan experiences. 
              Your story could be featured on our platform!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Story Submission Form */}
            <Card className="story-form">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-6 h-6 text-primary" />
                  Tell Your Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStorySubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Name</label>
                      <Input
                        value={storyForm.name}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Maya Chen"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={storyForm.email}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="maya@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Favorite Location</label>
                      <Input
                        value={storyForm.location}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Sigiriya, Ella, Galle..."
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Type of Experience</label>
                      <Input
                        value={storyForm.experience}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="Solo backpacking, cultural tour..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate Your Experience</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setStoryForm(prev => ({ ...prev, rating }))}
                          className={`w-8 h-8 rounded-full transition-all duration-200 ${
                            rating <= storyForm.rating 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted hover:bg-muted-foreground/20'
                          }`}
                        >
                          <Star className="w-4 h-4 mx-auto" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Story</label>
                    <Textarea
                      value={storyForm.story}
                      onChange={(e) => setStoryForm(prev => ({ ...prev, story: e.target.value }))}
                      placeholder="Tell us about your amazing Sri Lankan adventure..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Share Your Story
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Why Share Your Story */}
            <div className="space-y-6">
              <Card className="testimonial-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Inspire Others</h3>
                      <p className="text-muted-foreground text-sm">
                        Your authentic experiences help fellow travelers discover hidden gems and plan better trips.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="testimonial-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Get Featured</h3>
                      <p className="text-muted-foreground text-sm">
                        Amazing stories get featured on our homepage and social media channels.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="testimonial-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Include Media</h3>
                      <p className="text-muted-foreground text-sm">
                        Feel free to attach photos and videos to make your story come alive!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Featured Story Example */}
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6">
                  <Badge className="mb-3">Featured Story</Badge>
                  <blockquote className="italic text-sm mb-3">
                    "The sunrise hike at Adam's Peak was life-changing. Meeting pilgrims from all religions 
                    at the summit taught me about Sri Lanka's incredible unity in diversity."
                  </blockquote>
                  <p className="text-xs text-muted-foreground">- Alex R., Featured Traveler</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 border-t border-border/50 pt-12">
          {/* Brand & Contact */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Sincerely Sri Lanka
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover authentic Sri Lankan experiences through the eyes of fellow travelers. 
              Your next adventure starts here.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">hello@sincerelysrilanka.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">+94 11 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#destinations" className="hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#experiences" className="hover:text-primary transition-colors">Experiences</a></li>
              <li><a href="#stories" className="hover:text-primary transition-colors">Traveler Stories</a></li>
              <li><a href="#guides" className="hover:text-primary transition-colors">Travel Guides</a></li>
              <li><a href="#events" className="hover:text-primary transition-colors">Cultural Events</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#help" className="hover:text-primary transition-colors">Travel Help</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © 2024 Sincerely Sri Lanka. Made with ❤️ for travelers.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;