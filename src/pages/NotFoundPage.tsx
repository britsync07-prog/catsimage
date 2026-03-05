import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cat, Home, Search, ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  const seo = {
    title: 'Page Not Found | CatSEO Pro',
    description: 'Sorry, the page you are looking for could not be found. Explore our cat image collection instead!',
    keywords: '404, page not found, cat images',
    ogImage: 'https://cataas.com/cat/says/Page%20Not%20Found'
  };

  const popularLinks = [
    { name: 'Random Cat Generator', href: '/cats/random', icon: Cat },
    { name: 'Cute Cats', href: '/cats/cute', icon: Cat },
    { name: 'Funny Cats', href: '/cats/funny', icon: Cat },
    { name: 'Cat Memes', href: '/cats/memes', icon: Cat },
    { name: 'Cat GIFs', href: '/cats/gifs', icon: Cat },
    { name: 'Cat Facts', href: '/cats/facts', icon: Cat },
  ];

  return (
    <>
      <SEOHead metadata={seo} />
      
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Image */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <img
                src={`https://cataas.com/cat/says/404?width=400&height=400`}
                alt="Confused cat - 404 error"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                404
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Oops! Page Not Found
            </h1>
            
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Looks like this page has gone chasing mice! 
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <p className="text-gray-500 mb-8">
              But don't worry, we have plenty of cats to keep you company!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link to="/cats/random">
                <Button size="lg" variant="outline">
                  <Cat className="w-5 h-5 mr-2" />
                  See a Random Cat
                </Button>
              </Link>
            </div>
            
            {/* Popular Links */}
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Or check out these popular pages:
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularLinks.map((link) => (
                  <Link key={link.name} to={link.href}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                            <link.icon className="w-5 h-5 text-orange-500" />
                          </div>
                          <span className="font-medium text-gray-900">{link.name}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Search Suggestion */}
            <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl">
              <Search className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Looking for something specific?
              </h3>
              <p className="text-gray-600 mb-4">
                Try browsing our categories or tags to find what you need.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['cute', 'funny', 'sleepy', 'angry', 'fluffy', 'kitten'].map((tag) => (
                  <Link
                    key={tag}
                    to={`/cats/tag/${tag}`}
                    className="px-4 py-2 bg-white rounded-full text-orange-600 hover:bg-orange-100 transition-colors capitalize shadow-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
