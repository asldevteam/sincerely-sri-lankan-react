import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Plane, 
  DollarSign, 
  Calendar, 
  Shield, 
  MapPin, 
  Utensils,
  MessageCircle,
  Search
} from 'lucide-react';

interface FAQ {
  id: string;
  category: 'travel' | 'budget' | 'planning' | 'safety' | 'culture' | 'food';
  question: string;
  answer: string;
  isPopular?: boolean;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'travel',
    question: 'Do I need a visa to visit Sri Lanka?',
    answer: 'Most travelers need an Electronic Travel Authorization (ETA) which can be obtained online before arrival. The ETA is valid for 30 days and costs around $20. Some countries have visa-free entry. Check the official Sri Lanka Immigration website for the most current requirements.',
    isPopular: true
  },
  {
    id: '2',
    category: 'budget',
    question: 'How much should I budget for a 2-week trip?',
    answer: 'For backpackers: $30-50/day (hostels, local food, public transport). Mid-range: $50-100/day (guesthouses, mix of local/tourist restaurants, private transport). Luxury: $100+/day (hotels, fine dining, private tours). This includes accommodation, food, transport, and activities.',
    isPopular: true
  },
  {
    id: '3',
    category: 'planning',
    question: 'What\'s the best time to visit Sri Lanka?',
    answer: 'Sri Lanka has two monsoon seasons, so timing depends on your destinations. West/South coasts: December-March. East coast: April-September. Hill country: January-March and July-September. The shoulder seasons often offer the best balance of weather and fewer crowds.',
    isPopular: true
  },
  {
    id: '4',
    category: 'safety',
    question: 'Is Sri Lanka safe for solo female travelers?',
    answer: 'Sri Lanka is generally safe for solo female travelers. Use common sense: dress modestly (especially at religious sites), avoid isolated areas at night, and stay in reputable accommodations. Many solo female travelers have amazing experiences here. Trust your instincts and connect with other travelers.',
    isPopular: true
  },
  {
    id: '5',
    category: 'travel',
    question: 'How do I get around Sri Lanka?',
    answer: 'Trains are scenic and affordable (especially the Kandy-Ella route). Buses are cheap but can be crowded. Tuk-tuks for short distances. Private drivers for comfort and flexibility. Motorbike rentals for the adventurous (international license required).',
  },
  {
    id: '6',
    category: 'culture',
    question: 'What should I know about Sri Lankan culture?',
    answer: 'Sri Lankans are incredibly welcoming! Remove shoes when entering homes and temples. Dress modestly at religious sites. The right hand is used for eating and greeting. Pointing with your index finger is considered rude - use your whole hand. Learning a few Sinhala or Tamil phrases goes a long way.',
  },
  {
    id: '7',
    category: 'food',
    question: 'What food should I try and any dietary considerations?',
    answer: 'Must-try: Rice and curry, hoppers, kottu roti, fresh seafood, tropical fruits. Vegetarian/vegan options are abundant. Food can be very spicy - ask for "not spicy" if needed. Stick to bottled water and well-cooked food. Street food is generally safe but use your judgment.',
  },
  {
    id: '8',
    category: 'planning',
    question: 'How many days do I need to see Sri Lanka?',
    answer: 'Minimum 10-14 days for highlights (Colombo, Kandy, Sigiriya, hill country, southern beaches). 3-4 weeks for a comprehensive trip including east coast and northern regions. Even a week can give you a great taste if you focus on 2-3 regions.',
  },
  {
    id: '9',
    category: 'budget',
    question: 'Are there any hidden costs I should know about?',
    answer: 'Temple entrance fees (some are pricey for foreigners), national park fees, train reservation fees, airport departure tax (often included in ticket price), tips for guides and drivers. ATM fees can add up - withdraw larger amounts less frequently.',
  },
  {
    id: '10',
    category: 'safety',
    question: 'What about health and vaccinations?',
    answer: 'No mandatory vaccinations, but consider Hepatitis A&B, Typhoid, and Japanese Encephalitis if traveling to rural areas. Dengue mosquitoes are present - use repellent. Tap water isn\'t always safe - stick to bottled water. Bring basic medications as familiar brands may not be available.',
  }
];

const categories = [
  { id: 'all', name: 'All Questions', icon: MessageCircle, color: 'bg-primary' },
  { id: 'travel', name: 'Travel & Visa', icon: Plane, color: 'bg-secondary' },
  { id: 'budget', name: 'Budget & Money', icon: DollarSign, color: 'bg-accent' },
  { id: 'planning', name: 'Trip Planning', icon: Calendar, color: 'bg-success' },
  { id: 'safety', name: 'Safety & Health', icon: Shield, color: 'bg-destructive' },
  { id: 'culture', name: 'Culture & Customs', icon: MapPin, color: 'bg-primary' },
  { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'bg-secondary' },
];

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.isPopular);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know for your Sri Lankan adventure. 
            From visas to local customs, we've got you covered.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Popular Questions */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">🔥</span>
              Most Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.map((faq) => (
                <Card key={faq.id} className="testimonial-card hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">Popular</Badge>
                      <div>
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? `${category.color} text-white` 
                      : 'hover:border-primary/50'
                  } transition-all duration-300`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <Card className="testimonial-card">
          <CardContent className="p-6">
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-border/50">
                    <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        {faq.isPopular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse different categories.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our travel experts are here to help you plan the perfect Sri Lankan adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Expert
                </Button>
                <Button variant="outline">
                  Ask a Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;