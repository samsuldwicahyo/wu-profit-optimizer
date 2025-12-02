import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { KonsepSection } from '@/components/sections/KonsepSection';
import { SimulasiSection } from '@/components/sections/SimulasiSection';
import { TentangSection } from '@/components/sections/TentangSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <KonsepSection />
        <SimulasiSection />
        <TentangSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
