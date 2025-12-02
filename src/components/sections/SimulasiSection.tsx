import { useState } from 'react';
import { Calculator, RefreshCw, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { solveLPCornerPoint, LPConstraint, LPSolution } from '@/lib/simplex';
import { SimulationResults } from '@/components/SimulationResults';

interface FormData {
  profitSend: string;
  profitReceive: string;
  timeSend: string;
  timeReceive: string;
  totalTimeWork: string;
  kycSend: string;
  kycReceive: string;
  totalTimeKYC: string;
  avgPayment: string;
  cashFloatLimit: string;
  maxSend: string;
  maxReceive: string;
}

const defaultValues: FormData = {
  profitSend: '25000',
  profitReceive: '15000',
  timeSend: '12',
  timeReceive: '8',
  totalTimeWork: '420',
  kycSend: '6',
  kycReceive: '4',
  totalTimeKYC: '180',
  avgPayment: '5000000',
  cashFloatLimit: '100000000',
  maxSend: '',
  maxReceive: '',
};

export function SimulasiSection() {
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [solution, setSolution] = useState<LPSolution | null>(null);
  const [constraints, setConstraints] = useState<LPConstraint[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateInputs = (): boolean => {
    const requiredFields = [
      'profitSend', 'profitReceive', 'timeSend', 'timeReceive',
      'totalTimeWork', 'kycSend', 'kycReceive', 'totalTimeKYC',
      'avgPayment', 'cashFloatLimit'
    ];

    for (const field of requiredFields) {
      const value = parseFloat(formData[field as keyof FormData]);
      if (isNaN(value) || value < 0) {
        toast({
          title: 'Input Tidak Valid',
          description: `Field "${field}" harus berupa angka positif`,
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    setIsCalculating(true);

    setTimeout(() => {
      const a = parseFloat(formData.profitSend);
      const b = parseFloat(formData.profitReceive);
      const tSend = parseFloat(formData.timeSend);
      const tReceive = parseFloat(formData.timeReceive);
      const totalWork = parseFloat(formData.totalTimeWork);
      const kSend = parseFloat(formData.kycSend);
      const kReceive = parseFloat(formData.kycReceive);
      const totalKYC = parseFloat(formData.totalTimeKYC);
      const d = parseFloat(formData.avgPayment);
      const C = parseFloat(formData.cashFloatLimit);
      const maxSend = formData.maxSend ? parseFloat(formData.maxSend) : null;
      const maxReceive = formData.maxReceive ? parseFloat(formData.maxReceive) : null;

      const lpConstraints: LPConstraint[] = [
        { coeffX1: tSend, coeffX2: tReceive, rhs: totalWork, name: 'Waktu Frontliner' },
        { coeffX1: kSend, coeffX2: kReceive, rhs: totalKYC, name: 'Waktu KYC/AML' },
        { coeffX1: 0, coeffX2: d, rhs: C, name: 'Batas Cash Float' },
      ];

      if (maxSend !== null && maxSend > 0) {
        lpConstraints.push({ coeffX1: 1, coeffX2: 0, rhs: maxSend, name: 'Batas Maks. Transaksi Kirim' });
      }
      if (maxReceive !== null && maxReceive > 0) {
        lpConstraints.push({ coeffX1: 0, coeffX2: 1, rhs: maxReceive, name: 'Batas Maks. Transaksi Terima' });
      }

      setConstraints(lpConstraints);

      const result = solveLPCornerPoint({
        objectiveX1: a,
        objectiveX2: b,
        constraints: lpConstraints,
      });

      setSolution(result);
      setIsCalculating(false);

      if (result.status === 'optimal') {
        toast({
          title: 'Perhitungan Selesai',
          description: 'Solusi optimal telah ditemukan!',
        });
      } else {
        toast({
          title: 'Tidak Ada Solusi',
          description: 'Tidak ditemukan solusi yang memenuhi semua batasan.',
          variant: 'destructive',
        });
      }
    }, 500);
  };

  const handleReset = () => {
    setFormData(defaultValues);
    setSolution(null);
    setConstraints([]);
    toast({
      title: 'Parameter Direset',
      description: 'Semua parameter telah dikembalikan ke nilai default.',
    });
  };

  return (
    <section id="simulasi" className="bg-muted/30 py-20 md:py-28">
      <div className="container-section">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            Simulasi Interaktif
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simulasi Linear Programming
          </h2>
          <p className="text-muted-foreground text-lg">
            Masukkan parameter operasional untuk menghitung kombinasi transaksi optimal
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Input */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Parameter Laba
                </CardTitle>
                <CardDescription>
                  Masukkan rata-rata laba per transaksi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profitSend">Laba per transaksi kirim (Rp)</Label>
                  <Input
                    id="profitSend"
                    type="number"
                    value={formData.profitSend}
                    onChange={(e) => handleInputChange('profitSend', e.target.value)}
                    placeholder="Contoh: 25000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profitReceive">Laba per transaksi terima (Rp)</Label>
                  <Input
                    id="profitReceive"
                    type="number"
                    value={formData.profitReceive}
                    onChange={(e) => handleInputChange('profitReceive', e.target.value)}
                    placeholder="Contoh: 15000"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Batasan Waktu Frontliner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeSend">Waktu/trans. kirim (menit)</Label>
                    <Input
                      id="timeSend"
                      type="number"
                      value={formData.timeSend}
                      onChange={(e) => handleInputChange('timeSend', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeReceive">Waktu/trans. terima (menit)</Label>
                    <Input
                      id="timeReceive"
                      type="number"
                      value={formData.timeReceive}
                      onChange={(e) => handleInputChange('timeReceive', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTimeWork">Total waktu kerja efektif/hari (menit)</Label>
                  <Input
                    id="totalTimeWork"
                    type="number"
                    value={formData.totalTimeWork}
                    onChange={(e) => handleInputChange('totalTimeWork', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Batasan Waktu KYC/AML
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kycSend">Waktu KYC/kirim (menit)</Label>
                    <Input
                      id="kycSend"
                      type="number"
                      value={formData.kycSend}
                      onChange={(e) => handleInputChange('kycSend', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kycReceive">Waktu KYC/terima (menit)</Label>
                    <Input
                      id="kycReceive"
                      type="number"
                      value={formData.kycReceive}
                      onChange={(e) => handleInputChange('kycReceive', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTimeKYC">Total kapasitas KYC/hari (menit)</Label>
                  <Input
                    id="totalTimeKYC"
                    type="number"
                    value={formData.totalTimeKYC}
                    onChange={(e) => handleInputChange('totalTimeKYC', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  Batas Cash Float
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="avgPayment">Rata-rata nilai pembayaran/terima (Rp)</Label>
                  <Input
                    id="avgPayment"
                    type="number"
                    value={formData.avgPayment}
                    onChange={(e) => handleInputChange('avgPayment', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashFloatLimit">Batas maksimal cash float (Rp)</Label>
                  <Input
                    id="cashFloatLimit"
                    type="number"
                    value={formData.cashFloatLimit}
                    onChange={(e) => handleInputChange('cashFloatLimit', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-muted-foreground">Batas Jumlah Transaksi (Opsional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxSend">Maks. transaksi kirim/hari</Label>
                    <Input
                      id="maxSend"
                      type="number"
                      value={formData.maxSend}
                      onChange={(e) => handleInputChange('maxSend', e.target.value)}
                      placeholder="Opsional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxReceive">Maks. transaksi terima/hari</Label>
                    <Input
                      id="maxReceive"
                      type="number"
                      value={formData.maxReceive}
                      onChange={(e) => handleInputChange('maxReceive', e.target.value)}
                      placeholder="Opsional"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Menghitung...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Hitung Solusi Optimal
                  </>
                )}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleReset}
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SimulationResults 
              solution={solution} 
              constraints={constraints}
              formData={{
                profitSend: parseFloat(formData.profitSend) || 0,
                profitReceive: parseFloat(formData.profitReceive) || 0,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
