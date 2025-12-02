import { ArrowDown, TrendingUp, Calculator, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToSimulation = () => {
    document.querySelector('#simulasi')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container-section relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground/90 text-sm font-medium mb-8 animate-fade-in">
            <Calculator className="h-4 w-4" />
            Metode Linear Programming
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Sistem Pendukung Keputusan
            <span className="block mt-2 text-gold">Layanan Western Union</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            PT Sumber Rejeki Daya Utama sebagai Penyedia Jasa Pembayaran menghadirkan solusi optimasi untuk layanan remitansi Western Union. 
            Sistem ini membantu menentukan kombinasi jumlah transaksi kirim dan terima per hari agar mencapai <strong>laba maksimal</strong> dengan keterbatasan sumber daya.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              onClick={scrollToSimulation}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8"
            >
              Mulai Simulasi
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.querySelector('#konsep')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Pelajari Konsep LP
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <TrendingUp className="h-10 w-10 text-gold mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Optimasi Laba</h3>
              <p className="text-sm text-primary-foreground/70">Maksimalkan pendapatan harian dengan kombinasi transaksi optimal</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <Calculator className="h-10 w-10 text-gold mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Metode Simpleks</h3>
              <p className="text-sm text-primary-foreground/70">Algoritma matematika terverifikasi untuk solusi yang akurat</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <Shield className="h-10 w-10 text-gold mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Kepatuhan KYC/AML</h3>
              <p className="text-sm text-primary-foreground/70">Mempertimbangkan batasan regulasi dalam perhitungan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary-foreground/50" />
      </div>
    </section>
  );
}
