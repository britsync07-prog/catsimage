// CATAAS API Integration
const CATAAS_BASE_URL = 'https://cataas.com';

export interface CatImage {
  id: string;
  url: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  mimetype: string;
}

export interface CatResponse {
  id: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  url: string;
}

// Fetch random cat image
export const getRandomCat = async (options?: {
  tag?: string;
  gif?: boolean;
  says?: string;
  filter?: string;
  width?: number;
  height?: number;
}): Promise<string> => {
  const params = new URLSearchParams();
  
  if (options?.tag) params.append('tag', options.tag);
  if (options?.gif) params.append('gif', 'true');
  if (options?.says) params.append('says', options.says);
  if (options?.filter) params.append('filter', options.filter);
  if (options?.width) params.append('width', options.width.toString());
  if (options?.height) params.append('height', options.height.toString());
  
  const query = params.toString();
  return `${CATAAS_BASE_URL}/cat${query ? `?${query}` : ''}`;
};

// Fetch cat by ID
export const getCatById = (id: string, options?: {
  says?: string;
  filter?: string;
  width?: number;
  height?: number;
}): string => {
  const params = new URLSearchParams();
  
  if (options?.says) params.append('says', options.says);
  if (options?.filter) params.append('filter', options.filter);
  if (options?.width) params.append('width', options.width.toString());
  if (options?.height) params.append('height', options.height.toString());
  
  const query = params.toString();
  return `${CATAAS_BASE_URL}/cat/${id}${query ? `?${query}` : ''}`;
};

// Fetch multiple cats
export const getCats = async (limit: number = 10, tags?: string[]): Promise<CatImage[]> => {
  try {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (tags && tags.length > 0) {
      params.append('tags', tags.join(','));
    }
    
    const response = await fetch(`${CATAAS_BASE_URL}/api/cats?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch cats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cats:', error);
    return generateMockCats(limit, tags);
  }
};

// Fetch all available tags
export const getTags = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${CATAAS_BASE_URL}/api/tags`);
    if (!response.ok) throw new Error('Failed to fetch tags');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return defaultTags;
  }
};

// Generate meme URL
export const generateMeme = async (text: string, options?: {
  tag?: string;
  filter?: string;
  fontSize?: number;
  fontColor?: string;
}): Promise<string> => {
  const params = new URLSearchParams();
  params.append('says', text);
  
  if (options?.tag) params.append('tag', options.tag);
  if (options?.filter) params.append('filter', options.filter);
  if (options?.fontSize) params.append('fontSize', options.fontSize.toString());
  if (options?.fontColor) params.append('fontColor', options.fontColor);
  
  return `${CATAAS_BASE_URL}/cat?${params.toString()}`;
};

// Get GIF cats
export const getRandomGif = async (tag?: string): Promise<string> => {
  return getRandomCat({ gif: true, tag });
};

// Get wallpaper-sized cat
export const getWallpaper = async (width: number = 1920, height: number = 1080, tag?: string): Promise<string> => {
  return getRandomCat({ width, height, tag });
};

// Cat facts
export const catFacts = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have 230 bones, while humans only have 206.",
  "Cats can rotate their ears 180 degrees.",
  "The average cat can jump 8 feet in a single bound.",
  "Cats have a third eyelid called a haw.",
  "A cat's nose print is unique, like a human fingerprint.",
  "Cats can't taste sweetness.",
  "The oldest known pet cat was found in a 9,500-year-old grave.",
  "Cats spend 30-50% of their day grooming themselves.",
  "A cat's purr vibrates at a frequency that promotes healing.",
  "Cats have five toes on their front paws but only four on their back paws.",
  "The first cat in space was a French cat named Felicette.",
  "Cats can make over 100 different sounds.",
  "A cat's brain is 90% similar to a human's brain.",
  "Cats have whiskers on their legs as well as their face.",
  "The Maine Coon is the largest domestic cat breed.",
  "Cats can run up to 30 miles per hour.",
  "A female cat is called a queen or a molly.",
  "Cats have been domesticated for about 4,000 years."
];

