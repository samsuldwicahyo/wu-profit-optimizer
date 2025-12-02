import { TrendingUp, AlertTriangle, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LPSolution, LPConstraint } from '@/lib/simplex';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SimulationResultsProps {
  solution: LPSolution | null;
  constraints: LPConstraint[];
  formData: {
    profitSend: number;
    profitReceive: number;
  };
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function SimulationResults({ solution, constraints, formData }: SimulationResultsProps) {
  if (!solution) {
    return (
      <Card className="card-elevated-lg h-full min-h-[400px] flex items-center justify-center">
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-semibold text-muted-foreground mb-2">
            Hasil Perhitungan
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Masukkan parameter di sebelah kiri dan klik "Hitung Solusi Optimal" untuk melihat hasil
          </p>
        </CardContent>
      </Card>
    );
  }

  if (solution.status !== 'optimal') {
    return (
      <Card className="card-elevated-lg border-destructive/50">
        <CardContent className="text-center py-12">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
            Tidak Ditemukan Solusi
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Model tidak memiliki solusi yang memenuhi semua batasan. Periksa kembali parameter input.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Prepare chart data
  const transactionData = [
    { name: 'Transaksi Kirim (X₁)', value: solution.x1, color: 'hsl(205, 85%, 45%)' },
    { name: 'Transaksi Terima (X₂)', value: solution.x2, color: 'hsl(45, 90%, 55%)' },
  ];

  const capacityData = solution.constraintStatus.map(cs => ({
    name: cs.name.length > 15 ? cs.name.substring(0, 15) + '...' : cs.name,
    fullName: cs.name,
    used: cs.leftValue,
    capacity: cs.rightValue,
    percentage: cs.rightValue > 0 ? Math.round((cs.leftValue / cs.rightValue) * 100) : 0,
  }));

  // Find binding constraints
  const bindingConstraints = solution.constraintStatus.filter(cs => cs.isBinding);

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="card-elevated-lg border-success/30 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            Solusi Optimal Ditemukan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Transaksi Kirim (X₁*)</div>
              <div className="text-3xl font-heading font-bold text-accent">{solution.x1}</div>
              <div className="text-xs text-muted-foreground">transaksi/hari</div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Transaksi Terima (X₂*)</div>
              <div className="text-3xl font-heading font-bold text-gold">{solution.x2}</div>
              <div className="text-xs text-muted-foreground">transaksi/hari</div>
            </div>
          </div>

          {/* Optimal Profit */}
          <div className="bg-primary/10 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Laba Maksimum Harian (Z*)</span>
            </div>
            <div className="text-3xl md:text-4xl font-heading font-bold text-primary">
              {formatCurrency(solution.optimalValue)}
            </div>
          </div>

          {/* Transaction Distribution Chart */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Distribusi Transaksi Optimal</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={120} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value} transaksi`, '']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {transactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constraint Status */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-accent" />
            Status Batasan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">Batasan</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Terpakai</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Kapasitas</th>
                  <th className="text-center py-2 px-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {solution.constraintStatus.map((cs, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-3 px-2 font-medium text-foreground">{cs.name}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{cs.leftValue.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{cs.rightValue.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-2 text-center">
                      {cs.isBinding ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                          <AlertTriangle className="h-3 w-3" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Longgar
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Capacity Usage Chart */}
          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-4">Penggunaan Kapasitas (%)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value}%`,
                      props.payload.fullName
                    ]}
                  />
                  <Bar dataKey="percentage" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}>
                    {capacityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.percentage >= 99 ? 'hsl(var(--destructive))' : 'hsl(var(--accent))'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg">Interpretasi Hasil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              Berdasarkan hasil perhitungan Linear Programming, kombinasi transaksi yang paling menguntungkan adalah{' '}
              <strong className="text-foreground">{solution.x1} transaksi kirim</strong> dan{' '}
              <strong className="text-foreground">{solution.x2} transaksi terima</strong> per hari, dengan laba maksimal sebesar{' '}
              <strong className="text-primary">{formatCurrency(solution.optimalValue)}</strong>.
            </p>
            
            {bindingConstraints.length > 0 && (
              <p className="leading-relaxed mt-4">
                Batasan yang paling membatasi (<em>binding constraint</em>) adalah:{' '}
                <strong className="text-foreground">{bindingConstraints.map(bc => bc.name).join(', ')}</strong>.
                Peningkatan kapasitas pada aspek tersebut berpotensi meningkatkan laba harian.
              </p>
            )}

            <p className="leading-relaxed mt-4">
              Dengan komposisi ini, pendapatan dari transaksi kirim:{' '}
              <strong className="text-foreground">{formatCurrency(solution.x1 * formData.profitSend)}</strong>,
              dan dari transaksi terima:{' '}
              <strong className="text-foreground">{formatCurrency(solution.x2 * formData.profitReceive)}</strong>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
