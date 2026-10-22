'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import KineticsHeroVisualizer from '@/components/kinetics/KineticsHeroVisualizer';
import {
  Atom,
  BookOpen,
  FlaskConical,
  Award,
  ArrowRight,
  CheckCircle2,
  Shield,
  Sparkles,
  Activity,
  Layers,
  LogIn,
  Flame,
  Zap,
  TrendingUp,
  HelpCircle,
  FileText,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { lessons, results } = useData();

  const isTeacher = user?.role === 'TEACHER';

  // Scientific kinetics equations ticker items
  const tickerItems = [
    'v = -Δ[R]/Δt = +Δ[P]/Δt',
    'v = k · [A]ᵐ · [B]ⁿ',
    'k = A · exp(-Ea / RT)',
    'Ea (dengan Katalis) < Ea (tanpa Katalis)',
    'v₂ = v₁ · 2^((T₂ - T₁) / 10)',
    'Z_eff = Z · e^(-Ea/RT) · p',
    'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) [Katalis Fe, 450°C, 200 atm]',
    'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)',
  ];

  // Specific kinetics chemistry icon & formula badge for each KB
  const kbKineticsBadges: Record<number, { formula: string; accent: string; label: string }> = {
    1: { formula: 'v = -d[R]/dt', accent: 'bg-teal', label: 'Konsep Molaritas & Laju' },
    2: { formula: 'Z_eff = Z · p · e^(-Ea/RT)', accent: 'bg-pink', label: 'Luas Bidang Tumbukan' },
    3: { formula: 'E_kinetik ∝ T', accent: 'bg-teal-dark', label: 'Suhu & Distribusi Boltzmann' },
    4: { formula: 'Ea_katalis < Ea_dasar', accent: 'bg-pink', label: 'Penurunan Hambatan Energi' },
    5: { formula: 'v = k[A]ᵐ[B]ⁿ', accent: 'bg-charcoal-900', label: 'Orde Reaksi & Haber-Bosch' },
  };

  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION WITH CHEMICAL KINETICS SIMULATOR */}
      <section className="bg-cream-card border-3 border-teal-dark p-6 sm:p-10 kinetix-shadow relative overflow-hidden bg-kinetics-radar">
        {/* Floating curriculum version tag */}
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase bg-teal-deep text-cream px-3 py-1 border border-teal-light">
            Kurikulum Kimia SMA/MA Fase F
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, description, and CTAs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-pink/20 border-2 border-pink px-3 py-1 font-mono text-xs font-bold text-charcoal-900">
              <Sparkles className="w-4 h-4 text-pink-hover" />
              <span>PLATFORM PEMBELAJARAN KINETIKA KIMIA INTERAKTIF</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-charcoal-900 leading-[1.05]">
              REKAYASA LAJU REAKSI DENGAN <span className="text-teal-dark underline decoration-pink decoration-4">KINETIX.</span>
            </h1>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-sans font-normal">
              Kuasai konsep kinetika kimia secara mendalam melalui <strong>5 Pertemuan Problem-Based Learning (KB 1 - KB 5)</strong> yang mengintegrasikan <em>Deep Learning</em> Triplet Kimia (<strong>Submikroskopik</strong>, <strong>Makroskopik</strong>, dan <strong>Simbolik</strong>), laboratorium virtual 2D interaktif, serta evaluasi otomatis Pre-test, Post-test HOTS, dan Jurnal Refleksi.
            </p>

            {/* Quick stats strip */}
            <div className="grid grid-cols-3 gap-2 py-1 font-mono text-xs">
              <div className="bg-cream border-2 border-teal p-2">
                <div className="text-[10px] text-teal-dark font-bold uppercase">5 Kegiatan Belajar</div>
                <div className="font-extrabold text-charcoal-900">12 JP / 540 Menit</div>
              </div>
              <div className="bg-cream border-2 border-teal p-2">
                <div className="text-[10px] text-teal-dark font-bold uppercase">Laboratorium 2D</div>
                <div className="font-extrabold text-charcoal-900">6 Modul Interaktif</div>
              </div>
              <div className="bg-cream border-2 border-teal p-2">
                <div className="text-[10px] text-teal-dark font-bold uppercase">Evaluasi Terpadu</div>
                <div className="font-extrabold text-charcoal-900">Pre/Post & N-Gain</div>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/modules" className="kinetix-btn-primary text-sm py-3 px-6 shadow-brutal-dark">
                <BookOpen className="w-4 h-4" />
                MULAI BELAJAR (KB 1 - 5)
              </Link>

              <Link href="/experiments" className="kinetix-btn-pink text-sm py-3 px-6 shadow-brutal-dark">
                <FlaskConical className="w-4 h-4" />
                LAB VIRTUAL 2D
              </Link>

              {isTeacher ? (
                <Link href="/teacher/dashboard" className="kinetix-btn-secondary text-sm py-3 px-5">
                  <Shield className="w-4 h-4 text-teal" />
                  REKAP NILAI GURU
                </Link>
              ) : user ? (
                <Link href="/student/dashboard" className="kinetix-btn-secondary text-sm py-3 px-5">
                  <Award className="w-4 h-4 text-teal" />
                  STATUS PROGRES SAYA
                </Link>
              ) : (
                <Link href="/login" className="kinetix-btn-secondary text-sm py-3 px-5">
                  <LogIn className="w-4 h-4 text-teal" />
                  MASUK AKUN
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Live Chemical Kinetics Simulation Widget */}
          <div className="lg:col-span-5 w-full">
            <KineticsHeroVisualizer />
          </div>
        </div>
      </section>

      {/* 2. CHEMICAL KINETICS EQUATIONS & FORMULAS TICKER */}
      <section className="bg-teal-deep text-cream border-3 border-charcoal-900 overflow-hidden py-3 kinetix-shadow-sm">
        <div className="flex items-center gap-4 overflow-hidden relative">
          <div className="bg-pink text-charcoal-900 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap z-10 shrink-0 border-r-2 border-charcoal-900">
            Aksen Formula Kinetika
          </div>
          <div className="animate-ticker font-mono text-xs font-bold tracking-wide flex items-center gap-8 text-cream/90">
            {[...tickerItems, ...tickerItems].map((eq, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="text-pink">⚛</span>
                <span className="bg-charcoal-900/60 border border-teal-light/40 px-2.5 py-0.5">
                  {eq}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRIPLET REPRESENTATION DEEP LEARNING MODEL */}
      <section className="space-y-4">
        <div className="border-b-3 border-teal-dark pb-2">
          <span className="text-xs font-mono font-bold uppercase text-teal-dark tracking-wider block">
            Pilar Pedagogis Kimia KINETIX
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-charcoal-900">
            3 Tingkat Representasi Kimia (Triplet Chem-Learning)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* Makroskopik */}
          <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow-hover space-y-3 relative">
            <div className="w-10 h-10 bg-teal text-white flex items-center justify-center font-bold font-mono text-base border-2 border-charcoal-900 shadow-brutal-dark">
              01
            </div>
            <div className="inline-block bg-teal/15 text-teal-deep px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
              Tingkat Makroskopik
            </div>
            <h3 className="font-extrabold text-lg uppercase text-charcoal-900">
              Fenomena Nyata & Masalah Kontekstual
            </h3>
            <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
              Mengamati fenomena yang dapat diindera langsung: kecepatan karat paku besi, pelepasan gelembung gas $CO_2$ dari tablet efervesen, dan risiko ledakan debu di lumbung pabrik.
            </p>
            <div className="text-[11px] font-mono text-teal-dark font-bold pt-1">
              Fase 1 PBL: Orientasi Masalah Otentik
            </div>
          </div>

          {/* Submikroskopik */}
          <div className="bg-cream-card border-3 border-pink p-6 kinetix-shadow-hover space-y-3 relative">
            <div className="w-10 h-10 bg-pink text-charcoal-900 flex items-center justify-center font-bold font-mono text-base border-2 border-charcoal-900 shadow-brutal-dark">
              02
            </div>
            <div className="inline-block bg-pink/20 text-charcoal-900 px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
              Tingkat Submikroskopik
            </div>
            <h3 className="font-extrabold text-lg uppercase text-charcoal-900">
              Dinamika Partikel & Teori Tumbukan
            </h3>
            <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
              Memvisualisasikan interaksi tak kasat mata: gerakan translasi molekul, sudut orientasi tumbukan tepat, serta energi kinetik minimum untuk melampaui hambatan energi aktivasi ($E_a$).
            </p>
            <div className="text-[11px] font-mono text-pink-hover font-bold pt-1">
              Laboratorium Virtual 2D & Simulasi Partikel
            </div>
          </div>

          {/* Simbolik */}
          <div className="bg-cream-card border-3 border-charcoal-900 p-6 kinetix-shadow-hover space-y-3 relative">
            <div className="w-10 h-10 bg-charcoal-900 text-cream flex items-center justify-center font-bold font-mono text-base border-2 border-charcoal-900 shadow-brutal-teal-sm">
              03
            </div>
            <div className="inline-block bg-charcoal-100 text-charcoal-900 px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
              Tingkat Simbolik
            </div>
            <h3 className="font-extrabold text-lg uppercase text-charcoal-900">
              Persamaan Matematika & Grafik Kinetika
            </h3>
            <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
              Merumuskan hukum laju $v = k[A]^m[B]^n$, menentukan orde reaksi secara diferensial dan integral, serta menganalisis diagram koordinat reaksi potensial secara kuantitatif.
            </p>
            <div className="text-[11px] font-mono text-charcoal-900 font-bold pt-1">
              Asesmen HOTS & Perhitungan Laju
            </div>
          </div>
        </div>
      </section>

      {/* 4. 5 KEGIATAN BELAJAR (KB 1 - KB 5) SYLLABUS CARDS */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-3 border-teal-dark pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-teal-dark tracking-wider block">
              Alur Pembelajaran Kinetika Terstruktur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-charcoal-900">
              5 Kegiatan Belajar (Problem-Based Learning)
            </h2>
          </div>
          <Link
            href="/modules"
            className="font-mono text-xs font-bold text-teal-dark hover:text-pink flex items-center gap-1.5 uppercase bg-cream border-2 border-teal-dark px-3 py-1.5 shadow-brutal-teal-sm"
          >
            Lihat Silabus Lengkap <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const hasCompleted = user
              ? results.some((r) => r.studentId === user.id && r.lessonId === lesson.id)
              : false;
            const studentResult = user
              ? results.find((r) => r.studentId === user.id && r.lessonId === lesson.id)
              : undefined;

            const badgeInfo = kbKineticsBadges[lesson.orderNumber] || {
              formula: 'v = k[A]',
              accent: 'bg-teal',
              label: 'Kinetika Kimia',
            };

            return (
              <div
                key={lesson.id}
                className="bg-cream-card border-3 border-teal-dark p-6 flex flex-col justify-between kinetix-shadow-hover relative"
              >
                {/* Top Badge & Duration */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-charcoal-300 pb-2">
                    <span className="font-mono text-xs font-bold bg-teal text-white px-2.5 py-0.5 uppercase">
                      KB {lesson.orderNumber}
                    </span>
                    <span className="font-mono text-xs font-bold text-charcoal-600">
                      ⏱ {lesson.duration}
                    </span>
                  </div>

                  {/* Kinetics Formula Pill Accent */}
                  <div className="mb-2">
                    <span className="kinetix-formula-tag">
                      <Atom className="w-3.5 h-3.5 text-teal" />
                      {badgeInfo.formula}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold uppercase text-charcoal-900 leading-snug line-clamp-1 mb-1">
                    {lesson.title.replace(/^KB \d+: /, '')}
                  </h3>
                  <div className="text-xs font-mono font-bold text-teal-dark mb-3">
                    {lesson.subtitle}
                  </div>

                  <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
                    {lesson.description}
                  </p>

                  {/* PBL Context Teaser */}
                  {lesson.pblProblem && (
                    <div className="bg-cream border-l-3 border-pink p-2 text-xs font-mono text-charcoal-800 mb-3">
                      <span className="font-bold text-pink-hover text-[10px] block uppercase">
                        Kasus PBL:
                      </span>
                      <span className="line-clamp-2 text-[11px]">
                        {lesson.pblProblem.replace('Orientasi Masalah: ', '')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Details & Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-charcoal-300">
                  {hasCompleted && studentResult ? (
                    <div className="flex items-center justify-between text-xs font-mono bg-teal/15 border border-teal p-2">
                      <span className="flex items-center gap-1 text-teal-deep font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" /> Selesai Evaluasi
                      </span>
                      <span className="font-extrabold text-teal-deep">
                        Nilai: {studentResult.score}/100
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] font-mono text-charcoal-500 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-pink inline-block"></span>
                        Pre/Post-Test HOTS
                      </span>
                      <span className="text-teal-dark font-bold">5 Alur Belajar</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/modules/${lesson.id}`}
                      className="kinetix-btn-primary text-xs py-2 text-center"
                    >
                      Buka KB {lesson.orderNumber}
                    </Link>
                    <Link
                      href={`/experiments?type=${lesson.simulationType}`}
                      className="kinetix-btn-secondary text-xs py-2 text-center"
                    >
                      Lab Virtual
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. VIRTUAL LAB & ASSESSMENT HIGHLIGHT BANNER */}
      <section className="bg-charcoal-900 text-cream border-3 border-teal p-6 sm:p-8 kinetix-shadow-dark space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-700 pb-4">
          <div className="space-y-1">
            <span className="text-pink font-mono text-xs font-bold uppercase tracking-wider block">
              Fitur Platform Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-cream">
              Fasilitas Eksperimen & Evaluasi Terintegrasi
            </h2>
          </div>
          <Link
            href="/experiments"
            className="kinetix-btn-pink text-xs py-2.5 px-5 shadow-brutal-teal-sm"
          >
            <FlaskConical className="w-4 h-4" /> Buka Laboratorium Virtual
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="bg-charcoal-800 border-2 border-teal-dark p-5 space-y-2">
            <div className="text-teal-light font-bold text-sm uppercase flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-pink" /> 6 Enjin Simulasi Interaktif
            </div>
            <p className="text-charcoal-300 leading-relaxed font-sans text-xs">
              Uji coba variabel Luas Permukaan (Bongkahan vs Serbuk $CaCO_3$), Konsentrasi $HCl$, Suhu dengan termometer digital, dan Katalis padat dengan respons grafik laju real-time.
            </p>
          </div>

          <div className="bg-charcoal-800 border-2 border-pink p-5 space-y-2">
            <div className="text-pink font-bold text-sm uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cream" /> Asesmen HOTS & N-Gain
            </div>
            <p className="text-charcoal-300 leading-relaxed font-sans text-xs">
              Sistem diagnostik Pre-test dan Post-test otomatis menghitung efektivitas peningkatan belajar (Normalisasi Gain / Hake&apos;s N-Gain) siswa secara objektif.
            </p>
          </div>

          <div className="bg-charcoal-800 border-2 border-teal-light p-5 space-y-2">
            <div className="text-teal-light font-bold text-sm uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-pink" /> Jurnal Refleksi & Esai
            </div>
            <p className="text-charcoal-300 leading-relaxed font-sans text-xs">
              Siswa menuangkan pemahaman metakognitif melalui jurnal refleksi, isian rumpang bertanda cek, dan esai paragraf yang tersimpan langsung di panel guru.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
