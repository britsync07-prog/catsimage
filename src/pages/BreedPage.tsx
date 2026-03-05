import { useParams, Link } from 'react-router-dom';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { CatGallery } from '@/components/CatGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { popularBreeds } from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Cat, Heart, Ruler, Weight, Calendar, ArrowRight, Star } from 'lucide-react';

// Breed information database
const breedInfo: Record<string, {
  origin: string;
  lifespan: string;
  weight: string;
  height: string;
  personality: string[];
  description: string;
  care: string[];
  funFacts: string[];
}> = {
  'maine-coon': {
    origin: 'United States (Maine)',
    lifespan: '12-15 years',
    weight: '13-18 lbs (male), 8-12 lbs (female)',
    height: '10-16 inches',
    personality: ['Gentle', 'Friendly', 'Intelligent', 'Playful', 'Social'],
    description: 'The Maine Coon is one of the largest domesticated cat breeds. Known as the "gentle giant," these cats are friendly, intelligent, and make excellent family pets. They have distinctive tufted ears, bushy tails, and a shaggy coat that helps them survive harsh winters.',
    care: [
      'Regular grooming (2-3 times per week)',
      'Plenty of exercise and playtime',
      'High-quality diet appropriate for large breeds',
      'Regular vet checkups for heart health'
    ],
    funFacts: [
      'Maine Coons can weigh up to 25 pounds',
      'They are excellent hunters and were originally working cats',
      'Their paws are large and tufted, acting like snowshoes',
      'They are known for their chirping trill rather than meowing'
    ]
  },
  'bengal': {
    origin: 'United States',
    lifespan: '12-16 years',
    weight: '10-15 lbs (male), 8-12 lbs (female)',
    height: '8-10 inches',
    personality: ['Active', 'Intelligent', 'Playful', 'Curious', 'Energetic'],
    description: 'Bengal cats are known for their wild, leopard-like appearance and high energy levels. They are intelligent, active, and require plenty of mental and physical stimulation. Bengals love water and are often found playing in sinks or showers.',
    care: [
      'Lots of interactive play and exercise',
      'Mental stimulation with puzzle toys',
      'Minimal grooming needed',
      'High-protein diet'
    ],
    funFacts: [
      'Bengals have a glitter gene that makes their coat sparkle',
      'They are one of the few cat breeds that love water',
      'Their coat patterns are called rosettes, like wild leopards',
      'They can jump up to 3 times their height'
    ]
  },
  'siamese': {
    origin: 'Thailand (Siam)',
    lifespan: '15-20 years',
    weight: '11-15 lbs (male), 8-12 lbs (female)',
    height: '8-10 inches',
    personality: ['Vocal', 'Social', 'Intelligent', 'Affectionate', 'Demanding'],
    description: 'Siamese cats are one of the oldest and most recognizable cat breeds. Known for their striking blue almond-shaped eyes and color-point coats, they are extremely vocal and social cats that form strong bonds with their owners.',
    care: [
      'Lots of attention and companionship',
      'Interactive toys and games',
      'Minimal grooming (short coat)',
      'Warm environment (sensitive to cold)'
    ],
    funFacts: [
      'Siamese cats are born completely white',
      'They are one of the most vocal cat breeds',
      'Their color points develop due to temperature-sensitive pigment',
      'They were once considered sacred in Thailand'
    ]
  },
  'persian': {
    origin: 'Persia (modern-day Iran)',
    lifespan: '12-17 years',
    weight: '9-14 lbs',
    height: '8-10 inches',
    personality: ['Calm', 'Gentle', 'Quiet', 'Affectionate', 'Lazy'],
    description: 'Persian cats are known for their luxurious long coats and sweet, gentle personalities. They are calm, quiet cats that prefer a relaxed lifestyle. Their distinctive flat face and large eyes make them one of the most recognizable breeds.',
    care: [
      'Daily grooming to prevent matting',
      'Regular face cleaning',
      'Indoor living recommended',
      'Monitor for breathing issues'
    ],
    funFacts: [
      'Persians have been popular since the Victorian era',
      'Their long coat requires daily brushing',
      'They are one of the most popular cat breeds worldwide',
      'They prefer quiet, peaceful environments'
    ]
  },
  'ragdoll': {
    origin: 'United States (California)',
    lifespan: '12-17 years',
    weight: '15-20 lbs (male), 10-15 lbs (female)',
    height: '9-11 inches',
    personality: ['Relaxed', 'Gentle', 'Affectionate', 'Docile', 'Social'],
    description: 'Ragdolls are large, affectionate cats known for going limp when picked up (hence the name). They have striking blue eyes and color-point coats. Ragdolls are extremely people-oriented and follow their owners around like puppies.',
    care: [
      'Regular grooming (2-3 times per week)',
      'Indoor living strongly recommended',
      'Plenty of human interaction',
      'Gentle play (not very active)'
    ],
    funFacts: [
      'Ragdolls go limp when picked up',
      'They are one of the largest domestic cat breeds',
      'All Ragdolls have blue eyes',
      'They are known as "puppy cats" for their dog-like behavior'
    ]
  },
  'sphynx': {
    origin: 'Canada',
    lifespan: '12-14 years',
    weight: '8-12 lbs',
    height: '8-10 inches',
    personality: ['Energetic', 'Affectionate', 'Curious', 'Playful', 'Social'],
    description: 'Sphynx cats are hairless cats known for their wrinkled skin and large ears. Despite their unusual appearance, they are incredibly affectionate and love to be the center of attention. They are energetic, playful, and get along well with other pets.',
    care: [
      'Regular bathing (weekly) to remove skin oils',
      'Keep warm (need sweaters in cold weather)',
      'Sun protection (can get sunburned)',
      'Regular ear cleaning'
    ],
    funFacts: [
      'Sphynx cats are not completely hairless - they have peach fuzz',
      'They are one of the warmest cat breeds to touch',
      'Their body temperature is higher than other cats',
      'They were discovered as a natural mutation in 1966'
    ]
  }
};

