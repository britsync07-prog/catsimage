import { useEffect, useRef } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'inline';
  className?: string;
}

export function AdBanner({ position, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ad loading logic would go here
    // This is a placeholder for Google AdSense, Mediavine, or other ad networks
    
    // Example for Google AdSense:
    // if (window.adsbygoogle && adRef.current) {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }
  }, []);

  const getAdSize = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'h-[90px] max-w-[728px]';
      case 'sidebar':
        return 'h-[600px] w-[300px]';
      case 'inline':
        return 'h-[250px] max-w-[300px]';
      default:
        return 'h-[90px] max-w-[728px]';
    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        ref={adRef}
        className={`
          ${getAdSize()}
          bg-gradient-to-br from-gray-100 to-gray-200 
          border-2 border-dashed border-gray-300 
          rounded-lg flex items-center justify-center
          text-gray-400 text-sm
        `}
      >
        <div className="text-center">
          <p className="font-medium">Advertisement</p>
          <p className="text-xs mt-1">{position.charAt(0).toUpperCase() + position.slice(1)} Banner</p>
        </div>
      </div>
    </div>
  );
}

// AdInFeed component for placing ads between content
export function AdInFeed() {
  return (
    <div className="col-span-full my-6">
      <AdBanner position="inline" />
    </div>
  );
}

// AdSidebar component for sidebar ads
export function AdSidebar() {
  return (
    <div className="sticky top-24">
      <AdBanner position="sidebar" />
    </div>
  );
}
