'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FlaskConical,
  ArrowRight,
  Award,
  TrendingUp,
  Sparkles,
  Atom,
  Check,
  Zap,
  Filter,
} from 'lucide-react';

export default function ModulesPage() {
  const { lessons, results } = useData();
  const { user } = useAuth();
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'FOUNDATION' | 'FACTORS' | 'APPLICATION'>('ALL');

  // Specific kinetics chemistry icon & formula badge for each KB
  const kbKineticsDetails: Record<
    number,
    { formula: string; category: 'FOUNDATION' | 'FACTORS' | 'APPLICATION'; phenomenon: string; concept: string }
  > = {
    1: {
      formula: 'v = -Δ[R]/Δt',
      category: 'FOUNDATION',
      phenomenon: 'Perkaratan Besi vs Ledakan Debu',
      concept: 'Molaritas & Kemolaran Larutan',
    },
    2: {
      formula: 'Z_eff = Z · p · e^(-Ea/RT)',
      category: 'FACTORS',
      phenomenon: 'Kepingan Marmer vs Serbuk Halus',
      concept: 'Geometri Tumbukan & Luas Permukaan',
    },
    3: {
      formula: 'v₂ = v₁ · 2^((T₂ - T₁)/10)',
      category: 'FACTORS',
      phenomenon: 'Pengaruh Suhu & Konsentrasi HCl',
      concept: 'Energi Kinetik & Distribusi Maxwell',
    },
    4: {
      formula: 'Ea (Katalis) < Ea (Tanpa)',
      category: 'FACTORS',
      phenomenon: 'Dekomposisi H₂O₂ & Katalis MnO₂',
      concept: 'Penurunan Hambatan Energi Aktivasi',
    },
    5: {
      formula: 'v = k[A]ᵐ[B]ⁿ',
      category: 'APPLICATION',
      phenomenon: 'Sintesis Industri Amonia Haber-Bosch',
      concept: 'Penentuan Eksperimental Orde Reaksi',
    },
  };

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    if (filterCategory === 'ALL') return true;
    const cat = kbKineticsDetails[lesson.orderNumber]?.category;
    return cat === filterCategory;
  });

  // Calculate overall user completion
  const completedLessonsCount = user
    ? lessons.filter((l) => results.some((r) => r.studentId === user.id && r.lessonId === l.id && r.stagesCompleted?.includes('POST_TEST'))).length
    : 0;
  const progressPercent = Math.round((completedLessonsCount / lessons.length) * 100);

  return (
    <div className="space-y-8">
      {/* Top Banner with Curriculum Metadata & Kinetics Grid */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow bg-kinetics-radar relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-teal-deep text-cream px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border border-teal-light">
              <Atom className="w-3.5 h-3.5 text-pink" />
              Kurikulum Kinetika Kimia SMA/MA (5 Pertemuan • 12 JP • 540 Menit)
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900">
              Silabus & Alur Pembelajaran (KB 1 — KB 5)
            </h1>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-sans">
              Setiap kegiatan belajar dirancang dengan sintaks <strong>Problem-Based Learning (PBL)</strong> terpadu <strong>Deep Learning Triplet Kimia</strong> (Makroskopik, Submikroskopik, dan Simbolik). Selesaikan alur belajar secara berurutan untuk hasil belajar optimal.
            </p>
          </div>

          {/* User Progress Card */}
          {user && (
            <div className="bg-cream border-2 border-teal-dark p-4 font-mono text-xs space-y-2 min-w-[240px] shadow-brutal-teal-sm">
              <div className="flex items-center justify-between text-teal-deep font-bold">
                <span>PROGRES KURIKULUM:</span>
                <span className="text-pink-hover font-extrabold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-cream-dark h-2.5 border border-charcoal-700">
                <div
                  className="bg-teal h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-charcoal-600 flex justify-between">
                <span>{completedLessonsCount} dari {lessons.length} KB Tuntas</span>
                <span className="text-teal-dark font-bold">Fase F Merdeka</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-charcoal-300 mt-6 font-mono text-xs">
          <span className="font-bold text-charcoal-700 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-teal" /> Filter Topik:
          </span>
          <button
            type="button"
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1 font-bold uppercase border-2 transition-all ${
              filterCategory === 'ALL'
                ? 'bg-teal text-white border-charcoal-900 shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-800 border-charcoal-400 hover:border-teal'
            }`}
          >
            Semua Modul ({lessons.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('FOUNDATION')}
            className={`px-3 py-1 font-bold uppercase border-2 transition-all ${
              filterCategory === 'FOUNDATION'
                ? 'bg-teal text-white border-charcoal-900 shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-800 border-charcoal-400 hover:border-teal'
            }`}
          >
            Konsep & Laju (KB 1)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('FACTORS')}
            className={`px-3 py-1 font-bold uppercase border-2 transition-all ${
              filterCategory === 'FACTORS'
                ? 'bg-teal text-white border-charcoal-900 shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-800 border-charcoal-400 hover:border-teal'
            }`}
          >
            Faktor Penentu Laju (KB 2, 3, 4)
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('APPLICATION')}
            className={`px-3 py-1 font-bold uppercase border-2 transition-all ${
              filterCategory === 'APPLICATION'
                ? 'bg-teal text-white border-charcoal-900 shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-800 border-charcoal-400 hover:border-teal'
            }`}
          >
            Orde Reaksi & Industri (KB 5)
          </button>
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map((lesson) => {
          const studentResult = user
            ? results.find((r) => r.studentId === user.id && r.lessonId === lesson.id)
            : undefined;
          const stages = studentResult?.stagesCompleted || [];
          const isPreDone = stages.includes('PRE_TEST');
          const isOrientDone = stages.includes('ORIENTATION');
          const isSimDone = stages.includes('SIMULATION');
          const isPostDone = stages.includes('POST_TEST');
          const isReflectDone = stages.includes('REFLECTION');

          const detail = kbKineticsDetails[lesson.orderNumber] || {
            formula: 'v = k[A]',
            category: 'FOUNDATION',
            phenomenon: 'Kinetika Kimia',
            concept: 'Laju Reaksi',
          };

          return (
            <div
              key={lesson.id}
              className="bg-cream-card border-3 border-teal-dark p-6 flex flex-col justify-between kinetix-shadow-hover relative"
            >
              <div className="space-y-4">
                {/* Header: KB Number & Duration & Formula */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-300 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-teal text-white px-2.5 py-0.5 uppercase">
                      Pertemuan {lesson.orderNumber}
                    </span>
                    <span className="kinetix-formula-tag text-[10px]">
                      {detail.formula}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-charcoal-600 font-bold">
                    <Clock className="w-3.5 h-3.5 text-teal" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold uppercase text-charcoal-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-teal-dark mt-1 flex items-center gap-2">
                    <span>{lesson.subtitle}</span>
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
                  {lesson.description}
                </p>

                {/* PBL Problem Highlight */}
                {lesson.pblProblem && (
                  <div className="bg-cream border-l-4 border-pink p-3 text-xs font-sans text-charcoal-800 space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase text-pink-hover flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink" /> Kasus Nyata Problem-Based Learning:
                    </span>
                    <p className="line-clamp-2 text-charcoal-900 font-medium">
                      {lesson.pblProblem.replace('Orientasi Masalah: ', '')}
                    </p>
                  </div>
                )}

                {/* 5-Step Learning Pathway Status Bar */}
                <div className="bg-cream border border-teal/40 p-3 space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase text-teal-deep flex items-center justify-between">
                    <span>5 Tahapan Belajar:</span>
                    <span className="text-charcoal-500 text-[10px]">
                      {stages.length} dari 5 Selesai
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 font-mono text-[10px] text-center">
                    <div
                      className={`p-1 border ${
                        isPreDone ? 'bg-teal text-white border-teal-deep' : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                      }`}
                      title="Pre-test Diagnostik"
                    >
                      {isPreDone ? '✓' : '1.'} Pre
                    </div>
                    <div
                      className={`p-1 border ${
                        isOrientDone ? 'bg-teal text-white border-teal-deep' : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                      }`}
                      title="Orientasi Masalah PBL"
                    >
                      {isOrientDone ? '✓' : '2.'} Masalah
                    </div>
                    <div
                      className={`p-1 border ${
                        isSimDone ? 'bg-teal text-white border-teal-deep' : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                      }`}
                      title="Laboratorium Virtual 2D"
                    >
                      {isSimDone ? '✓' : '3.'} Lab
                    </div>
                    <div
                      className={`p-1 border ${
                        isPostDone ? 'bg-pink text-charcoal-900 border-charcoal-900 font-bold' : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                      }`}
                      title="Post-test HOTS"
                    >
                      {isPostDone ? '✓' : '4.'} Post
                    </div>
                    <div
                      className={`p-1 border ${
                        isReflectDone ? 'bg-teal text-white border-teal-deep' : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                      }`}
                      title="Jurnal Refleksi"
                    >
                      {isReflectDone ? '✓' : '5.'} Refleksi
                    </div>
                  </div>
                </div>

                {/* Objectives Preview */}
                <div className="space-y-1 font-sans text-xs">
                  <div className="text-[11px] font-mono font-bold uppercase text-charcoal-700">
                    Target Capaian Pembelajaran:
                  </div>
                  <ul className="text-charcoal-800 space-y-1 pl-2">
                    {lesson.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal font-extrabold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="pt-4 border-t border-charcoal-300 mt-4 space-y-3">
                {studentResult && (isPreDone || isPostDone) ? (
                  <div className="bg-cream border border-teal p-2.5 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-600 font-bold">Skor Pre-test:</span>
                      <span className="font-bold text-charcoal-900">{studentResult.preTestScore}%</span>
                    </div>
                    {isPostDone && (
                      <>
                        <div className="flex items-center justify-between border-t border-teal/20 pt-1">
                          <span className="text-teal-dark font-bold">Skor Post-test:</span>
                          <span className="font-extrabold text-teal-dark">{studentResult.postTestScore}%</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-teal/20 pt-1">
                          <span className="text-pink-hover font-bold flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> Normalisasi Gain (N-Gain):
                          </span>
                          <span className="font-extrabold bg-pink text-charcoal-900 px-1.5 py-0.2 border border-charcoal-900">
                            {studentResult.nGain}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-pink inline-block border border-charcoal-900" />
                    Belum Dimulai — Siap untuk Pre-test Diagnostik
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/modules/${lesson.id}`}
                    className="flex-1 kinetix-btn-primary text-xs py-2.5 px-3 text-center flex items-center justify-center gap-1.5 shadow-brutal-dark"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Kegiatan Belajar {lesson.orderNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/experiments?type=${lesson.simulationType}`}
                    className="kinetix-btn-pink text-xs py-2.5 px-3 text-center flex items-center justify-center gap-1 shadow-brutal-dark"
                    title="Buka Simulasi Laboratorium Virtual"
                  >
                    <FlaskConical className="w-4 h-4 text-charcoal-900" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
