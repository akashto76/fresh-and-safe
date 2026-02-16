// src/app/page.tsx
import DailyDeals from '@/components/DailyDeals';
import CategoriesDesktop from '@/components/categoriesdesktop';
import BannerSlider from '@/components/BannerSlider';

export default function Home() {
  return (
    // CHANGED: 'px-4' for tighter side margins on mobile
    // CHANGED: 'py-4' (mobile padding) instead of 'py-20'
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-10 space-y-6">
      
      {/* 4-Slide Banner Section */}
      <BannerSlider />

      {/* Daily Deals Section */}
      <DailyDeals />

      {/* Shop by Category Section */}
      <CategoriesDesktop />

    </main>
  );
}