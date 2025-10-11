import { RiTwitterXLine } from "react-icons/ri";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  X
} from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Destinations", href: "#destinations" },
    { name: "Stories", href: "#stories" },
    { name: "Explore", href: "#experiences" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#footer" }
  ];

  const contactInfo = {
    email: "info@aiesec.lk",
    phone: "+94112746190",
    address: "102/2 Nagahawatta Road, Maharagama, 10280"
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/aiesecinsrilanka?igsh=eGlzYWJnZGc5eWk=', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: 'https://www.facebook.com/AIESECLK', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Youtube, href: 'https://www.youtube.com/@AIESECinSriLanka', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: RiTwitterXLine, href: 'https://twitter.com/AIESECLK', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-background via-muted/20 to-background border-t border-border/50"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 max-w-fit">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sincerely Sri Lankan
            </h3>
            <p>Powered by</p>

            <img
              src="/images/Logo.webp"
              alt="AIESEC in Sri Lanka"
              className="object-contain h-10 w-auto"
            />

            <p>AIESEC in Sri Lanka</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Discover authentic Sri Lankan experiences through the eyes of fellow travelers.
              Your next adventure starts here.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-muted/30 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                    target="_blank"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-fit">
            <h3 className="text-base font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="max-w-fit">
            <h3 className="text-base font-bold text-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50"></div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col justify-center items-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer whitespace-nowrap text-xs sm:text-sm">
            Made with ❤️ by 
            <span className="font-semibold ml-1">&lt;/Dev.Team&gt; of AIESEC in Sri Lanka</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;