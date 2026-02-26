// 메인(홈) 화면 UI 구성 컴포넌트
import AppHeader from "@/components/common/AppHeader";
import HomeFooter from "@/components/home/sections/HomeFooter";
import HomeHeroSection from "@/components/home/sections/HomeHeroSection";

const HomePage = () => (
  <main className="min-h-screen bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <AppHeader />
      <HomeHeroSection />
      <HomeFooter />
    </div>
  </main>
);

export default HomePage;
