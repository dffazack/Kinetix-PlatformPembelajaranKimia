# KINETIX — Platform Pembelajaran Kinetika Kimia Interaktif

KINETIX adalah web interaktif pembelajaran Kimia (Kinetika Kimia / Laju Reaksi) dengan sistem multi-peran (Siswa & Guru), modul pembelajaran terstruktur (Kegiatan Belajar KB 1 – KB 6), serta laboratorium simulasi partikel mikroskopis 2D.

---

## 🔬 Fitur Utama

### 1. Desain & Estetika (Neo-Brutalism Kimia)
- **Geometris & Tegas**: Sudut lancip/tajam (`border-radius: 0px` / `rounded-none`).
- **Palet Warna**:
  - **Cream** (`#F5F5DC` / `#FFFDD0`): Latar belakang nyaman dibaca.
  - **Teal** (`#008080` / `#005959`): Aksi utama, navbar, dan border tegas.
  - **Pink** (`#FFC0CB` / `#FF69B4`): Aksen tombol eksperimen, hover state, dan notifikasi.

### 2. Modul Kegiatan Belajar (KB 1 - KB 6)
- **KB 1**: Konsep & Laju Reaksi (Perubahan konsentrasi vs waktu).
- **KB 2**: Teori Tumbukan (Animasi tumbukan partikel efektif vs tidak efektif).
- **KB 3**: Energi Aktivasi (Distribusi Maxwell-Boltzmann & Arrhenius).
- **KB 4**: Faktor-Faktor Laju Reaksi (Konsentrasi, Luas Permukaan, Suhu, Katalis).
- **KB 5**: Hukum Laju & Orde Reaksi (Metode Laju Awal & Analisis Data Grafik).
- **KB 6**: Kinetika dalam Kehidupan & Industri (Proses Haber-Bosch & Kontak).

### 3. Laboratorium Virtual 2D (HTML5 Canvas)
- Simulasi partikel kinetik mikroskopis interaktif secara real-time.
- Slider pengatur suhu, konsentrasi, luas permukaan, dan katalis.
- Visualisasi grafik kurva laju reaksi real-time.

### 4. Peran Siswa (Student)
- Registrasi dan login akun mandiri.
- Dashboard siswa untuk memantau progres belajar KB 1 - KB 6.
- Fitur isian singkat (*fill-in-the-blank*) dengan penyimpanan otomatis.
- Evaluasi asesmen 10 soal pilihan ganda per KB dengan sistem *auto-grading*.

### 5. Peran Guru (Teacher)
- Login dengan otentikasi kata sandi terproteksi.
- *Dynamic Content Editor* untuk menambah, mengedit, dan mengatur tata letak materi pembelajaran.
- Panel pemantauan rekapitulasi nilai ujian pilihan ganda dan jawaban isian siswa.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS (Kinetix brutalist tokens & 0px radius)
- **ORM & Database**: Prisma ORM dengan SQLite
- **Simulasi 2D**: HTML5 Canvas Particle Engine
- **Ikonografi**: Lucide React
- **Efek Visual**: Canvas Confetti

---

## 🚀 Memulai Aplikasi Secara Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```
