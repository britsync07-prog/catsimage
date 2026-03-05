// SEO Metadata Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  schema?: object;
}

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

// Generate ImageObject schema
export const generateImageSchema = (image: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  contentUrl: image.url,
  name: image.caption || 'Cat Image',
  description: image.caption || 'A beautiful cat image',
  width: image.width || 600,
  height: image.height || 400,
  license: 'https://creativecommons.org/licenses/by/2.0/',
  creditText: 'CATAAS',
  creator: {
    '@type': 'Organization',
    name: 'CATAAS'
  }
});

// Generate FAQPage schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Generate WebPage schema
export const generateWebPageSchema = (data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: data.title,
  description: data.description,
  url: data.url,
  image: data.image,
  datePublished: data.datePublished || new Date().toISOString(),
  dateModified: data.dateModified || new Date().toISOString(),
  publisher: {
    '@type': 'Organization',
    name: 'CatSEO Pro',
    url: 'https://catsimage.pages.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://catsimage.pages.dev/logo.png'
    }
  }
});

// Generate Article schema for blog posts
export const generateArticleSchema = (data: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: data.title,
  description: data.description,
  url: data.url,
  image: data.image,
  datePublished: data.datePublished,
  dateModified: data.dateModified || data.datePublished,
  author: {
    '@type': 'Person',
    name: data.author || 'CatSEO Pro Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'CatSEO Pro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://catsimage.pages.dev/logo.png'
    }
  }
});

// Default SEO metadata
export const defaultSEO: SEOMetadata = {
  title: 'CatSEO Pro - Unlimited Cat Images, Memes & GIFs Generator',
  description: 'Generate unlimited cute cat images, memes, and GIFs. Explore our library of cat breeds and find the perfect wallpaper for your phone. 100% Free.',
  keywords: 'cat pictures, cute cats, funny cat memes, cat gifs, random cat generator, cat wallpapers, kitten pictures, cat facts, cat breeds',
  ogImage: 'https://cataas.com/cat',
  ogType: 'website',
  twitterCard: 'summary_large_image'
};

// Category-specific SEO metadata
export const categorySEO: Record<string, SEOMetadata> = {
  random: {
    title: 'Random Cat Generator | Free Unlimited Cat Pictures',
    description: 'Generate unlimited random cat pictures instantly. Our free random cat generator gives you adorable cat images with one click. Perfect for cat lovers!',
    keywords: 'random cat generator, random cat pictures, random cats, cat generator, free cat images',
    ogImage: 'https://cataas.com/cat'
  },
  cute: {
    title: 'Cute Cat Pictures | Adorable Kitten Photos & Images',
    description: 'Discover the cutest cat pictures and kitten photos. Browse our collection of adorable cats, fluffy kittens, and heartwarming feline moments. 100% free!',
    keywords: 'cute cats, cute cat pictures, adorable kittens, fluffy cats, sweet cat images',
    ogImage: 'https://cataas.com/cat/tag/cute'
  },
  funny: {
    title: 'Funny Cat Pictures | Hilarious Cat Memes & Photos',
    description: 'Laugh out loud with our funny cat pictures collection. From silly poses to hilarious expressions, find the perfect cat meme or funny photo.',
    keywords: 'funny cats, funny cat pictures, cat memes, hilarious cats, silly cat photos',
    ogImage: 'https://cataas.com/cat/tag/funny'
  },
  gifs: {
    title: 'Cat GIFs | Animated Cat Images & Reactions',
    description: 'Browse our collection of animated cat GIFs. Find the perfect cat reaction GIF, cute kitten animations, and funny cat moments to share.',
    keywords: 'cat gifs, animated cats, cat animations, cat reaction gifs, funny cat gifs',
    ogImage: 'https://cataas.com/cat/gif'
  },
  memes: {
    title: 'Cat Meme Generator | Create & Share Funny Cat Memes',
    description: 'Create and share funny cat memes with our free meme generator. Add custom text to cat images and create viral memes in seconds.',
    keywords: 'cat memes, meme generator, funny cat memes, create cat memes, viral cat memes',
    ogImage: 'https://cataas.com/cat/says/Funny%20Cat%20Meme'
  },
  wallpapers: {
    title: 'Cat Wallpapers | HD Desktop & Mobile Backgrounds',
    description: 'Download beautiful cat wallpapers for your desktop and mobile. HD quality cat backgrounds featuring cute kittens and majestic breeds.',
    keywords: 'cat wallpapers, cat backgrounds, hd cat images, desktop wallpapers, mobile wallpapers',
    ogImage: 'https://cataas.com/cat?width=1920&height=1080'
  },
  reactions: {
    title: 'Cat Reaction Images | Perfect Response GIFs & Photos',
    description: 'Find the perfect cat reaction image for any situation. From judging cats to happy kittens, our reaction gallery has the ideal response.',
    keywords: 'cat reactions, reaction images, cat response gifs, judging cat, surprised cat',
    ogImage: 'https://cataas.com/cat/tag/angry'
  },
  facts: {
    title: 'Cat Facts | Amazing & Interesting Facts About Cats',
    description: 'Discover amazing cat facts and learn fascinating things about felines. From ancient history to scientific discoveries, explore the world of cats.',
    keywords: 'cat facts, interesting cat facts, amazing cats, cat trivia, feline facts',
    ogImage: 'https://cataas.com/cat'
  },
  breeds: {
    title: 'Cat Breeds | Complete Guide to All Cat Breeds',
    description: 'Explore all cat breeds with our comprehensive guide. Learn about Maine Coons, Bengals, Siamese, and more. Find the perfect breed for you.',
    keywords: 'cat breeds, breed guide, maine coon, bengal cat, siamese cat, persian cat',
    ogImage: 'https://cataas.com/cat'
  }
};

