import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cat, Menu, Home, Image, Sparkles, Gift, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const categories = [
  { name: 'Random', href: '/cats/random', icon: Sparkles },
  { name: 'Cute', href: '/cats/cute', icon: Cat },
  { name: 'Funny', href: '/cats/funny', icon: Image },
  { name: 'GIFs', href: '/cats/gifs', icon: Gift },
  { name: 'Memes', href: '/cats/memes', icon: Sparkles },
  { name: 'Wallpapers', href: '/cats/wallpapers', icon: Image },
  { name: 'Reactions', href: '/cats/reactions', icon: Cat },
  { name: 'Facts', href: '/cats/facts', icon: BookOpen },
];

const popularTags = ['cute', 'funny', 'sleepy', 'angry', 'happy', 'grumpy', 'orange', 'black', 'fluffy', 'kitten'];
const popularBreeds = ['maine-coon', 'bengal', 'siamese', 'persian', 'ragdoll', 'sphynx'];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              CatSEO Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <NavigationMenuLink asChild key={category.name}>
                          <Link
                            to={category.href}
                            className="flex items-center gap-3 rounded-md p-3 hover:bg-orange-50 transition-colors"
                          >
                            <category.icon className="w-5 h-5 text-orange-500" />
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-gray-500">
                                Browse {category.name.toLowerCase()} cats
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    Tags
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-3">
                      {popularTags.map((tag) => (
                        <NavigationMenuLink asChild key={tag}>
                          <Link
                            to={`/cats/tag/${tag}`}
                            className="block rounded-md p-2 hover:bg-orange-50 transition-colors capitalize"
                          >
                            {tag} Cats
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    Breeds
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                      {popularBreeds.map((breed) => (
                        <NavigationMenuLink asChild key={breed}>
                          <Link
                            to={`/cats/breed/${breed}`}
                            className="block rounded-md p-2 hover:bg-orange-50 transition-colors capitalize"
                          >
                            {breed.replace('-', ' ')} Cat
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-orange-100">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <Cat className="w-6 h-6 text-orange-500" />
                  <span className="text-lg font-bold">CatSEO Pro</span>
                </Link>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-500 uppercase text-sm">Categories</h3>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-orange-50 transition-colors"
                    >
                      <category.icon className="w-5 h-5 text-orange-500" />
                      {category.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-500 uppercase text-sm">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/cats/tag/${tag}`}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors capitalize"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-500 uppercase text-sm">Popular Breeds</h3>
                  {popularBreeds.map((breed) => (
                    <Link
                      key={breed}
                      to={`/cats/breed/${breed}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 rounded-md hover:bg-orange-50 transition-colors capitalize"
                    >
                      {breed.replace('-', ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
