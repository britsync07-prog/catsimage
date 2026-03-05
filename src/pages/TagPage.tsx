import { useParams, Link } from 'react-router-dom';
import { CatGallery } from '@/components/CatGallery';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  generateTagSEO, 
  getPopularTags, 
  getRelatedCategories,
  defaultTags 
} from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Tag as TagIcon, TrendingUp, ArrowRight, Filter } from 'lucide-react';

// Tag descriptions for SEO content
const tagDescriptions: Record<string, string> = {
  cute: 'Adorable cats and kittens that will melt your heart. Browse our collection of the cutest feline photos.',
  funny: 'Hilarious cats in awkward positions and silly moments. Laugh out loud with our funny cat collection.',
  sleepy: 'Peaceful sleeping cats and napping kittens. Find the most relaxing cat images for your viewing pleasure.',
  angry: 'Grumpy cats and feline attitude. These cats are not having it and their expressions say it all.',
  happy: 'Joyful cats living their best lives. Smiling felines and content kitties in our happy collection.',
  grumpy: 'The grumpiest cats on the internet. Perfect for when you need to express your mood.',
  orange: 'Beautiful orange tabby cats and ginger felines. Discover the charm of orange cats.',
  black: 'Mysterious and elegant black cats. Browse our collection of stunning black feline photography.',
  white: 'Pure and graceful white cats. Discover the beauty of snowy-white felines.',
  tabby: 'Classic tabby cats with beautiful striped patterns. Explore our tabby cat collection.',
  calico: 'Colorful calico cats with their distinctive tri-color coats. Beautiful and unique.',
  siamese: 'Elegant Siamese cats with their striking blue eyes and pointed coats.',
  fluffy: 'Ultra-fluffy cats with the softest fur. Cloud-like felines you wish you could pet.',
  kitten: 'Adorable baby cats and tiny kittens. The cutest little furballs you\'ll ever see.',
  small: 'Tiny cats and petite felines. Small in size but big in personality.',
  big: 'Large cats and hefty felines. Majestic big cats with impressive presence.',
  box: 'Cats in boxes - because if it fits, it sits! Hilarious cats loving cardboard.',
  computer: 'Tech-savvy cats on keyboards and computers. Feline IT specialists at work.',
  glasses: 'Hipster cats wearing glasses. Smart and stylish felines.',
  hat: 'Fashionable cats wearing hats. The most stylish felines you\'ll ever see.',
  tie: 'Professional cats in ties. Business-ready felines for the corporate world.',
  sunglasses: 'Cool cats in sunglasses. The most stylish shades-wearing felines.',
  baby: 'Cats with babies and infants. Gentle felines with the littlest humans.',
  woman: 'Cats with women. Beautiful portraits of ladies and their feline companions.',
  man: 'Cats with men. Dudes and their cats - breaking all stereotypes.',
  girl: 'Cats with girls. Sweet moments between young ladies and their kitties.',
  boy: 'Cats with boys. Young lads and their feline friends having adventures.'
};

export function TagPage() {
  const { tag = 'cute' } = useParams<{ tag: string }>();
  const seo = generateTagSEO(tag);
  const description = tagDescriptions[tag] || `Browse our collection of ${tag} cat pictures. Find the perfect ${tag} feline images.`;
  const relatedTags = getPopularTags().filter(t => t !== tag).slice(0, 8);
  
  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: 'Tags', url: '/cats/tags' },
    { name: tag, url: `/cats/tag/${tag}` }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: `https://catsimage.pages.dev/cats/tag/${tag}`,
      image: `https://cataas.com/cat/tag/${tag}`
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  // Generate FAQ for this tag
  const faqs = [
    {
      question: `What are ${tag} cats?`,
      answer: `${tag.charAt(0).toUpperCase() + tag.slice(1)} cats are felines that display ${tag} characteristics. This could refer to their appearance, behavior, or overall vibe. Our collection features the best ${tag} cat images from around the internet.`
    },
    {
      question: `Can I download these ${tag} cat images?`,
      answer: 'Yes! All images on our site are free to download for personal use. Simply click the download button on any image to save it to your device.'
    },
    {
      question: `Are ${tag} cats a specific breed?`,
      answer: tag === 'orange' || tag === 'black' || tag === 'white' || tag === 'tabby' || tag === 'calico' 
        ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} refers to a cat\'s coat color or pattern rather than a specific breed. Many different breeds can have ${tag} coloring.`
        : `${tag.charAt(0).toUpperCase() + tag.slice(1)} describes a characteristic or behavior rather than a breed. Cats of any breed can be ${tag}!`
    },
    {
      question: 'How can I share these images?',
      answer: 'You can share images directly using the share button on each card, or copy the image URL to share anywhere you like. You can also download and share the image file.'
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
      <section className="relative bg-gradient-to-br from-orange-100 to-pink-50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-4 px-4 py-1 bg-orange-500 text-white capitalize">
              <TagIcon className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 capitalize">
              {tag} Cat Pictures
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link to={`/cats/tag/${tag}`}>
                <Button variant="outline" className="capitalize">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by {tag}
                </Button>
              </Link>
              <Link to="/cats/random">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Random Cat
                </Button>
              </Link>
            </div>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                  {tag} Cat Gallery
                </h2>
                <p className="text-gray-600">
                  Browse our collection of {tag} cat images. Click any image to download or share.
                </p>
              </div>
              
              <CatGallery 
                category={tag}
                tag={tag}
                limit={12} 
                showAds={true}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Related Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Related Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedTags.map((relatedTag: string) => (
                      <Link
                        key={relatedTag}
                        to={`/cats/tag/${relatedTag}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors capitalize"
                      >
                        {relatedTag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* All Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    All Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                    {defaultTags.map((t: string) => (
                      <Link
                        key={t}
                        to={`/cats/tag/${t}`}
                        className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                          t === tag 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Browse Categories
                  </h3>
                  <div className="space-y-2">
                    {getRelatedCategories(tag).map((cat: string) => (
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
            </div>
          </div>
        </div>
      </section>

      {/* More Tags Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore More Tags
            </h2>
            <p className="text-gray-600">
              Discover cats with different characteristics and styles
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {defaultTags.filter(t => t !== tag).map((t) => (
              <Link
                key={t}
                to={`/cats/tag/${t}`}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full font-medium hover:border-orange-300 hover:bg-orange-50 transition-colors capitalize shadow-sm"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}
