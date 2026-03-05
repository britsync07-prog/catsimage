import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cat, Sparkles, Gift, Image, BookOpen, Heart, Share2, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CatGallery } from '@/components/CatGallery';
import { MemeGenerator } from '@/components/MemeGenerator';
import { SEOHead, FAQSection } from '@/components/SEOHead';
import { 
  categorySEO, 
  generateFAQ, 
  getPopularTags,
  getRandomFact,
  popularBreeds 
} from '@/lib/api';
import { generateWebPageSchema } from '@/lib/seo';

export function HomePage() {
  const [dailyFact, setDailyFact] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    setDailyFact(getRandomFact());
    setFeaturedImage(`https://cataas.com/cat?cb=${Date.now()}`);
  }, []);

  const faqs = generateFAQ('default');
  const randomSEO = categorySEO.random;
  
  const schema = generateWebPageSchema({
    title: randomSEO.title,
    description: randomSEO.description,
    url: 'https://catsimage.pages.dev',
    image: 'https://cataas.com/cat'
  });

  const quickLinks = [
    { name: 'Random Cat', href: '/cats/random', icon: Sparkles, color: 'from-blue-500 to-blue-600', description: 'Generate random cats' },
    { name: 'Cute Cats', href: '/cats/cute', icon: Heart, color: 'from-pink-500 to-pink-600', description: 'Adorable kittens' },
    { name: 'Funny Cats', href: '/cats/funny', icon: Image, color: 'from-purple-500 to-purple-600', description: 'Hilarious moments' },
    { name: 'Cat GIFs', href: '/cats/gifs', icon: Gift, color: 'from-green-500 to-green-600', description: 'Animated cats' },
    { name: 'Memes', href: '/cats/memes', icon: Cat, color: 'from-orange-500 to-orange-600', description: 'Create memes' },
    { name: 'Wallpapers', href: '/cats/wallpapers', icon: Image, color: 'from-red-500 to-red-600', description: 'HD backgrounds' },
  ];

  return (
    <>
      <SEOHead metadata={randomSEO} schema={schema} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-cream-100 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-orange-600 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>100% Free - No Signup Required</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Generate Unlimited{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Cute Cat Images
              </span>{' '}
              🐱
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              The ultimate destination for cat lovers. Browse thousands of cat pictures, 
              create memes, download wallpapers, and discover amazing cat facts. All free!
            </p>
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.href}>
                  <div className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{link.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cat of the Day */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-600 font-medium mb-4">
                <Star className="w-5 h-5" />
                <span>Featured Cat of the Day</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Today's Star! ⭐
              </h2>
              <p className="text-gray-600 mb-6">
                Every day we feature a special cat from our collection. 
                This adorable feline is ready to brighten your day!
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl transform rotate-3 opacity-20" />
              <img
                src={featuredImage}
                alt="Featured cat of the day"
                className="relative rounded-3xl shadow-2xl w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Breeds */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-orange-600 font-medium mb-4">
              <TrendingUp className="w-5 h-5" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Cat Breeds
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most searched cat breeds. From majestic Maine Coons to playful Bengals, 
              find your perfect feline companion.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularBreeds.slice(0, 5).map((breed) => (
              <Link key={breed.name} to={`/cats/breed/${breed.name}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`https://cataas.com/cat/tag/${breed.name}?width=300&height=300`}
                      alt={`${breed.displayName} cat`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {breed.displayName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {(breed.searches / 1000).toFixed(0)}K searches/mo
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/cats/breeds">
              <Button variant="outline" size="lg">
                View All Breeds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Random Cat Generator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Random Cat Generator
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't decide what to look at? Let fate decide! Click the button below 
              to generate a random adorable cat image.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <RandomCatPreview />
          </div>
        </div>
      </section>

      {/* Cat Fact of the Day */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cat Fact of the Day
          </h2>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8">
            <p className="text-xl md:text-2xl font-medium">
              "{dailyFact}"
            </p>
          </div>
          <Link to="/cats/facts">
            <Button variant="secondary" size="lg" className="mt-8">
              More Cat Facts
            </Button>
          </Link>
        </div>
      </section>

      {/* Meme Generator Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Your Own Cat Memes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Turn any cat image into a viral meme! Add your own text and share 
              with friends. It's free and easy to use.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <MemeGenerator />
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Tag
            </h2>
            <p className="text-gray-600">
              Find exactly what you're looking for with our popular tags
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {getPopularTags().map((tag: string) => (
              <Link
                key={tag}
                to={`/cats/tag/${tag}`}
                className="px-6 py-3 bg-orange-100 text-orange-700 rounded-full font-medium hover:bg-orange-200 transition-colors capitalize"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Cat Gallery
            </h2>
            <p className="text-gray-600">
              Hand-picked adorable cats from our collection
            </p>
          </div>
          
          <CatGallery category="cute" limit={8} showAds={false} />
          
          <div className="text-center mt-12">
            <Link to="/cats/cute">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600">
                View More Cute Cats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}

// Random Cat Preview Component
function RandomCatPreview() {
  const [imageUrl, setImageUrl] = useState(`https://cataas.com/cat?cb=${Date.now()}`);
  const [loading, setLoading] = useState(false);

  const generateNew = () => {
    setLoading(true);
    setTimeout(() => {
      setImageUrl(`https://cataas.com/cat?cb=${Date.now()}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="text-center">
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-6 aspect-video">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={imageUrl}
          alt="Random cat"
          className={`w-full h-full object-cover transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}
        />
      </div>
      <Button
        onClick={generateNew}
        disabled={loading}
        size="lg"
        className="bg-gradient-to-r from-orange-500 to-orange-600"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Generate New Cat
      </Button>
    </div>
  );
}
