import { useState, useEffect, useCallback } from 'react';
import { CatCard } from './CatCard';
import { AdInFeed } from './AdBanner';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { getCats, type CatImage, generateImageAlt } from '@/lib/api';
import { toast } from 'sonner';

interface CatGalleryProps {
  category?: string;
  tag?: string;
  limit?: number;
  showAds?: boolean;
  filter?: string;
  isGif?: boolean;
}

export function CatGallery({ 
  category = 'random', 
  tag, 
  limit = 12, 
  showAds = true,
  isGif = false
}: CatGalleryProps) {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCats = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      // Use API for certain categories
      const tags = tag ? [tag] : category !== 'random' ? [category] : undefined;
      const newCats = await getCats(limit, tags);
      
      if (isLoadMore) {
        setCats(prev => [...prev, ...newCats]);
      } else {
        setCats(newCats);
      }
      
      setHasMore(newCats.length === limit);
    } catch (error) {
      toast.error('Failed to load cat images');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [category, tag, limit]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const handleLoadMore = () => {
    fetchCats(true);
  };

  const handleRefresh = () => {
    fetchCats();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Images
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cats.map((cat, index) => (
          <>
            <CatCard
              key={`${cat.id}-${index}`}
              imageUrl={isGif 
                ? `https://cataas.com/cat/gif?id=${cat.id}` 
                : `https://cataas.com/cat?id=${cat.id}`
              }
              alt={generateImageAlt(category, index, tag)}
              tags={cat.tags}
              id={cat.id}
            />
            {showAds && (index + 1) % 8 === 0 && <AdInFeed />}
          </>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Cats'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
