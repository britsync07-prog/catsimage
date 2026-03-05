import { useParams, Link } from 'react-router-dom';
import { CatGallery } from '@/components/CatGallery';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { AdSidebar } from '@/components/AdBanner';
import { Card, CardContent } from '@/components/ui/card';
import { 
  categorySEO, 
  generateFAQ,
  getRelatedCategories,
  getPopularTags,
  popularBreeds 
} from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Sparkles, ArrowRight, Cat } from 'lucide-react';

const categoryContent: Record<string, { title: string; description: string; intro: string }> = {
  random: {
    title: 'Random Cat Generator',
    description: 'Generate unlimited random cat pictures instantly',
    intro: 'Welcome to our random cat generator! With a single click, you can discover adorable, funny, and heartwarming cat images from our vast collection. Whether you need a mood boost or just love cats, our generator delivers fresh feline content every time.'
  },
  cute: {
    title: 'Cute Cat Pictures',
    description: 'Browse the cutest cat and kitten photos',
    intro: 'Prepare for cuteness overload! Our collection of cute cat pictures features the most adorable kittens, fluffy felines, and heartwarming moments. From tiny kittens taking their first steps to sleepy cats in cozy positions, these images are guaranteed to make you smile.'
  },
  funny: {
    title: 'Funny Cat Pictures',
    description: 'Laugh out loud with hilarious cat photos',
    intro: 'Cats are natural comedians, and our funny cat picture collection proves it! Discover cats in awkward positions, making silly faces, and creating moments of pure hilarity. These images are perfect for sharing with friends or brightening a dull day.'
  },
  gifs: {
    title: 'Cat GIFs',
    description: 'Animated cat images and reactions',
    intro: 'Bring your conversations to life with our collection of cat GIFs! From playful kittens to dramatic reactions, these animated images are perfect for expressing emotions, responding to messages, or simply enjoying the magic of moving cats.'
  },
  memes: {
    title: 'Cat Memes',
    description: 'Create and share funny cat memes',
    intro: 'Cat memes are the language of the internet! Browse our collection of viral cat memes or create your own. From Grumpy Cat classics to the latest trending formats, find the perfect meme for any situation.'
  },
  wallpapers: {
    title: 'Cat Wallpapers',
    description: 'Beautiful HD cat backgrounds',
    intro: 'Transform your screen with stunning cat wallpapers! Our collection features high-quality images perfect for desktops, laptops, tablets, and phones. From artistic portraits to adorable snapshots, find the perfect background to showcase your love for cats.'
  },
  reactions: {
    title: 'Cat Reaction Images',
    description: 'Perfect cat reactions for any situation',
    intro: 'Find the perfect cat reaction for every moment! Our collection includes judging cats, surprised felines, happy kitties, and dramatic reactions. Whether you need to express joy, disapproval, or confusion, we have the cat for that.'
  },
  facts: {
    title: 'Cat Facts',
    description: 'Amazing and interesting facts about cats',
    intro: 'Did you know cats spend 70% of their lives sleeping? Or that they can rotate their ears 180 degrees? Discover fascinating facts about our feline friends that will surprise and delight cat lovers of all ages.'
  },
  breeds: {
    title: 'Cat Breeds',
    description: 'Complete guide to all cat breeds',
    intro: 'Explore the wonderful world of cat breeds! From the majestic Maine Coon to the playful Bengal, learn about each breed\'s personality, care needs, and unique characteristics. Find the perfect breed for your lifestyle.'
  }
};

export function CategoryPage() {
  const { category = 'random' } = useParams<{ category: string }>();
  const content = categoryContent[category] || categoryContent.random;
  const seo = categorySEO[category] || categorySEO.random;
  const faqs = generateFAQ(category);
  const relatedCategories = getRelatedCategories(category);
  const isGif = category === 'gifs';
  
  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: content.title, url: `/cats/${category}` }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: `https://catsimage.pages.dev/cats/${category}`,
      image: 'https://cataas.com/cat'
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  return (
    <>
      <SEOHead 
        metadata={seo} 
        breadcrumbs={breadcrumbs}
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-100 to-orange-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-orange-600 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Free & Unlimited</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {content.description}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Gallery */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Browse {content.title}
                </h2>
                <p className="text-gray-600">
                  Click any image to view, download, or share
                </p>
              </div>
              
              <CatGallery 
                category={category} 
                limit={12} 
                showAds={true}
                isGif={isGif}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Ad */}
              <AdSidebar />
              
              {/* Related Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Related Categories
                  </h3>
                  <div className="space-y-2">
                    {relatedCategories.map((cat: string) => (
                      <Link
                        key={cat}
                        to={`/cats/${cat}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 transition-colors capitalize"
                      >
                        <span>{cat} Cats</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getPopularTags().slice(0, 8).map((tag: string) => (
                      <Link
                        key={tag}
                        to={`/cats/tag/${tag}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors capitalize"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Breeds */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Popular Breeds
                  </h3>
                  <div className="space-y-2">
                    {popularBreeds.slice(0, 5).map((breed) => (
                      <Link
                        key={breed.name}
                        to={`/cats/breed/${breed.name}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <Cat className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="capitalize">{breed.displayName}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* More Content Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More {content.title} to Explore
            </h2>
            <p className="text-gray-600">
              Our collection is constantly growing with new cat images added daily. 
              Check back often for fresh content!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Daily Updates</h3>
              <p className="text-gray-600 text-sm">
                New cat images added every day to keep our collection fresh
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <Cat className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">
                All images are free to use for personal and non-commercial purposes
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Sharing</h3>
              <p className="text-gray-600 text-sm">
                Share your favorite cat images with friends on social media
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}
