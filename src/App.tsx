import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { TagPage } from './pages/TagPage';
import { MemePage } from './pages/MemePage';
import { WallpaperPage } from './pages/WallpaperPage';
import { BreedPage } from './pages/BreedPage';
import { FactPage } from './pages/FactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cats/:category" element={<CategoryPage />} />
          <Route path="cats/tag/:tag" element={<TagPage />} />
          <Route path="cats/meme/:template" element={<MemePage />} />
          <Route path="cats/wallpaper/:style" element={<WallpaperPage />} />
          <Route path="cats/breed/:breed" element={<BreedPage />} />
          <Route path="cats/facts" element={<FactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
