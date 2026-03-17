# Zen

Berikut adalah informasi utama aplikasi sesuai dengan persyaratan evaluasi:
Nama Website : Zen
Nama Tim : Gen Deng
Dengan Backend : YA
Daftar Fitur Utama : Autentikasi Pengguna, Dashboard Interaktif, Manajemen Jadwal (Schedule), Manajemen Tugas (Task/To-do list), Catatan (Notes), Pesan (AI ChatBot), dan Pengaturan (Settings).

---

Zen adalah aplikasi produktivitas dan manajemen tugas komprehensif yang dirancang untuk membantu Anda mengatur jadwal, pekerjaan, dan catatan dalam satu platform yang terintegrasi. Aplikasi ini dilengkapi dengan antarmuka modern, animasi yang halus, serta fitur obrolan (chat). 

**Catatan:** Aplikasi ini dikembangkan secara khusus sebagai proyek untuk perlombaan **IFEST 14** (`ifest14-project`).

## 🔐 Akun Dummy (Untuk Evaluasi Juri/Penguji)

Untuk mempermudah proses evaluasi dan pengujian fitur aplikasi tanpa harus melakukan registrasi terlebih dahulu, silakan gunakan kredensial akun dummy berikut saat login:

- **Email:** `Tono@example.com`
- **Password:** `tono1234`

## ✨ Fitur Utama (Detail)

Zen menyediakan beberapa fitur utama berikut:
- **Autentikasi Pengguna**: Sistem login dan registrasi yang aman.
- **Dashboard Interaktif**: Ringkasan aktivitas dan tugas harian.
- **Manajemen Jadwal (Schedule)**: Atur agenda dan waktu Anda dengan mudah.
- **Manajemen Tugas (Task)**: Catat dan pantau daftar pekerjaan (to-do list).
- **Catatan (Notes)**: Ruang untuk menulis dan menyimpan ide atau informasi penting.
- **Pesan/Obrolan (Chat)**: Fitur AI ChatBot Untuk membantu mengatur tugas dan penjadwalan.
- **Pengaturan (Settings)**: Personalisasi profil dan keamanan (password).

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan ekosistem teknologi frontend modern:
- **Core**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan modul pendukung seperti `clsx` dan `tailwind-merge`.
- **Ikon**: Heroicons & Lucide React.
- **Data Fetching & State**: [React Query (TanStack)](https://tanstack.com/query/latest), SWR, dan Axios.
- **Animasi & UX**: GSAP, Motion, dan Lenis (untuk *smooth scrolling*).

## 🛠️ Prasyarat

Pastikan Anda telah menginstal lingkungan berikut di mesin lokal Anda:
- [Node.js](https://nodejs.org/) (versi terbaru disarankan)
- NPM atau Yarn package manager

## 📦 Instalasi & Cara Menjalankan

1. **Clone repositori ini** ke mesin lokal Anda:
   ```bash
   git clone <url-repositori-anda>
   cd zen
   ```

2. **Instal dependensi** yang dibutuhkan:
   ```bash
   npm install
   ```

3. **Atur Environment Variables** (Jika ada):
   Buat file `.env` di direktori root aplikasi dan sesuaikan nilainya berdasarkan kebutuhan API atau konfigurasi lokal Anda.

4. **Jalankan server pengembangan (Development Server)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal, biasanya di `http://localhost:5173`.

## 📜 Daftar Skrip (Scripts)

Berikut adalah perintah yang dapat dijalankan melalui NPM:
- `npm run dev` : Menjalankan server pengembangan menggunakan Vite.
- `npm run build` : Melakukan kompilasi (build) aplikasi untuk tahap produksi.
- `npm run lint` : Menjalankan ESLint untuk mengecek masalah dan standar penulisan kode.
- `npm run preview` : Menjalankan server lokal untuk melihat pratinjau hasil build produksi.