export function BreedPage() {
  const { breed = 'maine-coon' } = useParams<{ breed: string }>();
  const breedData = popularBreeds.find(b => b.name === breed);
  const info = breedInfo[breed];
  
  const displayName = breedData?.displayName || breed.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const searchVolume = breedData ? `${(breedData.searches / 1000).toFixed(0)}K` : 'Popular';

  const seo = {
    title: `${displayName} Cat | Complete Breed Guide & Pictures`,
    description: info 
      ? `Learn all about ${displayName} cats. ${info.description.slice(0, 150)}...`
      : `Discover everything about ${displayName} cats. Browse pictures, learn about their personality, and find care tips.`,
    keywords: `${displayName.toLowerCase()} cat, ${breed} breed, ${displayName.toLowerCase()} kittens, ${breed} care, ${displayName.toLowerCase()} personality`,
    ogImage: `https://cataas.com/cat/tag/${breed}?width=1200&height=630`
  };

  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: 'Breeds', url: '/cats/breeds' },
    { name: displayName, url: `/cats/breed/${breed}` }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: `https://catsimage.pages.dev/cats/breed/${breed}`,
      image: seo.ogImage
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  const faqs = info ? [
    {
      question: `Where do ${displayName} cats come from?`,
      answer: `${displayName} cats originate from ${info.origin}. They have become one of the most popular and beloved cat breeds worldwide.`
    },
    {
      question: `How long do ${displayName} cats live?`,
      answer: `${displayName} cats typically live ${info.lifespan}. With proper care, regular vet checkups, and a healthy diet, they can enjoy long, happy lives.`
    },
    {
      question: `What is the personality of a ${displayName} cat?`,
      answer: `${displayName} cats are known for being ${info.personality.join(', ').toLowerCase()}. They make wonderful companions for the right family.`
    },
    {
      question: `How do I care for a ${displayName} cat?`,
      answer: info.care.join('. ') + '.'
    }
  ] : [
    {
      question: `What is a ${displayName} cat?`,
      answer: `${displayName} cats are a popular breed known for their unique characteristics and wonderful personality. Browse our gallery to see more!`
    }
  ];

  return (
    <>
      <SEOHead 
        metadata={seo} 
        breadcrumbs={breadcrumbs}
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-100 to-orange-50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <Badge className="mb-4 bg-amber-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                {searchVolume} monthly searches
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 capitalize">
                {displayName} Cat
              </h1>
              
              {info && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {info.personality.map((trait) => (
                    <Badge key={trait} variant="secondary" className="capitalize">
                      {trait}
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-xl text-gray-600 mb-8">
                {info?.description || `Discover everything about the wonderful ${displayName} cat breed. Browse pictures, learn about their personality, and find care tips.`}
              </p>
              
              <div className="flex gap-4">
                <Link to={`/cats/tag/${breed}`}>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    <Cat className="w-4 h-4 mr-2" />
                    View Pictures
                  </Button>
                </Link>
                <Link to="/cats/breeds">
                  <Button variant="outline">
                    All Breeds
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl transform rotate-3 opacity-20" />
              <img
                src={`https://cataas.com/cat/tag/${breed}?width=600&height=600`}
                alt={`${displayName} cat`}
                className="relative rounded-3xl shadow-2xl w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      {info && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p className="text-sm text-gray-500">Lifespan</p>
                <p className="font-semibold text-lg">{info.lifespan}</p>
              </Card>
              <Card className="text-center p-6">
                <Weight className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-semibold text-lg">{info.weight}</p>
              </Card>
              <Card className="text-center p-6">
                <Ruler className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-semibold text-lg">{info.height}</p>
              </Card>
              <Card className="text-center p-6">
                <Heart className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p className="text-sm text-gray-500">Origin</p>
                <p className="font-semibold text-lg">{info.origin}</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Care Guide */}
      {info && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {displayName} Care Guide
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-amber-500" />
                      Care Tips
                    </h3>
                    <ul className="space-y-3">
                      {info.care.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      Fun Facts
                    </h3>
                    <ul className="space-y-3">
                      {info.funFacts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {displayName} Cat Pictures
            </h2>
            <p className="text-gray-600">
              Browse our collection of beautiful {displayName} cat images
            </p>
          </div>
          
          <CatGallery tag={breed} limit={12} showAds={true} />
        </div>
      </section>

      {/* Other Breeds */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Other Breeds
            </h2>
            <p className="text-gray-600">
              Discover more amazing cat breeds
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularBreeds.filter(b => b.name !== breed).slice(0, 5).map((b) => (
              <Link key={b.name} to={`/cats/breed/${b.name}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`https://cataas.com/cat/tag/${b.name}?width=300&height=300`}
                      alt={`${b.displayName} cat`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900">{b.displayName}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/cats/breeds">
              <Button size="lg" variant="outline">
                View All Breeds
                <ArrowRight className="w-4 h-4 ml-2" />
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