export const getRandomFact = (): string => {
  return catFacts[Math.floor(Math.random() * catFacts.length)];
};

// Default tags for fallback
export const defaultTags = [
  'cute', 'funny', 'sleepy', 'angry', 'happy', 'sad', 'grumpy',
  'orange', 'black', 'white', 'tabby', 'calico', 'siamese',
  'kitten', 'fluffy', 'small', 'big', 'fat', 'thin',
  'box', 'computer', 'glasses', 'hat', 'tie', 'sunglasses',
  'baby', 'woman', 'man', 'girl', 'boy'
];

// Popular breeds
export const popularBreeds = [
  { name: 'maine-coon', displayName: 'Maine Coon', searches: 550000 },
  { name: 'bengal', displayName: 'Bengal', searches: 223000 },
  { name: 'siamese', displayName: 'Siamese', searches: 208000 },
  { name: 'persian', displayName: 'Persian', searches: 185000 },
  { name: 'ragdoll', displayName: 'Ragdoll', searches: 165000 },
  { name: 'sphynx', displayName: 'Sphynx', searches: 142000 },
  { name: 'british-shorthair', displayName: 'British Shorthair', searches: 128000 },
  { name: 'abyssinian', displayName: 'Abyssinian', searches: 95000 },
  { name: 'scottish-fold', displayName: 'Scottish Fold', searches: 88000 },
  { name: 'norwegian-forest', displayName: 'Norwegian Forest', searches: 76000 }
];

// Meme templates
export const memeTemplates = [
  { id: 'grumpy', name: 'Grumpy Cat', defaultText: 'I hate everything' },
  { id: 'surprised', name: 'Surprised Cat', defaultText: 'WHAAAT?!' },
  { id: 'judging', name: 'Judging Cat', defaultText: 'I am judging you' },
  { id: 'sad', name: 'Sad Cat', defaultText: 'Why no treats?' },
  { id: 'happy', name: 'Happy Cat', defaultText: 'Best day ever!' },
  { id: 'confused', name: 'Confused Cat', defaultText: 'I don\'t understand' },
  { id: 'angry', name: 'Angry Cat', defaultText: 'This is unacceptable!' },
  { id: 'sleepy', name: 'Sleepy Cat', defaultText: 'Just 5 more minutes...' }
];

