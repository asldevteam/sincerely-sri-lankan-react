import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqCategories = {
  visa: [
    
    {
      id: 'visa-1',
      question: 'Do I need a visa to volunteer in Sri Lanka?',
      answer: 'Yes, you\'ll need to apply for a short-term visit visa (tourist visa) before your arrival. AIESEC will guide you through the process and provide the required documents to support your application.',
    },
    {
      id: 'visa-2',
      question: 'Can I extend my visa if I want to stay longer?',
      answer: 'Yes, visa extensions are possible at the Department of Immigration in Colombo. However, we recommend you discuss this with your AIESEC contact before your visa expires to avoid extra fees or delays.',
    },
    {
      id: 'visa-3',
      question: 'Do I need a visa to intern or teach in Sri Lanka?',
      answer: 'Yes, for opportunities upto 6months you can apply for Business ETA using the official government website. You will be guided and provided with necessary documentation from the hosting AIESEC entity, You can obtain Business ETA within only 2-3 days. For any duration more than 6months you will have to go for resident VISA, the hosting AIESEC entity will take full responsibility and handle your process which takes approximately 30 days, you will be requested to submit Passport Copy, Criminal Clearance Report and there will be an extension within a month after your arrival.',
    },
  ],
  food: [
    {
      id: 'food-1',
      question: 'Is Sri Lankan food spicy?',
      answer: 'Yes, most Sri Lankan dishes are flavorful and a bit spicy, but don\'t worry! You\'ll always find milder options, and AIESEC members can suggest local spots that suit your taste.',
    },
    {
      id: 'food-2',
      question: 'Can I find vegetarian or vegan food easily?',
      answer: 'Absolutely! Many Sri Lankan dishes are naturally vegetarian. You\'ll also find plenty of restaurants and cafes in cities offering vegan options.',
    },
  ],
  lifestyle: [
    {
      id: 'lifestyle-1',
      question: 'What kind of clothes should I bring?',
      answer: 'Sri Lanka is warm and tropical, so light, breathable clothes are ideal. For temple visits or religious events, bring something modest that covers shoulders and knees. And bring corporate clothing and casual office wear for official needs.',
    },
    {
      id: 'lifestyle-2',
      question: 'Is it safe to go out at night?',
      answer: 'Most areas are safe, but it\'s always better to go out in groups and avoid isolated places late at night. AIESEC members can advise on safe local spots.',
    },
    {
      id: 'lifestyle-3',
      question: 'What is the common accommodation cost?',
      answer: 'A proper accommodation place with required facilities will usually cost ranging from 130-170 USD per month based on the facilities and preferences of yours. In most cases the accommodation is provided and covered by the companies if not the hosting AIESEC entity will help you finding a place with your preferences and you can cover the accommodation costs from your salary.',
    },
  ],
  travel: [
    {
      id: 'travel-1',
      question: 'How can I travel around Sri Lanka?',
      answer: 'You can use buses, trains, or ride-hailing apps like PickMe and Uber. They\'re affordable and convenient for volunteers.',
    },
    {
      id: 'travel-2',
      question: 'What are the must-visit places during my stay?',
      answer: 'Don\'t miss places like Ella, Sigiriya, Kandy, and the southern beaches. AIESEC often helps organize weekend trips for volunteers to explore these beautiful spots.',
    },
  ],
  aiesecSupport: [
    {
      id: 'aiesec-1',
      question: 'Who will help me after I arrive in Sri Lanka?',
      answer: 'An AIESEC buddy or host will meet you upon arrival and guide you through the first few days, including accommodation, transportation, and local tips.',
    },
    {
      id: 'aiesec-2',
      question: 'What if I face any issues during my project?',
      answer: 'AIESEC will always be there for you. You can contact your EP buddy or the AIESEC team at any time, they\'ll help you resolve any problem quickly.',
    },
  ],
};

const FAQSection = () => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState('visa');

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

        {/* FAQ Tabs */}
        <Card className="testimonial-card p-0">
          <CardContent className="p-[20px]">
            {isMobile ? (
              <>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full mb-6">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">VISA</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="aiesecSupport">AIESEC Support</SelectItem>
                  </SelectContent>
                </Select>
                {selectedCategory === 'visa' && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    {faqCategories.visa.map((faq) => (
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
                )}
                {selectedCategory === 'food' && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    {faqCategories.food.map((faq) => (
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
                )}
                {selectedCategory === 'lifestyle' && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    {faqCategories.lifestyle.map((faq) => (
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
                )}
                {selectedCategory === 'travel' && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    {faqCategories.travel.map((faq) => (
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
                )}
                {selectedCategory === 'aiesecSupport' && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    {faqCategories.aiesecSupport.map((faq) => (
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
                )}
              </>
            ) : (
              <Tabs defaultValue="visa" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="visa">VISA</TabsTrigger>
                  <TabsTrigger value="food">Food</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                  <TabsTrigger value="travel">Travel</TabsTrigger>
                  <TabsTrigger value="aiesecSupport">AIESEC Support</TabsTrigger>
                </TabsList>
                <TabsContent value="visa" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories.visa.map((faq) => (
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
                </TabsContent>
                <TabsContent value="food" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories.food.map((faq) => (
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
                </TabsContent>
                <TabsContent value="lifestyle" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories.lifestyle.map((faq) => (
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
                </TabsContent>
                <TabsContent value="travel" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories.travel.map((faq) => (
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
                </TabsContent>
                <TabsContent value="aiesecSupport" className="mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqCategories.aiesecSupport.map((faq) => (
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
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>


      </div>
    </section>
  );
};

export default FAQSection;