import { Building2, Target, Users, Lightbulb, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function TentangSection() {
  return (
    <section id="tentang" className="bg-background py-20 md:py-28">
      <div className="container-section">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            Latar Belakang
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tentang Penelitian
          </h2>
          <p className="text-muted-foreground text-lg">
            Memahami konteks bisnis dan tujuan pengembangan sistem pendukung keputusan
          </p>
        </div>

        {/* Company Profile */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-3">
              <Building2 className="h-6 w-6 text-accent" />
              PT Sumber Rejeki Daya Utama
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              PT Sumber Rejeki Daya Utama adalah perusahaan <strong className="text-foreground">Penyedia Jasa Pembayaran (PJP)</strong> yang bergerak di bidang layanan keuangan. Sebagai agen resmi Western Union, perusahaan ini menyediakan layanan remitansi internasional yang memungkinkan masyarakat untuk mengirim dan menerima uang dari berbagai negara.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dengan volume transaksi yang terus meningkat, perusahaan perlu mengoptimalkan operasionalnya untuk memastikan layanan yang efisien sambil memaksimalkan profitabilitas.
            </p>
          </div>
          
          <Card className="card-elevated bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" />
                Layanan Western Union
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Pengiriman Uang (Send)</span>
                    <p className="text-sm text-muted-foreground">Layanan transfer uang ke luar negeri dengan jangkauan lebih dari 200 negara</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Penerimaan Uang (Receive)</span>
                    <p className="text-sm text-muted-foreground">Pencairan dana dari luar negeri dengan proses cepat dan aman</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Objectives */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Target className="h-6 w-6 text-accent" />
            Tujuan Penelitian
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-heading font-bold text-accent">1</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Perumusan Model</h4>
                <p className="text-sm text-muted-foreground">
                  Merumuskan model Linear Programming untuk menggambarkan hubungan antara jumlah transaksi kirim/terima dengan laba perusahaan
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-heading font-bold text-accent">2</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Identifikasi Batasan</h4>
                <p className="text-sm text-muted-foreground">
                  Mengidentifikasi dan mengukur batasan operasional utama seperti waktu layanan, kepatuhan KYC/AML, dan cash float
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-heading font-bold text-accent">3</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Solusi Optimal</h4>
                <p className="text-sm text-muted-foreground">
                  Menentukan kombinasi jumlah transaksi optimal menggunakan metode Simpleks untuk memaksimalkan keuntungan harian
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Practical Benefits */}
        <div className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-gold" />
            Manfaat Praktis
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Bagi Manajemen</h4>
                <p className="text-sm text-muted-foreground">
                  Membantu pengambilan keputusan berbasis data dengan menyediakan informasi kuantitatif tentang kapasitas dan potensi laba
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Bagi Operasional</h4>
                <p className="text-sm text-muted-foreground">
                  Mengetahui kapasitas maksimal harian yang realistis untuk perencanaan sumber daya dan jadwal kerja frontliner
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <Lightbulb className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Bagi Pengembangan</h4>
                <p className="text-sm text-muted-foreground">
                  Menjadi dasar pembuatan sistem pendukung keputusan yang lebih komprehensif di masa depan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
