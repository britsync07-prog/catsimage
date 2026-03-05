import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, RefreshCw, Share2, Sparkles, Copy, Check } from 'lucide-react';
import { generateMeme, memeTemplates, defaultTags } from '@/lib/api';
import { toast } from 'sonner';

export function MemeGenerator() {
  const [text, setText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const filters = ['none', 'mono', 'sepia', 'negative', 'grayscale', 'paint', 'pixel'];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(async () => {
      const memeUrl = await generateMeme(text || 'Funny Cat Meme', {
        tag: selectedTag || undefined,
        filter: selectedFilter || undefined,
      });
      setGeneratedMeme(memeUrl);
      setIsGenerating(false);
      toast.success('Meme generated successfully!');
    }, 500);
  };

  const handleDownload = async () => {
    if (!generatedMeme) return;
    
    try {
      const response = await fetch(generatedMeme);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cat-meme-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Meme downloaded!');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  const handleShare = async () => {
    if (!generatedMeme) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my cat meme!',
          text: text || 'Funny cat meme',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
      }
    } catch (error) {
      toast.error('Failed to share');
    }
  };

  const handleCopyUrl = async () => {
    if (!generatedMeme) return;
    
    try {
      await navigator.clipboard.writeText(generatedMeme);
      setIsCopied(true);
      toast.success('Meme URL copied!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const applyTemplate = (templateText: string) => {
    setText(templateText);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="meme-text" className="text-lg font-semibold">
            Meme Text
          </Label>
          <Textarea
            id="meme-text"
            placeholder="Enter your funny caption..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] text-lg"
            maxLength={100}
          />
          <p className="text-sm text-gray-500 text-right">
            {text.length}/100 characters
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Cat Type (Optional)</Label>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Any cat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any cat</SelectItem>
                {defaultTags.slice(0, 15).map((tag) => (
                  <SelectItem key={tag} value={tag} className="capitalize">
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Filter Effect</Label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="No filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No filter</SelectItem>
                {filters.map((filter) => (
                  <SelectItem key={filter} value={filter} className="capitalize">
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-500">Quick Templates</Label>
          <div className="flex flex-wrap gap-2">
            {memeTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                size="sm"
                onClick={() => applyTemplate(template.defaultText)}
                className="text-xs"
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Meme
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Preview</Label>
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          {generatedMeme ? (
            <img
              src={generatedMeme}
              alt="Generated meme"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center text-gray-400 p-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Your meme will appear here</p>
              <p className="text-sm">Enter text and click Generate</p>
            </div>
          )}
        </div>

        {generatedMeme && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyUrl}
              className="flex-1"
            >
              {isCopied ? (
                <Check className="w-4 h-4 mr-2 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy URL
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
