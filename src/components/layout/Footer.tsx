'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Atom, BookOpen, FlaskConical, Award, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan footer khusus di halaman login
  if (pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-charcoal-900 text-cream border-t-3 border-teal mt-16 font-sans">
      {/* Top Banner Accent with Kinetics Formula */}
      <div className="bg-teal-deep border-b border-teal/40 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-teal-light">
            <Atom className="w-3.5 h-3.5 text-pink" />
            <span className="font-bold text-cream">KINETIKA REAKSI:</span>
            <span>v = -d[R]/dt = k[A]ᵐ[B]ⁿ</span>
          </div>
          <div className="text-charcoal-300">
            Standar Pembelajaran Kimia Fase F (SMA/MA Kelas XI & XII)
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink text-charcoal-900 border border-charcoal-900 flex items-center justify-center font-bold font-mono text-lg shadow-brutal-teal-sm">
                ⚛
              </div>
              <span className="font-mono font-extrabold text-xl tracking-wider text-cream uppercase">
                KINETIX<span className="text-pink">.</span>
              </span>
            </Link>
            <p className="text-xs text-charcoal-300 leading-relaxed font-sans">
              Platform e-learning kinetika kimia berbasis <strong>Problem-Based Learning (PBL)</strong> dan <strong>Triplet Deep Learning</strong> (Makroskopik, Submikroskopik, Simbolik).
            </p>
            <div className="pt-1">
              <span className="font-mono text-[10px] bg-charcoal-800 text-teal-light border border-teal-dark px-2 py-1 inline-block">
                Edisi Kurikulum Merdeka 2026
              </span>
            </div>
          </div>

          {/* Col 2: Kegiatan Belajar (KB 1 - 5) */}
          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold text-teal-light uppercase tracking-wider block border-b border-charcoal-700 pb-1">
              Silabus Modul (KB 1 - 5)
            </span>
            <ul className="space-y-1.5 text-charcoal-300">
              <li>
                <Link href="/modules/kb-1" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-teal">▸</span> KB 1: Konsep Laju & Molaritas
                </Link>
              </li>
              <li>
                <Link href="/modules/kb-2" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-teal">▸</span> KB 2: Tumbukan & Luas Permukaan
                </Link>
              </li>
              <li>
                <Link href="/modules/kb-3" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-teal">▸</span> KB 3: Pengaruh Konsentrasi & Suhu
                </Link>
              </li>
              <li>
                <Link href="/modules/kb-4" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-teal">▸</span> KB 4: Katalis & Energi Aktivasi
                </Link>
              </li>
              <li>
                <Link href="/modules/kb-5" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-teal">▸</span> KB 5: Orde Reaksi & Haber-Bosch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Laboratorium Virtual */}
          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold text-teal-light uppercase tracking-wider block border-b border-charcoal-700 pb-1">
              Laboratorium Virtual 2D
            </span>
            <ul className="space-y-1.5 text-charcoal-300">
              <li>
                <Link href="/experiments?type=FACTORS_REACTION" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-pink">🧪</span> Uji 4 Faktor Laju Reaksi
                </Link>
              </li>
              <li>
                <Link href="/experiments?type=COLLISION_THEORY" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-pink">🧪</span> Teori Tumbukan & Orientasi
                </Link>
              </li>
              <li>
                <Link href="/experiments?type=ACTIVATION_ENERGY" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-pink">🧪</span> Profil Diagram Ea & Katalis
                </Link>
              </li>
              <li>
                <Link href="/experiments?type=RATE_LAW" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-pink">🧪</span> Penentuan Orde Reaksi
                </Link>
              </li>
              <li>
                <Link href="/experiments?type=INDUSTRIAL_KINETICS" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span className="text-pink">🧪</span> Reaktor Industri Haber-Bosch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Evaluasi & Panduan */}
          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold text-teal-light uppercase tracking-wider block border-b border-charcoal-700 pb-1">
              Evaluasi & Akses
            </span>
            <ul className="space-y-1.5 text-charcoal-300">
              <li>
                <Link href="/guide" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span>📖</span> Panduan Belajar & Sintaks PBL
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span>📊</span> Rekap Capaian & N-Gain Siswa
                </Link>
              </li>
              <li>
                <Link href="/teacher/dashboard" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span>🛡</span> Portal Guru & Editor Modul
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-pink transition-colors flex items-center gap-1.5">
                  <span>🔑</span> Masuk / Ganti Akun Pengguna
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Style Attribution */}
        <div className="border-t border-charcoal-800 mt-8 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-charcoal-400">
          <div>
            <span>© 2026 <strong>KINETIX Platform</strong>. Hak Cipta Dilindungi.</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-charcoal-800 text-teal-light px-2.5 py-0.5 border border-teal-dark">
              Aturan Bentuk: 0px Radius Lancip
            </span>
            <span className="text-cream">
              Palet: <strong className="text-cream">Cream</strong> • <strong className="text-teal-light">Teal</strong> • <strong className="text-pink">Pink</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
