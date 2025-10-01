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
        

        
        {/* Footer Links */}
        <div className="gap-8 mb-4 border-t border-border/50 pt-12">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Sincerely Sri Lankan
            </h3>
            <p className="text mb-4 ">
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
          
         <div className="flex items-center gap-4  mt-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className={` bg-muted/10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          

        </div>
        
        {/* Social Media & Copyright */}
        <div className="border-t border-border/50 pt-8 flex items-center justify-center">
          <div className="flex items-center gap-6">
            <p className="text-lg text-muted-foreground hover:scale-110 transition-all duration-300 cursor-pointer">
              Made with ❤ by <span className="font-semibold">Dev.Team</span> of AIESEC in Sri Lanka
            </p>
          </div>
          
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;