// Generate tag-specific SEO
export const generateTagSEO = (tag: string): SEOMetadata => ({
  title: `${capitalize(tag)} Cat Pictures | Free ${capitalize(tag)} Cat Images & Photos`,
  description: `Browse our collection of ${tag} cat pictures. Find adorable ${tag} cats, kittens, and photos. Generate unlimited ${tag} cat images for free!`,
  keywords: `${tag} cats, ${tag} cat pictures, ${tag} kittens, ${tag} cat images, free ${tag} cats`,
  ogImage: `https://cataas.com/cat/tag/${tag}`
});

// Generate breed-specific SEO
export const generateBreedSEO = (breed: string): SEOMetadata => ({
  title: `${capitalize(breed)} Cat | Complete Breed Guide & Pictures`,
  description: `Learn all about ${breed} cats. Discover their personality, care needs, and see beautiful ${breed} cat pictures. Complete breed guide.`,
  keywords: `${breed} cat, ${breed} breed, ${breed} kittens, ${breed} care, ${breed} personality`,
  ogImage: `https://cataas.com/cat/tag/${breed}`
});

// Helper function
const capitalize = (str: string): string => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Image SEO helpers
export const generateImageAlt = (category: string, index: number, tag?: string): string => {
  if (tag) {
    return `${capitalize(tag)} cat picture ${index + 1} - Beautiful ${tag} feline photo`;
  }
  const alts: Record<string, string[]> = {
    cute: ['Adorable fluffy cat with big eyes', 'Sweet kitten sleeping peacefully', 'Cute cat with playful expression'],
    funny: ['Hilarious cat making funny face', 'Silly cat in awkward position', 'Funny cat doing something crazy'],
    random: ['Beautiful random cat photo', 'Adorable cat captured in moment', 'Stunning feline photograph'],
    gifs: ['Animated cat GIF', 'Funny cat animation', 'Cute cat moving picture']
  };
  
  const categoryAlts = alts[category] || alts['random'];
  return categoryAlts[index % categoryAlts.length];
};

export const generateImageFilename = (category: string, id: string): string => {
  return `${category}-cat-${id}.jpg`;
};

// Sitemap helpers
export const generateSitemapEntry = (url: string, priority: number = 0.5, changefreq: string = 'daily') => ({
  url,
  priority,
  changefreq,
  lastmod: new Date().toISOString()
});

// Internal linking helpers
export const getRelatedCategories = (currentCategory: string): string[] => {
  const relations: Record<string, string[]> = {
    cute: ['funny', 'kittens', 'fluffy'],
    funny: ['memes', 'reactions', 'cute'],
    gifs: ['funny', 'reactions', 'cute'],
    memes: ['funny', 'gifs', 'reactions'],
    wallpapers: ['cute', 'aesthetic', 'breeds'],
    reactions: ['funny', 'gifs', 'memes'],
    breeds: ['cute', 'wallpapers', 'facts'],
    facts: ['breeds', 'cute', 'funny']
  };
  
  return relations[currentCategory] || ['cute', 'funny', 'random'];
};

export const getPopularTags = (): string[] => {
  return ['cute', 'funny', 'sleepy', 'angry', 'happy', 'grumpy', 'orange', 'black', 'fluffy', 'kitten'];
};

export const getPopularBreeds = (): string[] => {
  return ['maine-coon', 'bengal', 'siamese', 'persian', 'ragdoll', 'sphynx'];
};
