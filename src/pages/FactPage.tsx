import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { catFacts, getRandomFact } from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { BookOpen, RefreshCw, Share2, Copy, Check, Lightbulb, Heart, Brain, Moon, Zap } from 'lucide-react';
import { toast } from 'sonner';

const factCategories = [
  { name: 'Behavior', icon: Brain, color: 'from-purple-500 to-purple-600', facts: catFacts.slice(0, 5) },
  { name: 'Body', icon: Heart, color: 'from-red-500 to-red-600', facts: catFacts.slice(5, 10) },
  { name: 'History', icon: BookOpen, color: 'from-amber-500 to-amber-600', facts: catFacts.slice(10, 15) },
  { name: 'Sleep', icon: Moon, color: 'from-blue-500 to-blue-600', facts: catFacts.slice(0, 3) },
  { name: 'Fun', icon: Zap, color: 'from-green-500 to-green-600', facts: catFacts.slice(8, 13) },
];

export function FactPage() {
  const [currentFact, setCurrentFact] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setCurrentFact(getRandomFact());
  }, []);

  const seo = {
    title: 'Cat Facts | Amazing & Interesting Facts About Cats',
    description: 'Discover amazing cat facts and learn fascinating things about felines. From ancient history to scientific discoveries, explore the wonderful world of cats.',
    keywords: 'cat facts, interesting cat facts, amazing cats, cat trivia, feline facts, cat information',
    ogImage: 'https://cataas.com/cat/says/Amazing%20Cat%20Facts'
  };

  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: 'Facts', url: '/cats/facts' }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: 'https://catsimage.pages.dev/cats/facts',
      image: seo.ogImage
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  const faqs = [
    {
      question: 'How many hours do cats sleep per day?',
      answer: 'Cats sleep an average of 12-16 hours per day, which is about 70% of their lives. Some cats can sleep up to 20 hours a day! They are crepuscular animals, meaning they are most active during dawn and dusk.'
    },
    {
      question: 'Why do cats purr?',
      answer: 'Cats purr for various reasons including contentment, self-healing, and communication. The frequency of a cat\'s purr (25-150 Hz) has been shown to promote healing and reduce stress in both cats and humans.'
    },
    {
      question: 'Can cats taste sweetness?',
      answer: 'No, cats cannot taste sweetness. They lack the taste receptors for sweet flavors due to a genetic mutation. This is why they are obligate carnivores and prefer meat-based foods.'
    },
    {
      question: 'How fast can cats run?',
      answer: 'Cats can run up to 30 miles per hour (48 km/h) in short bursts. Their powerful leg muscles and flexible spine allow them to accelerate quickly and make incredible jumps.'
    }
  ];

  const getNewFact = () => {
    let newFact = getRandomFact();
    while (newFact === currentFact) {
      newFact = getRandomFact();
    }
    setCurrentFact(newFact);
  };

  const copyFact = (fact: string, index: number) => {
    navigator.clipboard.writeText(fact);
    setCopiedIndex(index);
    toast.success('Fact copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const shareFact = async (fact: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Amazing Cat Fact!',
          text: fact,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${fact} - Learn more at ${window.location.href}`);
        toast.success('Fact copied to share!');
      }
    } catch (error) {
      toast.error('Failed to share');
    }
  };

  return (
    <>
      <SEOHead 
        metadata={seo} 
        breadcrumbs={breadcrumbs}
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-100 to-purple-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-indigo-600 text-sm font-medium mb-6 shadow-sm">
              <Lightbulb className="w-4 h-4" />
              <span>Did You Know?</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Amazing Cat Facts
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover fascinating facts about our feline friends. From ancient history 
              to scientific discoveries, learn something new about cats every day!
            </p>
            
            {/* Featured Fact Card */}
            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Fact of the Moment
                </h2>
                <p className="text-xl text-gray-700 mb-6 italic">
                  "{currentFact}"
                </p>
                <div className="flex justify-center gap-3">
                  <Button onClick={getNewFact} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Fact
                  </Button>
                  <Button onClick={() => shareFact(currentFact)} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fact Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Facts by Category
            </h2>
            <p className="text-gray-600">
              Explore cat facts organized by topic
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {factCategories.map((category) => (
              <Card key={category.name} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.name} Facts
                  </h3>
                  <ul className="space-y-3">
                    {category.facts.slice(0, 3).map((fact, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Facts */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Cat Facts
            </h2>
            <p className="text-gray-600">
              Browse our complete collection of fascinating cat facts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {catFacts.map((fact, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 flex-grow">{fact}</p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => copyFact(fact, index)}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => shareFact(fact)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Fact Subscription */}
      <section className="py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get a Daily Cat Fact
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start your day with a fascinating cat fact delivered to your inbox. 
            Learn something new about our feline friends every morning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full text-gray-900 flex-grow"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-70 mt-4">
            No spam, unsubscribe anytime. Just daily cat facts!
          </p>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn More About Cats
            </h2>
            <p className="text-gray-600">
              Explore our other cat-related content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/cats/breeds">
              <Card className="hover:shadow-lg transition-all text-center p-6">
                <Heart className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                <h3 className="font-semibold text-lg mb-2">Cat Breeds</h3>
                <p className="text-gray-600 text-sm">
                  Learn about different cat breeds and their characteristics
                </p>
              </Card>
            </Link>
            <Link to="/cats/cute">
              <Card className="hover:shadow-lg transition-all text-center p-6">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                <h3 className="font-semibold text-lg mb-2">Cute Cats</h3>
                <p className="text-gray-600 text-sm">
                  Browse adorable cat pictures that will make you smile
                </p>
              </Card>
            </Link>
            <Link to="/cats/funny">
              <Card className="hover:shadow-lg transition-all text-center p-6">
                <Zap className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold text-lg mb-2">Funny Cats</h3>
                <p className="text-gray-600 text-sm">
                  Laugh out loud with hilarious cat moments and memes
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}
