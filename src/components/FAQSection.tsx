import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Do I need a visa to visit Sri Lanka?',
    answer: 'Most travelers need an Electronic Travel Authorization (ETA) which can be obtained online before arrival. The ETA is valid for 30 days and costs around $20. Some countries have visa-free entry. Check the official Sri Lanka Immigration website for the most current requirements.',
  },
  {
    id: '2',
    question: 'How much should I budget for a 2-week trip?',
    answer: 'For backpackers: $30-50/day (hostels, local food, public transport). Mid-range: $50-100/day (guesthouses, mix of local/tourist restaurants, private transport). Luxury: $100+/day (hotels, fine dining, private tours). This includes accommodation, food, transport, and activities.',
  },
  {
    id: '3',
    question: 'What\'s the best time to visit Sri Lanka?',
    answer: 'Sri Lanka has two monsoon seasons, so timing depends on your destinations. West/South coasts: December-March. East coast: April-September. Hill country: January-March and July-September. The shoulder seasons often offer the best balance of weather and fewer crowds.',
  },
  {
    id: '4',
    question: 'Is Sri Lanka safe for solo female travelers?',
    answer: 'Sri Lanka is generally safe for solo female travelers. Use common sense: dress modestly (especially at religious sites), avoid isolated areas at night, and stay in reputable accommodations. Many solo female travelers have amazing experiences here. Trust your instincts and connect with other travelers.',
  },
  {
    id: '5',
    question: 'How do I get around Sri Lanka?',
    answer: 'Trains are scenic and affordable (especially the Kandy-Ella route). Buses are cheap but can be crowded. Tuk-tuks for short distances. Private drivers for comfort and flexibility. Motorbike rentals for the adventurous (international license required).',
  },
  {
    id: '6',
    question: 'What should I know about Sri Lankan culture?',
    answer: 'Sri Lankans are incredibly welcoming! Remove shoes when entering homes and temples. Dress modestly at religious sites. The right hand is used for eating and greeting. Pointing with your index finger is considered rude - use your whole hand. Learning a few Sinhala or Tamil phrases goes a long way.',
  },
  {
    id: '7',
    question: 'What food should I try and any dietary considerations?',
    answer: 'Must-try: Rice and curry, hoppers, kottu roti, fresh seafood, tropical fruits. Vegetarian/vegan options are abundant. Food can be very spicy - ask for "not spicy" if needed. Stick to bottled water and well-cooked food. Street food is generally safe but use your judgment.',
  },
  {
    id: '8',
    question: 'How many days do I need to see Sri Lanka?',
    answer: 'Minimum 10-14 days for highlights (Colombo, Kandy, Sigiriya, hill country, southern beaches). 3-4 weeks for a comprehensive trip including east coast and northern regions. Even a week can give you a great taste if you focus on 2-3 regions.',
  },
];

const FAQSection = () => {

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent mb-6">
            Most Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know for your Sri Lankan adventure. 
            From visas to local customs, we've got you covered.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="testimonial-card">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-border/50">
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>


      </div>
    </section>
  );
};

export default FAQSection;