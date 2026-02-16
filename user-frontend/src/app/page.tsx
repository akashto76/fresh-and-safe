// src/app/page.tsx
import DailyDeals from '@/components/DailyDeals';
import CategoriesDesktop from '@/components/categoriesdesktop';
import BannerSlider from '@/components/BannerSlider';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-10 space-y-6">
      
      {/* 4-Slide Banner Section */}
      <BannerSlider />

      {/* Daily Deals Section */}
      <DailyDeals />

      {/* Shop by Category Section */}
      <CategoriesDesktop />

    </main>
  );
}