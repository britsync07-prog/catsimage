import { useParams, Link } from 'react-router-dom';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { MemeGenerator } from '@/components/MemeGenerator';
import { CatGallery } from '@/components/CatGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { memeTemplates } from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function MemePage() {
  const { template = 'grumpy' } = useParams<{ template: string }>();
  const templateData = memeTemplates.find(t => t.id === template) || memeTemplates[0];
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const seo = {
    title: `${templateData.name} Meme Generator | Create Funny Cat Memes`,
    description: `Create hilarious ${templateData.name} memes with our free generator. Add custom text and share with friends. No signup required!`,
    keywords: `${templateData.name} meme, cat meme generator, funny cat memes, create memes, viral cat memes`,
    ogImage: `https://cataas.com/cat/says/${encodeURIComponent(templateData.defaultText)}`
  };

  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: 'Memes', url: '/cats/memes' },
    { name: templateData.name, url: `/cats/meme/${template}` }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: `https://catsimage.pages.dev/cats/meme/${template}`,
      image: seo.ogImage
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  const faqs = [
    {
      question: `What is the ${templateData.name} meme?`,
      answer: `The ${templateData.name} is a popular cat meme template featuring a cat with a distinctive expression. It's commonly used to express ${templateData.defaultText.toLowerCase()} and has become a staple of internet culture.`
    },
    {
      question: 'How do I create a meme?',
      answer: 'Simply enter your text in the input field above, choose any optional settings like cat type or filters, and click "Generate Meme". Your custom meme will be created instantly!'
    },
    {
      question: 'Can I use these memes commercially?',
      answer: 'Our memes are free for personal use. For commercial use, please ensure you have the appropriate rights to the underlying image and text.'
    },
    {
      question: 'How do I share my meme?',
      answer: 'After generating your meme, you can download it, copy the URL, or use the share button to post directly to social media.'
    }
  ];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success('Text copied!');
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      <SEOHead 
        metadata={seo} 
        breadcrumbs={breadcrumbs}
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-100 to-pink-50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-purple-600 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Free Meme Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {templateData.name} Meme Generator
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create hilarious {templateData.name} memes in seconds! Add your own text 
              and generate share-worthy cat memes instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Meme Generator */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <MemeGenerator />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Templates */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Meme Templates
            </h2>
            <p className="text-gray-600">
              Try these popular cat meme templates
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {memeTemplates.filter(t => t.id !== template).map((t) => (
              <Link key={t.id} to={`/cats/meme/${t.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-4 text-center">
                    <img
                      src={`https://cataas.com/cat/says/${encodeURIComponent(t.defaultText)}?width=200&height=200`}
                      alt={t.name}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                      loading="lazy"
                    />
                    <h3 className="font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">{t.defaultText}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Meme Text Ideas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Meme Text Ideas
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "I can has cheezburger?",
                "This is fine.",
                "Human, I am disappoint.",
                "Feed me now.",
                "I see what you did there.",
                "Nope, not today.",
                "Why you do dis?",
                "I am the captain now.",
                "Deal with it.",
                "I regret nothing."
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                  onClick={() => handleCopyText(text)}
                >
                  <span className="font-medium text-gray-700">"{text}"</span>
                  <Button variant="ghost" size="sm">
                    {copiedText === text ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Funny Cats
            </h2>
            <p className="text-gray-600">
              Browse more hilarious cat images for your memes
            </p>
          </div>
          
          <CatGallery category="funny" limit={8} showAds={false} />
          
          <div className="text-center mt-12">
            <Link to="/cats/funny">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
                View More Funny Cats
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
