import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  title: string;
  content: string;
  ImageUrl: string;
  postBy: string;
  visitorCountry: string;

}

const stories: Story[] = [
  {
    id: '1',
    title: 'Feeling Valued and Supported Throughout',
    content: 'They did a really great job and I‘m very satisfied about the way they cared about us. The communication was always very good and we received help and answers to our questions very quickly. Thank you :)',
    ImageUrl: '/images/Testimonial Franka.jpg',
    postBy: 'Franka Wimmer',
    visitorCountry: 'Germany'

  },
  {
    id: '2',
    title: 'A Journey Filled with Help and Happiness',
    content: 'It was a good experience with aiesec in srilanka, stayed there for 45 days in kosgoda and took a tour in srilanka and it was amazing and the aiesec members helped as a lot in any problem we were facing.',
    ImageUrl: '/images/Testmonial Ahamed.jpg',
    postBy: 'Abdelrahmen Ahamed',
    visitorCountry: 'Egypt'

  },
  {
    id: '3',
    title: 'Best Experience of My Life',
    content: 'I volunteered in Sri Lanka through AIESEC in SL for 6 weeks. It was the best experience of my life. U witnesses an actual impact that I made there. I am super grateful for all the things that the experience offered me.',
    ImageUrl: '/images/Testimonial Prabhakar.webp',
    postBy: 'Prabhakar Chalise',
    visitorCountry: 'India'

  },
  {
    id: '4',
    title: 'A Home Away from Home',
    content: 'One of the best exchanges in my life. I have done 2 different projects, one after another, where I have met some really amazing people. I have made friends, in which, if I will have any other chance in the future to come back in Sri Lanka in a visit, I will have the assurance that I will be surrounded by friends.',
    ImageUrl: '/images/Testimonial Vlad.webp',
    postBy: 'Vlad Walker',
    visitorCountry: 'Europe'

  }
];

const StoriesSection = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const story = stories[currentStory];

  return (
    <section id="stories" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
         Testimonials & Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Media Area */}
          <div className="relative h-[400px] md:h-[500px] bg-muted rounded-lg overflow-hidden">
          
              <img 
                src={story.ImageUrl} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
           
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Text Area */}
          <div className="space-y-6 ">
            <h3 className="text-3xl font-bold text-foreground">
              {story.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed lg:min-h-[150px]">
              {story.content}
            </p>
            <p className="text-md text-muted-foreground ">
              {story.postBy}, {story.visitorCountry}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button
               className='bg-transparent hover:bg-primary '
                size="icon"
                onClick={prevStory}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </Button>
              <div className="flex gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStory 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <Button

             className='bg-transparent hover:bg-primary '
                size="icon"
                onClick={nextStory}
              >
                <ChevronRight className="w-4 h-4 text-white border-white " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
