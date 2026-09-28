'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Atom, BookOpen, FlaskConical, Award, ArrowRight, CheckCircle2, Shield, Sparkles, Activity, Layers } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { lessons, results } = useData();

  const isTeacher = user?.role === 'TEACHER';

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-cream-card border-3 border-teal-dark p-6 sm:p-10 kinetix-shadow relative overflow-hidden">
        {/* Background Accent Grid / Badge */}
        <div className="absolute top-4 right-4 hidden sm:block">
          <span className="font-mono text-xs font-bold uppercase bg-teal text-white px-3 py-1 border border-teal-deep">
            Versi Kurikulum Kinetika 2026
          </span>
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink/20 border-2 border-pink px-3 py-1 font-mono text-xs font-bold text-charcoal-900">
            <Sparkles className="w-4 h-4 text-pink-hover" />
            <span>PLATFORM PEMBELAJARAN KIMIA INTERAKTIF</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-charcoal-900 leading-none">
            REKAYASA LAJU REAKSI DENGAN <span className="text-teal-dark">KINETIX.</span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-sans font-normal">
            Kuasai konsep kinetika kimia secara mendalam melalui <strong>6 Modul Kegiatan Belajar (KB 1 - KB 6)</strong>, laboratorium simulasi partikel mikroskopis 2D, analisis data eksperimen riil, dan asesmen otomatis terpadu.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/modules" className="kinetix-btn-primary text-sm py-3 px-6 shadow-brutal-dark">
              <BookOpen className="w-4 h-4" />
              JELAJAHI MODUL (KB 1 - 6)
            </Link>

            <Link href="/experiments" className="kinetix-btn-pink text-sm py-3 px-6 shadow-brutal-dark">
              <FlaskConical className="w-4 h-4" />
              LABORATORIUM VIRTUAL
            </Link>

            {isTeacher ? (
              <Link href="/teacher/dashboard" className="kinetix-btn-secondary text-sm py-3 px-6">
                <Shield className="w-4 h-4 text-teal" />
                PANEL REKAP NILAI GURU
              </Link>
            ) : (
              <Link href="/student/dashboard" className="kinetix-btn-secondary text-sm py-3 px-6">
                <Award className="w-4 h-4 text-teal" />
                STATUS PROGRES SAYA
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 6 Kegiatan Belajar (KB 1 - 6) Showcase Cards */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-3 border-teal-dark pb-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-teal-dark tracking-wider block">
              Kurikulum Lengkap Kinetika Kimia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-charcoal-900">
              6 Kegiatan Belajar (KB) Terstruktur
            </h2>
          </div>
          <Link href="/modules" className="font-mono text-xs font-bold text-teal-dark hover:text-pink flex items-center gap-1 uppercase">
            Lihat Semua Modul <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map(lesson => {
            const hasCompleted = user
              ? results.some(r => r.studentId === user.id && r.lessonId === lesson.id)
              : false;
            const studentResult = user
              ? results.find(r => r.studentId === user.id && r.lessonId === lesson.id)
              : undefined;

            return (
              <div
                key={lesson.id}
                className="bg-cream-card border-2 border-teal-dark p-6 flex flex-col justify-between kinetix-shadow-hover relative"
              >
                {/* Header badge */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold bg-teal text-white px-2 py-0.5 uppercase">
                      KB {lesson.orderNumber}
                    </span>
                    <span className="font-mono text-[11px] text-charcoal-500 font-bold">
                      {lesson.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold uppercase text-charcoal-900 leading-snug line-clamp-1 mb-1">
                    {lesson.title.replace(/^KB \d+: /, '')}
                  </h3>
                  <div className="text-xs font-mono font-bold text-teal-dark mb-3">
                    {lesson.subtitle}
                  </div>

                  <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
                    {lesson.description}
                  </p>
                </div>

                {/* Bottom details & action */}
                <div className="space-y-4 pt-3 border-t border-charcoal-300">
                  {hasCompleted && studentResult ? (
                    <div className="flex items-center justify-between text-xs font-mono bg-teal/15 border border-teal p-2">
                      <span className="flex items-center gap-1 text-teal-deep font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" /> Selesai Dievaluasi
                      </span>
                      <span className="font-extrabold text-teal-deep">
                        Skor: {studentResult.score}/100
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-pink inline-block"></span>
                      10 Soal Asesmen + Eksperimen
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/modules/${lesson.id}`}
                      className="kinetix-btn-primary text-xs py-2 text-center"
                    >
                      Buka Modul
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

      {/* Feature Highlights Grid */}
      <section className="bg-cream-card border-3 border-charcoal-900 p-8 kinetix-shadow-dark space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-charcoal-900 border-b-2 border-charcoal-900 pb-3">
          Mengapa Belajar di Platform KINETIX?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="bg-cream border-2 border-teal p-5 space-y-3">
            <div className="w-10 h-10 bg-teal text-white flex items-center justify-center font-bold font-mono">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-charcoal-900">
              Laboratorium Virtual Interaktif
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed font-mono">
              Atur langsung variabel Konsentrasi, Suhu, Luas Permukaan, dan Katalis. Amati pergerakan tabung gas syringe, tumbukan partikel 2D, dan kurva laju real-time.
            </p>
          </div>

          <div className="bg-cream border-2 border-pink p-5 space-y-3">
            <div className="w-10 h-10 bg-pink text-charcoal-900 border border-charcoal-900 flex items-center justify-center font-bold font-mono">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-charcoal-900">
              Asesmen & Auto-Grading Cepat
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed font-mono">
              10 Soal Pilihan Ganda berkualitas per KB dengan penilaian instan dan pembahasan ilmiah mendalam, serta soal isian (fill-in-the-blank) berfitur autosave.
            </p>
          </div>

          <div className="bg-cream border-2 border-charcoal-900 p-5 space-y-3">
            <div className="w-10 h-10 bg-charcoal-900 text-cream flex items-center justify-center font-bold font-mono">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-charcoal-900">
              Portal Guru & Dynamic Editor
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed font-mono">
              Guru dapat memantau rekap nilai seluruh siswa, mengekspor laporan ke CSV, serta memodifikasi dan menyusun blok konten materi KB secara dinamis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
