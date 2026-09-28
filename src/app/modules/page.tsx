'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, CheckCircle2, Clock, FlaskConical, ArrowRight, Award } from 'lucide-react';

export default function ModulesPage() {
  const { lessons, results } = useData();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block bg-teal text-white px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
            Kurikulum Pembelajaran Kinetika Kimia
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900">
            Daftar Modul Kegiatan Belajar (KB 1 — KB 6)
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-sans">
            Selesaikan keenam kegiatan belajar secara berurutan untuk memperoleh pemahaman terpadu mengenai kinetika kimia, mulai dari konsep dasar hingga optimasi industri bertekanan tinggi.
          </p>
        </div>
      </div>

      {/* Grid of 6 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map(lesson => {
          const studentResult = user
            ? results.find(r => r.studentId === user.id && r.lessonId === lesson.id)
            : undefined;
          const isDone = !!studentResult;

          return (
            <div
              key={lesson.id}
              className="bg-cream-card border-2 border-teal-dark p-6 flex flex-col justify-between kinetix-shadow-sm hover:border-charcoal-900 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-300 pb-2">
                  <span className="font-mono text-xs font-bold bg-teal text-white px-2.5 py-0.5 uppercase">
                    KB {lesson.orderNumber}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-charcoal-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold uppercase text-charcoal-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-teal-dark mt-1">
                    {lesson.subtitle}
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Learning Objectives Pill List */}
                <div className="bg-cream border border-teal/30 p-3 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-teal-deep">
                    Tujuan Pembelajaran:
                  </div>
                  <ul className="text-xs text-charcoal-800 space-y-1 font-sans">
                    {lesson.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                    {lesson.objectives.length > 2 && (
                      <li className="text-[11px] font-mono text-charcoal-500 italic pl-3">
                        + {lesson.objectives.length - 2} tujuan pembelajaran lainnya...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="pt-4 border-t border-charcoal-300 mt-4 space-y-3">
                {isDone ? (
                  <div className="flex items-center justify-between text-xs font-mono bg-teal/15 border border-teal p-2">
                    <span className="flex items-center gap-1 text-teal-deep font-bold">
                      <CheckCircle2 className="w-4 h-4 text-teal" /> Evaluasi Selesai
                    </span>
                    <span className="font-extrabold text-teal-deep">
                      Skor Anda: {studentResult.score}/100
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-pink inline-block"></span>
                    Materi Interaktif, Soal Isian & 10 Soal Evaluasi
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/modules/${lesson.id}`}
                    className="kinetix-btn-primary text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Buka Pembelajaran
                  </Link>

                  <Link
                    href={`/experiments?type=${lesson.simulationType}`}
                    className="kinetix-btn-secondary text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Simulasi Terkait
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
