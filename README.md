# SPK Western Union – Linear Programming Optimizer

Sistem pendukung keputusan untuk mencari kombinasi transaksi Western Union (kirim & terima) yang memaksimalkan laba harian menggunakan metode Linear Programming.

## Persyaratan

- Node.js (versi LTS disarankan)
- npm

## Menjalankan Secara Lokal

```sh
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` secara default.

## Perintah yang Tersedia

- `npm run dev` – menjalankan server pengembangan dengan HMR.
- `npm run build` – build untuk produksi.
- `npm run preview` – meninjau hasil build produksi secara lokal.
- `npm run lint` – menjalankan pengecekan linting.

## Teknologi

- Vite + React + TypeScript
- Tailwind CSS & shadcn/ui
- @tanstack/react-query untuk data fetching/caching

## Struktur Singkat

- `src/pages` – halaman aplikasi (beranda, halaman 404).
- `src/components` – komponen UI dan bagian halaman (hero, simulasi, dsb.).
- `src/lib/simplex.ts` – logika perhitungan Linear Programming.

## Lisensi

Silakan gunakan atau modifikasi sesuai kebutuhan proyek Anda.
