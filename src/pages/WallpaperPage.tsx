import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { SEOHead, FAQSection, Breadcrumb } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { wallpaperStyles, getWallpaper } from '@/lib/api';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Download, Monitor, Smartphone, Tablet, Image } from 'lucide-react';
import { toast } from 'sonner';

const resolutions = [
  { name: 'Desktop HD', width: 1920, height: 1080, icon: Monitor },
  { name: 'Desktop 4K', width: 3840, height: 2160, icon: Monitor },
  { name: 'Mobile', width: 1080, height: 1920, icon: Smartphone },
  { name: 'Tablet', width: 2048, height: 2732, icon: Tablet },
  { name: 'Ultrawide', width: 3440, height: 1440, icon: Monitor },
];

export function WallpaperPage() {
  const { style = 'cute' } = useParams<{ style: string }>();
  const styleData = wallpaperStyles.find(s => s.id === style) || wallpaperStyles[0];
  const [selectedResolution, setSelectedResolution] = useState(resolutions[0]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [generating, setGenerating] = useState(false);

  const seo = {
    title: `${styleData.name} Cat Wallpapers | Free HD Backgrounds`,
    description: `Download beautiful ${styleData.name.toLowerCase()} cat wallpapers for your desktop and mobile. ${styleData.description}. 100% free!`,
    keywords: `${styleData.name.toLowerCase()} cat wallpapers, cat backgrounds, hd cat images, desktop wallpapers, mobile wallpapers`,
    ogImage: `https://cataas.com/cat/tag/${style}?width=1200&height=630`
  };

  const breadcrumbs = [
    { name: 'Cats', url: '/cats' },
    { name: 'Wallpapers', url: '/cats/wallpapers' },
    { name: styleData.name, url: `/cats/wallpaper/${style}` }
  ];

  const schema = [
    generateWebPageSchema({
      title: seo.title,
      description: seo.description,
      url: `https://catsimage.pages.dev/cats/wallpaper/${style}`,
      image: seo.ogImage
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ])
  ];

  const faqs = [
    {
      question: `What are ${styleData.name} cat wallpapers?`,
      answer: `${styleData.name} cat wallpapers are backgrounds featuring cats in a ${styleData.name.toLowerCase()} style. ${styleData.description}. They're perfect for customizing your device.`
    },
    {
      question: 'What resolutions are available?',
      answer: 'We offer wallpapers in multiple resolutions including Desktop HD (1920x1080), Desktop 4K (3840x2160), Mobile (1080x1920), Tablet (2048x2732), and Ultrawide (3440x1440).'
    },
    {
      question: 'Are these wallpapers really free?',
      answer: 'Yes! All our cat wallpapers are 100% free to download and use as your desktop or mobile background. No signup required.'
    },
    {
      question: 'How do I set a wallpaper on my device?',
      answer: 'Download the image, then right-click (desktop) or long-press (mobile) and select "Set as wallpaper" or "Set as background". The exact steps vary by device.'
    }
  ];

  const generatePreview = () => {
    setGenerating(true);
    const url = getWallpaper(selectedResolution.width, selectedResolution.height, style);
    setPreviewUrl(`${url}&cb=${Date.now()}`);
    setGenerating(false);
  };

  const handleDownload = async () => {
    if (!previewUrl) {
      generatePreview();
      return;
    }
    
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cat-wallpaper-${style}-${selectedResolution.width}x${selectedResolution.height}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Wallpaper downloaded!');
    } catch (error) {
      toast.error('Failed to download');
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
      <section className="relative bg-gradient-to-br from-blue-100 to-purple-50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-blue-600 text-sm font-medium mb-6 shadow-sm">
              <Image className="w-4 h-4" />
              <span>Free HD Wallpapers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {styleData.name} Cat Wallpapers
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {styleData.description}. Download beautiful high-quality 
              cat wallpapers for your desktop, mobile, or tablet. 100% free!
            </p>
          </div>
        </div>
      </section>

      {/* Wallpaper Generator */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Controls */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Resolution
                      </label>
                      <Select 
                        value={selectedResolution.name} 
                        onValueChange={(value) => {
                          const res = resolutions.find(r => r.name === value);
                          if (res) setSelectedResolution(res);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          {resolutions.map((res) => (
                            <SelectItem key={res.name} value={res.name}>
                              <div className="flex items-center gap-2">
                                <res.icon className="w-4 h-4" />
                                {res.name} ({res.width}x{res.height})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Selected:</h4>
                      <p className="text-gray-600">
                        <span className="font-medium">Style:</span> {styleData.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Resolution:</span> {selectedResolution.width}x{selectedResolution.height}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={generatePreview}
                        disabled={generating}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Generate Preview
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={`${styleData.name} wallpaper preview`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-400 p-8">
                        <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Click "Generate Preview" to see your wallpaper</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wallpaper Styles */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Wallpaper Styles
            </h2>
            <p className="text-gray-600">
              Explore different cat wallpaper categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {wallpaperStyles.filter(s => s.id !== style).map((s) => (
              <Link key={s.id} to={`/cats/wallpaper/${s.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`https://cataas.com/cat/tag/${s.id}?width=400&height=225`}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900">{s.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Wallpapers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample {styleData.name} Wallpapers
            </h2>
            <p className="text-gray-600">
              Click any wallpaper to download in full resolution
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="group relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <img
                  src={`https://cataas.com/cat/tag/${style}?width=400&height=225&cb=${i}`}
                  alt={`${styleData.name} wallpaper ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}
