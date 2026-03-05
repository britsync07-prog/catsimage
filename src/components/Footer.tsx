import { Link } from 'react-router-dom';
import { Cat, Heart, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const footerLinks = {
  categories: [
    { name: 'Random Cats', href: '/cats/random' },
    { name: 'Cute Cats', href: '/cats/cute' },
    { name: 'Funny Cats', href: '/cats/funny' },
    { name: 'Cat GIFs', href: '/cats/gifs' },
    { name: 'Cat Memes', href: '/cats/memes' },
    { name: 'Wallpapers', href: '/cats/wallpapers' },
  ],
  popular: [
    { name: 'Maine Coon', href: '/cats/breed/maine-coon' },
    { name: 'Bengal', href: '/cats/breed/bengal' },
    { name: 'Siamese', href: '/cats/breed/siamese' },
    { name: 'Persian', href: '/cats/breed/persian' },
    { name: 'Ragdoll', href: '/cats/breed/ragdoll' },
    { name: 'Sphynx', href: '/cats/breed/sphynx' },
  ],
  tags: [
    { name: 'Cute', href: '/cats/tag/cute' },
    { name: 'Funny', href: '/cats/tag/funny' },
    { name: 'Sleepy', href: '/cats/tag/sleepy' },
    { name: 'Angry', href: '/cats/tag/angry' },
    { name: 'Fluffy', href: '/cats/tag/fluffy' },
    { name: 'Kitten', href: '/cats/tag/kitten' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Cat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CatSEO Pro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              The ultimate destination for cat lovers. Generate unlimited cat images, 
              memes, and GIFs. Explore our vast collection of feline content.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Breeds */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Breeds</h3>
            <ul className="space-y-2">
              {footerLinks.popular.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
            <ul className="space-y-2">
              {footerLinks.tags.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-orange-400 transition-colors capitalize"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CatSEO Pro. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for cat lovers everywhere
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
