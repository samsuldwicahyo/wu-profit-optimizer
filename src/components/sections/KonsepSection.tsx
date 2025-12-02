import { BookOpen, Target, GitBranch, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function KonsepSection() {
  return (
    <section id="konsep" className="bg-background py-20 md:py-28">
      <div className="container-section">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Landasan Teori
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Konsep Linear Programming
          </h2>
          <p className="text-muted-foreground text-lg">
            Memahami dasar-dasar pemrograman linear dan penerapannya dalam optimasi layanan remitansi
          </p>
        </div>

        {/* What is LP */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Apa itu Linear Programming?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Linear Programming (LP)</strong> atau Pemrograman Linear adalah metode matematika untuk menentukan cara terbaik mencapai hasil optimal (seperti laba maksimum atau biaya minimum) dalam model matematika yang terdiri dari hubungan linear.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dalam konteks bisnis remitansi Western Union, LP membantu menentukan berapa banyak transaksi kirim dan terima yang harus dilayani per hari untuk memaksimalkan keuntungan dengan berbagai keterbatasan operasional.
            </p>
          </div>
          
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-accent" />
                Komponen Utama LP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Variabel Keputusan</span>
                  <p className="text-sm text-muted-foreground">Nilai yang ingin ditentukan (X₁, X₂)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Fungsi Tujuan</span>
                  <p className="text-sm text-muted-foreground">Ekspresi yang ingin dimaksimalkan/diminimalkan</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Fungsi Batasan</span>
                  <p className="text-sm text-muted-foreground">Pembatasan pada variabel keputusan</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Non-negativity</span>
                  <p className="text-sm text-muted-foreground">Variabel tidak boleh negatif (X₁, X₂ ≥ 0)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Context & Variables */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <GitBranch className="h-5 w-5 text-accent" />
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Konteks Penelitian
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="card-elevated border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div className="text-4xl font-heading font-bold text-accent mb-2">X₁</div>
                <h4 className="font-semibold text-foreground mb-2">Transaksi Kirim (Send)</h4>
                <p className="text-sm text-muted-foreground">
                  Jumlah transaksi pengiriman uang Western Union yang dilayani per hari. Setiap transaksi menghasilkan pendapatan dari biaya transfer.
                </p>
              </CardContent>
            </Card>
            <Card className="card-elevated border-l-4 border-l-gold">
              <CardContent className="pt-6">
                <div className="text-4xl font-heading font-bold text-gold mb-2">X₂</div>
                <h4 className="font-semibold text-foreground mb-2">Transaksi Terima (Receive)</h4>
                <p className="text-sm text-muted-foreground">
                  Jumlah transaksi penerimaan uang Western Union yang dilayani per hari. Menghasilkan pendapatan dari spread kurs dan/atau komisi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mathematical Model */}
        <div className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
            Model Matematis
          </h3>
          
          {/* Objective Function */}
          <div className="mb-8">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">1</span>
              Fungsi Tujuan (Memaksimalkan Laba)
            </h4>
            <div className="formula-block text-center text-lg">
              <strong>Maksimalkan Z = a·X₁ + b·X₂</strong>
              <p className="text-sm text-muted-foreground mt-2">
                Dimana: a = laba per transaksi kirim, b = laba per transaksi terima
              </p>
            </div>
          </div>

          {/* Constraints */}
          <div className="mb-8">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">2</span>
              Fungsi Batasan
            </h4>
            <div className="space-y-4">
              <div className="formula-block">
                <div className="flex items-start gap-4">
                  <span className="text-accent font-semibold shrink-0">(1)</span>
                  <div>
                    <div className="font-medium">12X₁ + 8X₂ ≤ 420</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Batasan Waktu Frontliner:</strong> Total waktu layanan tidak melebihi waktu kerja efektif (420 menit = 7 jam)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="formula-block">
                <div className="flex items-start gap-4">
                  <span className="text-accent font-semibold shrink-0">(2)</span>
                  <div>
                    <div className="font-medium">6X₁ + 4X₂ ≤ 180</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Batasan Waktu KYC/AML:</strong> Total kapasitas waktu petugas kepatuhan (Know Your Customer/Anti Money Laundering)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="formula-block">
                <div className="flex items-start gap-4">
                  <span className="text-accent font-semibold shrink-0">(3)</span>
                  <div>
                    <div className="font-medium">d·X₂ ≤ C</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Batas Cash Float:</strong> Total pembayaran tunai tidak melebihi likuiditas harian (d = rata-rata nilai pembayaran, C = batas kas)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Non-negativity */}
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">3</span>
              Batasan Non-Negativity
            </h4>
            <div className="formula-block text-center">
              <strong>X₁ ≥ 0, X₂ ≥ 0</strong>
              <p className="text-sm text-muted-foreground mt-2">
                Jumlah transaksi tidak boleh negatif
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
