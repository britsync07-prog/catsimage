import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AdBanner } from './AdBanner';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-cream-50 flex flex-col">
      <Header />
      
      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner position="top" />
      </div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner position="bottom" />
      </div>
      
      <Footer />
    </div>
  );
}
