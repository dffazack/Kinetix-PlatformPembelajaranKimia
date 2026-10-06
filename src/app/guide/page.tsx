'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  FlaskConical,
  BarChart3,
  Shield,
  UserCheck,
  CheckCircle2,
  Atom,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
  Layers,
  Zap,
  Target
} from 'lucide-react';

function GuideContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role');

  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'profile'>(
    initialRole === 'teacher' ? 'teacher' : initialRole === 'profile' ? 'profile' : 'student'
  );

  useEffect(() => {
    if (initialRole === 'teacher') setActiveTab('teacher');
    else if (initialRole === 'profile') setActiveTab('profile');
    else if (initialRole === 'student') setActiveTab('student');
  }, [initialRole]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-pink/20 border border-pink px-2.5 py-0.5 font-mono text-xs font-bold text-charcoal-900 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-pink-hover" />
              <span>DOKUMENTASI & PANDUAN PENGGUNAAN</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900 font-mono">
              PUSAT PANDUAN <span className="text-teal">& PROFIL</span>
            </h1>
            <p className="text-sm sm:text-base text-charcoal-700 mt-1 max-w-2xl">
              Petunjuk operasional lengkap platform pembelajaran Kinetika Kimia interaktif untuk Siswa, Guru Pengampu, serta Informasi Pengembang Media.
            </p>
          </div>

          <Link
            href="/login"
            className="kinetix-btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Shield className="w-3.5 h-3.5 text-teal" />
            Kembali ke Portal Login
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-6 border-t-2 border-teal/20 pt-6 font-mono text-xs font-bold uppercase">
          <button
            onClick={() => setActiveTab('student')}
            className={`py-3 px-2 sm:px-4 border-2 transition-all flex items-center justify-center gap-2 text-center ${
              activeTab === 'student'
                ? 'bg-teal text-white border-teal-deep shadow-brutal-dark font-extrabold'
                : 'bg-cream text-charcoal-700 border-charcoal-300 hover:border-teal hover:text-teal'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Panduan Siswa</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`py-3 px-2 sm:px-4 border-2 transition-all flex items-center justify-center gap-2 text-center ${
              activeTab === 'teacher'
                ? 'bg-pink text-charcoal-900 border-charcoal-900 shadow-brutal-dark font-extrabold'
                : 'bg-cream text-charcoal-700 border-charcoal-300 hover:border-pink hover:text-pink-hover'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Panduan Guru</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-2 sm:px-4 border-2 transition-all flex items-center justify-center gap-2 text-center ${
              activeTab === 'profile'
                ? 'bg-charcoal-900 text-cream border-charcoal-900 shadow-brutal-dark font-extrabold'
                : 'bg-cream text-charcoal-700 border-charcoal-300 hover:border-charcoal-900 hover:text-charcoal-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-teal-light" />
            <span>Profil Pengajar</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PANDUAN SISWA */}
      {activeTab === 'student' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Alur Belajar Siswa */}
          <div className="bg-cream-card border-3 border-teal p-6 kinetix-shadow">
            <h2 className="text-xl font-bold font-mono uppercase text-charcoal-900 flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-pink-hover" />
              Alur Pembelajaran Siswa di Kinetix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-cream p-4 border-2 border-teal-dark space-y-2">
                <span className="bg-teal text-white px-2 py-0.5 font-bold text-[10px] block w-max">
                  LANGKAH 01
                </span>
                <h3 className="font-bold text-charcoal-900 text-sm">Masuk / Daftar Akun</h3>
                <p className="text-charcoal-600 font-sans text-xs">
                  Buka menu Login, masukkan nama & asal sekolah siswa, atau gunakan tombol cepat Demo Siswa untuk langsung memulai tanpa hambatan.
                </p>
              </div>

              <div className="bg-cream p-4 border-2 border-teal-dark space-y-2">
                <span className="bg-teal text-white px-2 py-0.5 font-bold text-[10px] block w-max">
                  LANGKAH 02
                </span>
                <h3 className="font-bold text-charcoal-900 text-sm">Pelajari Modul KB 1 - 6</h3>
                <p className="text-charcoal-600 font-sans text-xs">
                  Pahami teori bertahap: Teori Tumbukan, Luas Permukaan & Konsentrasi, Suhu & Katalis, Hukum Laju, hingga Aplikasi Industri.
                </p>
              </div>

              <div className="bg-cream p-4 border-2 border-teal-dark space-y-2">
                <span className="bg-teal text-white px-2 py-0.5 font-bold text-[10px] block w-max">
                  LANGKAH 03
                </span>
                <h3 className="font-bold text-charcoal-900 text-sm">Eksperimen Virtual</h3>
                <p className="text-charcoal-600 font-sans text-xs">
                  Jalankan simulasi 2D partikel mikroskopis. Ubah suhu, konsentrasi, luas permukaan & katalis, lalu amati grafik laju reaksi seketika.
                </p>
              </div>

              <div className="bg-cream p-4 border-2 border-teal-dark space-y-2">
                <span className="bg-pink text-charcoal-900 px-2 py-0.5 font-bold text-[10px] block w-max">
                  LANGKAH 04
                </span>
                <h3 className="font-bold text-charcoal-900 text-sm">Uji Evaluasi & Nilai</h3>
                <p className="text-charcoal-600 font-sans text-xs">
                  Kerjakan kuis formatif di akhir modul. Nilai dan umpan balik otomatis tersimpan di Dashboard Siswa dan terkirim ke Guru.
                </p>
              </div>
            </div>
          </div>

          {/* Rincian Fitur Siswa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-teal pb-2">
                <BookOpen className="w-5 h-5 text-teal" />
                <h3 className="font-mono font-bold text-base text-charcoal-900 uppercase">
                  1. Modul Kegiatan Belajar (KB 1 - KB 6)
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-charcoal-700 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Struktur Terarah:</strong> Dilengkapi Capaian Pembelajaran, Tujuan Khusus, Stimulus Apersepsi, Uraian Materi, dan Rangkuman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Visualisasi Grafis:</strong> Dilengkapi ilustrasi diagram energi aktivasi ($E_a$), orientasi tumbukan efektif, dan grafik laju reaksi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Navigasi Cepat:</strong> Siswa dapat berpindah antar kegiatan belajar secara fleksibel atau berurutan.</span>
                </li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-teal pb-2">
                <FlaskConical className="w-5 h-5 text-teal" />
                <h3 className="font-mono font-bold text-base text-charcoal-900 uppercase">
                  2. Laboratorium Virtual Interaktif
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-charcoal-700 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Simulasi Partikel Real-time:</strong> Amati gerak acak molekul pereaksi dan pembentukan produk saat tumbukan berhasil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Kendali Variabel Bebas:</strong> Geser slider Suhu (25°C - 90°C), Konsentrasi, Luas Permukaan (Bongkahan vs Serbuk), dan Saklar Katalis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Grafik Dinamis & Timer:</strong> Stopwatch otomatis mencatat waktu reaksi ($t$) dan laju reaksi ($v = 1/t$) secara presisi.</span>
                </li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-teal pb-2">
                <Award className="w-5 h-5 text-teal" />
                <h3 className="font-mono font-bold text-base text-charcoal-900 uppercase">
                  3. Asesmen & Evaluasi Terintegrasi
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-charcoal-700 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Penilaian Otomatis:</strong> Kuis interaktif dengan umpan balik langsung benar/salah beserta penjelasan ilmiah mendalam.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Skor & Kelulusan (KKM 75):</strong> Ketahui status ketuntasan Anda secara instan setelah menyelesaikan butir soal evaluasi.</span>
                </li>
              </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-teal pb-2">
                <BarChart3 className="w-5 h-5 text-teal" />
                <h3 className="font-mono font-bold text-base text-charcoal-900 uppercase">
                  4. Dashboard Progres Siswa
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-charcoal-700 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Pantau Skor & Modul:</strong> Lihat riwayat modul yang telah Anda selesaikan, rata-rata nilai, dan lencana pencapaian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span><strong>Akses Cepat Remedial:</strong> Anda dapat mengulang modul atau eksperimen kapan saja untuk memperkuat pemahaman.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/modules" className="kinetix-btn-primary text-xs py-2.5 px-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Mulai Belajar Sekarang (Modul KB 1-6)
            </Link>
            <Link href="/experiments" className="kinetix-btn-pink text-xs py-2.5 px-5 flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Buka Laboratorium Virtual
            </Link>
          </div>
        </div>
      )}

      {/* TAB 2: PANDUAN GURU */}
      {activeTab === 'teacher' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Guru */}
          <div className="bg-pink/10 border-3 border-charcoal-900 p-6 kinetix-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-charcoal-900" />
              <h2 className="text-xl font-bold font-mono uppercase text-charcoal-900">
                PANDUAN OPERASIONAL PORTAL GURU PENGAMPU
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-700 font-sans">
              Portal Guru Kinetix dirancang khusus untuk mempermudah monitoring proses belajar siswa, evaluasi ketuntasan klasikal, dan integrasi pembelajaran laboratorium virtual di ruang kelas.
            </p>
          </div>

          {/* Fitur Utama Guru */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="w-8 h-8 bg-teal text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 uppercase">
                Otorisasi Akses Guru
              </h3>
              <p className="text-xs text-charcoal-600 font-sans">
                Akses guru dilindungi kata sandi pengampu khusus untuk menjaga kerahasiaan data siswa.
              </p>
              <div className="bg-cream border border-teal p-2 text-[11px] text-teal-dark font-mono">
                Kata Sandi Default: <strong>guru123</strong>
              </div>
            </div>

            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="w-8 h-8 bg-pink text-charcoal-900 border border-charcoal-900 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 uppercase">
                Monitoring Rekapitulasi Real-Time
              </h3>
              <p className="text-xs text-charcoal-600 font-sans">
                Pantau daftar seluruh siswa, progres penyelesaian modul (KB 1 - 6), dan perolehan skor asesmen otomatis secara terpusat.
              </p>
              <div className="bg-cream border border-charcoal-900 p-2 text-[11px] text-charcoal-800 font-mono">
                Indikator Status: Tuntas (&ge;75) / Belum Tuntas (&lt;75)
              </div>
            </div>

            <div className="bg-cream-card border-2 border-charcoal-900 p-5 space-y-3">
              <div className="w-8 h-8 bg-charcoal-900 text-cream flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 uppercase">
                Analisis Diagnostik Siswa
              </h3>
              <p className="text-xs text-charcoal-600 font-sans">
                Lihat rincian jawaban per butir soal untuk mengidentifikasi miskonsepsi kinetika kimia dan merancang pengayaan atau remedial terarah.
              </p>
              <div className="bg-cream border border-teal p-2 text-[11px] text-teal-dark font-mono">
                Fitur Filter Siswa & Pencarian Cepat
              </div>
            </div>
          </div>

          {/* Skenario Pembelajaran di Kelas */}
          <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-4">
            <h3 className="font-mono font-bold text-base uppercase text-charcoal-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal" />
              Rekomendasi Skenario Pembelajaran Berbasis Inkuiri Terbimbing
            </h3>
            <div className="space-y-3 text-xs font-sans text-charcoal-700">
              <div className="border-l-4 border-teal pl-3 py-1">
                <strong className="font-mono text-charcoal-900 block">Fase 1 — Orientasi & Apersepsi (15 Menit):</strong>
                Guru menampilkan stimulus visual fenomena laju reaksi dari Modul Kinetix (misal: perkaratan besi vs ledakan kembang api) melalui proyektor.
              </div>
              <div className="border-l-4 border-teal pl-3 py-1">
                <strong className="font-mono text-charcoal-900 block">Fase 2 — Investigasi Virtual Lab (30 Menit):</strong>
                Siswa dibagi dalam kelompok kecil untuk menguji pengaruh salah satu faktor (Suhu / Konsentrasi / Luas Permukaan / Katalis) pada menu Laboratorium Virtual dan mencatat waktu reaksi ($t$) serta grafik laju.
              </div>
              <div className="border-l-4 border-teal pl-3 py-1">
                <strong className="font-mono text-charcoal-900 block">Fase 3 — Diskusi & Asesmen Formatif (25 Menit):</strong>
                Siswa menjawab kuis evaluasi pemahaman di platform, sementara guru memantau dashboard untuk melihat distribusi skor dan kendala siswa secara langsung.
              </div>
              <div className="border-l-4 border-teal pl-3 py-1">
                <strong className="font-mono text-charcoal-900 block">Fase 4 — Refleksi & Penguatan Konsep (10 Menit):</strong>
                Guru mengulas butir soal dengan persentase kesalahan tertinggi dan memberikan penguatan konsep mikroskopis teori tumbukan.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/teacher/dashboard" className="kinetix-btn-pink text-xs py-2.5 px-5 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Buka Panel Kontrol Rekap Nilai Guru
            </Link>
            <Link href="/login" className="kinetix-btn-secondary text-xs py-2.5 px-5 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Login Akun Guru Pengampu
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: PROFIL PENGAJAR & PENGEMBANG */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-cream-card border-3 border-charcoal-900 p-6 sm:p-8 kinetix-shadow-dark">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar Box */}
              <div className="w-32 h-32 bg-teal border-3 border-charcoal-900 shadow-brutal-pink flex flex-col items-center justify-center text-cream shrink-0 text-center p-2">
                <span className="text-4xl">👩‍🏫</span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest mt-1 text-cream/90">
                  PENGAJAR
                </span>
              </div>

              {/* Identity Details */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <span className="inline-block bg-pink text-charcoal-900 font-mono text-xs font-bold px-2.5 py-0.5 border border-charcoal-900 mb-2 uppercase">
                    Profil Pengajar & Pengembang Media
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-charcoal-900 uppercase tracking-tight">
                    Friska Farah Faridah
                  </h2>
                  <p className="text-sm font-mono text-teal-dark font-bold mt-0.5">
                    NIM: 240331605527
                  </p>
                </div>

                {/* Academic Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
                  <div className="bg-cream p-3 border-2 border-teal-dark">
                    <span className="text-charcoal-500 text-[10px] block uppercase">Program Studi:</span>
                    <strong className="text-charcoal-900 text-sm">S1 Pendidikan Kimia</strong>
                  </div>

                  <div className="bg-cream p-3 border-2 border-teal-dark">
                    <span className="text-charcoal-500 text-[10px] block uppercase">Fokus Pengembangan:</span>
                    <strong className="text-charcoal-900 text-sm">Kinetika Kimia & Lab Virtual</strong>
                  </div>
                </div>

                <div className="pt-2 text-xs sm:text-sm text-charcoal-700 font-sans leading-relaxed text-justify md:text-left border-t border-charcoal-200">
                  <p>
                    Platform <strong>KINETIX</strong> dikembangkan sebagai solusi media pembelajaran kimia berbasis komputasi interaktif. Media ini mengintegrasikan representasi makroskopis, sub-mikroskopis (simulasi partikel kinetik 2D), dan simbolik (persamaan laju reaksi & grafik) guna mereduksi miskonsepsi siswa SMA/MA pada materi Kinetika Kimia.
                  </p>
                </div>
              </div>
            </div>

            {/* Spek Desain & Metodologi */}
            <div className="mt-8 pt-6 border-t-2 border-charcoal-900 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-cream p-3 border border-charcoal-900">
                <span className="font-bold text-teal-dark block uppercase mb-1">Cakupan Materi</span>
                <p className="text-[11px] text-charcoal-600 font-sans">
                  6 Modul Lengkap (Teori Tumbukan, Suhu, Konsentrasi, Luas Permukaan, Katalis, Orde Reaksi).
                </p>
              </div>

              <div className="bg-cream p-3 border border-charcoal-900">
                <span className="font-bold text-teal-dark block uppercase mb-1">Simulasi Laboratorium</span>
                <p className="text-[11px] text-charcoal-600 font-sans">
                  Engine partikel dinamis berbasis HTML5 Canvas dengan parameter reaksi yang dapat dimanipulasi.
                </p>
              </div>

              <div className="bg-cream p-3 border border-charcoal-900">
                <span className="font-bold text-teal-dark block uppercase mb-1">Sistem Evaluasi</span>
                <p className="text-[11px] text-charcoal-600 font-sans">
                  Bank kuis formatif otomatis dengan kalkulasi ketuntasan belajar dan rekap nilai guru terintegrasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center font-mono text-sm text-charcoal-600">
          Memuat Dokumen Panduan Kinetix...
        </div>
      }
    >
      <GuideContent />
    </Suspense>
  );
}
