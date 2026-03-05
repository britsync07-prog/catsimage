import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Cat, Gift, Image, Sparkles } from 'lucide-react';
import { getRandomCat, getRandomGif } from '@/lib/api';
import { toast } from 'sonner';

interface RandomCatButtonProps {
  variant?: 'default' | 'cute' | 'funny' | 'gif' | 'meme';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showPreview?: boolean;
}

export function RandomCatButton({
  variant = 'default',
  size = 'default',
  className = '',
  showPreview = true,
}: RandomCatButtonProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const variants = {
    default: { icon: Cat, label: 'Random Cat', tag: '' },
    cute: { icon: Sparkles, label: 'Cute Cat', tag: 'cute' },
    funny: { icon: Image, label: 'Funny Cat', tag: 'funny' },
    gif: { icon: Gift, label: 'Random GIF', tag: '' },
    meme: { icon: Cat, label: 'Meme Cat', tag: 'funny' },
  };

  const currentVariant = variants[variant];
  const Icon = currentVariant.icon;

  const handleClick = async () => {
    setLoading(true);
    try {
      let url: string;
      if (variant === 'gif') {
        url = await getRandomGif(currentVariant.tag);
      } else {
        url = await getRandomCat({ tag: currentVariant.tag || undefined });
      }
      // Add cache buster
      setImageUrl(`${url}${url.includes('?') ? '&' : '?'}cb=${Date.now()}`);
      toast.success('New cat generated!');
    } catch (error) {
      toast.error('Failed to generate cat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleClick}
        disabled={loading}
        size={size}
        className={`
          bg-gradient-to-r from-orange-500 to-orange-600 
          hover:from-orange-600 hover:to-orange-700
          transition-all duration-300
          ${className}
        `}
      >
        {loading ? (
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Icon className="w-5 h-5 mr-2" />
        )}
        {loading ? 'Loading...' : currentVariant.label}
      </Button>

      {showPreview && imageUrl && (
        <div className="mt-4 rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
          <img
            src={imageUrl}
            alt={`Random ${variant} cat`}
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}

// Quick generator buttons for homepage
export function QuickGenerators() {
  const generators = [
    { variant: 'default' as const, color: 'from-blue-500 to-blue-600' },
    { variant: 'cute' as const, color: 'from-pink-500 to-pink-600' },
    { variant: 'funny' as const, color: 'from-purple-500 to-purple-600' },
    { variant: 'gif' as const, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {generators.map((gen) => (
        <RandomCatButton
          key={gen.variant}
          variant={gen.variant}
          size="lg"
          className={`w-full bg-gradient-to-r ${gen.color}`}
          showPreview={false}
        />
      ))}
    </div>
  );
}