// Wallpaper styles
export const wallpaperStyles = [
  { id: 'cute', name: 'Cute Cats', description: 'Adorable cats for your desktop' },
  { id: 'funny', name: 'Funny Cats', description: 'Hilarious cat moments' },
  { id: 'aesthetic', name: 'Aesthetic', description: 'Beautiful cat photography' },
  { id: 'dark', name: 'Dark Mode', description: 'Cats on dark backgrounds' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and clean cat wallpapers' },
  { id: 'colorful', name: 'Colorful', description: 'Vibrant cat images' }
];

// Generate mock cats for fallback
const generateMockCats = (limit: number, tags?: string[]): CatImage[] => {
  return Array.from({ length: limit }, (_, i) => ({
    id: `mock-${i}`,
    url: `${CATAAS_BASE_URL}/cat/${i}`,
    tags: tags || [defaultTags[Math.floor(Math.random() * defaultTags.length)]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mimetype: 'image/jpeg'
  }));
};

// Category SEO data
export const categorySEO: Record<string, { title: string; description: string; keywords: string; ogImage: string }> = {
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

// Default SEO
export const defaultSEO = categorySEO.random;

// Generate tag SEO
export const generateTagSEO = (tag: string) => ({
  title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Cat Pictures | Free ${tag.charAt(0).toUpperCase() + tag.slice(1)} Cat Images & Photos`,
  description: `Browse our collection of ${tag} cat pictures. Find adorable ${tag} cats, kittens, and photos. Generate unlimited ${tag} cat images for free!`,
  keywords: `${tag} cats, ${tag} cat pictures, ${tag} kittens, ${tag} cat images, free ${tag} cats`,
  ogImage: `https://cataas.com/cat/tag/${tag}`
});

// Helper functions
export const getRelatedCategories = (currentCategory: string): string[] => {
  const relations: Record<string, string[]> = {
    cute: ['funny', 'kittens', 'fluffy'],
    funny: ['memes', 'reactions', 'cute'],
    gifs: ['funny', 'reactions', 'cute'],
    memes: ['funny', 'gifs', 'reactions'],
    wallpapers: ['cute', 'aesthetic', 'breeds'],
    reactions: ['funny', 'gifs', 'memes'],
    breeds: ['cute', 'wallpapers', 'facts'],
    facts: ['breeds', 'cute', 'funny'],
    random: ['cute', 'funny', 'gifs']
  };
  return relations[currentCategory] || ['cute', 'funny', 'random'];
};

export const getPopularTags = (): string[] => {
  return ['cute', 'funny', 'sleepy', 'angry', 'happy', 'grumpy', 'orange', 'black', 'fluffy', 'kitten'];
};

// Generate image alt text
export const generateImageAlt = (category: string, index: number, tag?: string): string => {
  if (tag) {
    return `${tag.charAt(0).toUpperCase() + tag.slice(1)} cat picture ${index + 1} - Beautiful ${tag} feline photo`;
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

// SEO content generators
export const generateSEOTitle = (category: string, tag?: string): string => {
  const titles: Record<string, string> = {
    'random': 'Random Cat Generator | Free Unlimited Cat Pictures',
    'cute': 'Cute Cat Pictures | Adorable Kitten Photos & Images',
    'funny': 'Funny Cat Pictures | Hilarious Cat Memes & Photos',
    'gifs': 'Cat GIFs | Animated Cat Images & Reactions',
    'memes': 'Cat Meme Generator | Create & Share Funny Cat Memes',
    'wallpapers': 'Cat Wallpapers | HD Desktop & Mobile Backgrounds',
    'reactions': 'Cat Reaction Images | Perfect Response GIFs & Photos',
    'facts': 'Cat Facts | Amazing & Interesting Facts About Cats',
    'breeds': 'Cat Breeds | Complete Guide to All Cat Breeds'
  };
  
  if (tag) {
    return `${tag.charAt(0).toUpperCase() + tag.slice(1)} Cat Pictures | Free ${tag} Cat Images & Photos`;
  }
  
  return titles[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Cat Pictures | Free Cat Images`;
};

export const generateSEODescription = (category: string, tag?: string): string => {
  const descriptions: Record<string, string> = {
    'random': 'Generate unlimited random cat pictures, memes, and GIFs. Our free random cat generator gives you adorable cat images instantly. Perfect for cat lovers!',
    'cute': 'Discover the cutest cat pictures and kitten photos. Browse our collection of adorable cats, fluffy kittens, and heartwarming feline moments. 100% free!',
    'funny': 'Laugh out loud with our funny cat pictures collection. From silly poses to hilarious expressions, find the perfect cat meme or funny photo to brighten your day.',
    'gifs': 'Browse our collection of animated cat GIFs. Find the perfect cat reaction GIF, cute kitten animations, and funny cat moments to share on social media.',
    'memes': 'Create and share funny cat memes with our free meme generator. Add custom text to cat images and create viral memes in seconds. No signup required!',
    'wallpapers': 'Download beautiful cat wallpapers for your desktop and mobile. HD quality cat backgrounds featuring cute kittens, majestic breeds, and stunning feline photography.',
    'reactions': 'Find the perfect cat reaction image for any situation. From judging cats to happy kittens, our reaction gallery has the ideal response for every moment.',
    'facts': 'Discover amazing cat facts and learn fascinating things about felines. From ancient history to scientific discoveries, explore the wonderful world of cats.',
    'breeds': 'Explore all cat breeds with our comprehensive guide. Learn about Maine Coons, Bengals, Siamese, and more. Find the perfect breed for your lifestyle.'
  };
  
  if (tag) {
    return `Browse our collection of ${tag} cat pictures. Find adorable ${tag} cats, kittens, and photos. Generate unlimited ${tag} cat images for free!`;
  }
  
  return descriptions[category] || `Browse our collection of ${category} cat pictures. Find adorable cats, kittens, and photos. 100% free!`;
};

export const generateFAQ = (category: string): Array<{ question: string; answer: string }> => {
  const faqs: Record<string, Array<{ question: string; answer: string }>> = {
    'random': [
      { question: 'How does the random cat generator work?', answer: 'Our random cat generator uses the CATAAS API to fetch random cat images from a vast database. Simply click the button to get a new adorable cat picture instantly.' },
      { question: 'Are the cat images free to use?', answer: 'Yes! All cat images generated are free to use for personal projects, social media, and non-commercial purposes.' },
      { question: 'Can I download the cat images?', answer: 'Absolutely! Right-click any image and select "Save Image As" to download your favorite cat pictures.' }
    ],
    'cute': [
      { question: 'What makes a cat cute?', answer: 'Cats are considered cute due to their large eyes, small noses, and round faces - features that trigger our nurturing instincts. Kittens are especially cute with their tiny size and playful behavior.' },
      { question: 'Which cat breeds are the cutest?', answer: 'Popular cute breeds include Persian, Ragdoll, Scottish Fold, and Maine Coon kittens. However, cuteness is subjective and every cat is adorable in its own way!' },
      { question: 'How can I take cute photos of my cat?', answer: 'Use natural lighting, get on your cat\'s eye level, use treats or toys to get their attention, and be patient. The best photos often capture natural moments.' }
    ],
    'funny': [
      { question: 'Why are cat memes so popular?', answer: 'Cat memes are popular because cats have expressive faces and unpredictable behavior that makes them perfect for humor. They\'re relatable and bring joy to millions of people.' },
      { question: 'What are the most famous funny cat memes?', answer: 'Some iconic cat memes include Grumpy Cat, Nyan Cat, Keyboard Cat, LOLcats, and the "Woman Yelling at a Cat" meme. Each has become a cultural phenomenon.' },
      { question: 'Can I create my own cat memes?', answer: 'Yes! Use our meme generator to add custom text to cat images and create your own viral memes. It\'s free and easy to use!' }
    ],
    'gifs': [
      { question: 'What is a GIF?', answer: 'GIF (Graphics Interchange Format) is an image format that supports animation. Cat GIFs are short, looping animations perfect for expressing reactions and emotions.' },
      { question: 'How do I share cat GIFs?', answer: 'You can share cat GIFs by copying the image link or downloading the file. Most social platforms support direct GIF sharing.' },
      { question: 'Are cat GIFs free to use?', answer: 'Yes, our cat GIFs are free to use for personal and non-commercial purposes. Share them with friends or use them in your messages!' }
    ],
    'memes': [
      { question: 'How do I make a cat meme?', answer: 'Use our meme generator! Choose a cat image, add your custom text, and download or share your creation. It takes just seconds.' },
      { question: 'What makes a good cat meme?', answer: 'A good cat meme combines a relatable or funny caption with an expressive cat image. Timing, relevance, and humor are key to viral success.' },
      { question: 'Can I use my own cat photos?', answer: 'Currently, our generator uses the CATAAS database, but you can save our generated memes and edit them further with photo editing software.' }
    ],
    'wallpapers': [
      { question: 'What resolution are the wallpapers?', answer: 'Our wallpapers are available in various resolutions. We provide HD (1920x1080) and can generate custom sizes to fit your screen.' },
      { question: 'Are the wallpapers really free?', answer: 'Yes! All cat wallpapers are 100% free to download and use as your desktop or mobile background.' },
      { question: 'Can I request specific cat wallpaper styles?', answer: 'We offer various styles including cute, funny, aesthetic, dark mode, and colorful. Browse our categories to find your perfect wallpaper!' }
    ],
    'default': [
      { question: 'Are these cat images really free?', answer: 'Yes! All images on our site are free to browse, generate, and download for personal use.' },
      { question: 'How often are new cat images added?', answer: 'Our database is constantly growing with new cat images submitted by cat lovers from around the world.' },
      { question: 'Can I share these images on social media?', answer: 'Absolutely! Feel free to share our cat images on any social platform. Tag us if you\'d like - we love seeing our cats being enjoyed!' }
    ]
  };
  
  return faqs[category] || faqs['default'];
};
