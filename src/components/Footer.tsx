import { Calculator, FileText, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              <span className="font-heading font-semibold text-lg">LP Optimizer</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Prototipe Sistem Pendukung Keputusan Layanan Western Union berbasis Linear Programming
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Navigasi</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#beranda" className="hover:text-primary-foreground transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#konsep" className="hover:text-primary-foreground transition-colors">
                  Konsep Linear Programming
                </a>
              </li>
              <li>
                <a href="#simulasi" className="hover:text-primary-foreground transition-colors">
                  Simulasi
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-primary-foreground transition-colors">
                  Tentang Penelitian
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Sumber Daya</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a 
                  href="#tentang" 
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Makalah Penelitian
                </a>
              </li>
              <li>
                <a 
                  href="https://www.westernunion.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Western Union Official
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} PT Sumber Rejeki Daya Utama. Sistem Pendukung Keputusan berbasis Linear Programming.</p>
        </div>
      </div>
    </footer>
  );
}
