'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, CheckCircle2, Clock, FlaskConical, ArrowRight, Award, Video, TrendingUp, Sparkles } from 'lucide-react';

export default function ModulesPage() {
  const { lessons, results } = useData();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block bg-teal text-white px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
            Kurikulum Kinetika Kimia (5 Pertemuan / 12 JP = 540 Menit)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900">
            Daftar Pertemuan Pembelajaran (KB 1 — KB 5)
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-sans">
            Pendekatan <strong>Problem-Based Learning (PBL)</strong> terintegrasi <strong>Deep Learning</strong> (Representasi Submikroskopik, Makroskopik, & Simbolik). Selesaikan alur belajar secara berurutan: Pre-test Diagnostik → Orientasi Masalah → Virtual Lab 2D → Post-test HOTS → Jurnal Refleksi.
          </p>
        </div>
      </div>

      {/* Grid of 5 Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => {
          const studentResult = user
            ? results.find((r) => r.studentId === user.id && r.lessonId === lesson.id)
            : undefined;
          const stages = studentResult?.stagesCompleted || [];
          const isPostDone = stages.includes('POST_TEST');
          const isReflectDone = stages.includes('REFLECTION');

          return (
            <div
              key={lesson.id}
              className="bg-cream-card border-2 border-teal-dark p-6 flex flex-col justify-between kinetix-shadow-sm hover:border-charcoal-900 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-300 pb-2">
                  <span className="font-mono text-xs font-bold bg-teal text-white px-2.5 py-0.5 uppercase">
                    Pertemuan {lesson.orderNumber}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-charcoal-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-charcoal-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-teal-dark mt-1">
                    {lesson.subtitle}
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {lesson.description}
                </p>

                {/* PBL Problem Highlight */}
                {lesson.pblProblem && (
                  <div className="bg-cream border-l-3 border-pink p-2.5 text-xs font-sans text-charcoal-800">
                    <span className="font-mono text-[10px] font-bold uppercase text-pink-hover block mb-0.5">
                      Fase 1 PBL: Orientasi Masalah:
                    </span>
                    <span className="line-clamp-2">{lesson.pblProblem.replace('Orientasi Masalah: ', '')}</span>
                  </div>
                )}

                {/* Objectives Preview */}
                <div className="bg-cream border border-teal/30 p-3 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-teal-deep flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal" /> Target Capaian:
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
                        + {lesson.objectives.length - 2} capaian kompetensi lainnya...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="pt-4 border-t border-charcoal-300 mt-4 space-y-3">
                {studentResult && (stages.includes('PRE_TEST') || isPostDone) ? (
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
                            <TrendingUp className="w-3.5 h-3.5" /> N-Gain:
                          </span>
                          <span className="font-extrabold bg-pink text-charcoal-900 px-1.5 py-0.2">
                            {studentResult.nGain}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-charcoal-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-charcoal-400"></span>
                    Belum Dikerjakan (Mulai dengan Pre-test)
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/modules/${lesson.id}`}
                    className="flex-1 kinetix-btn-primary text-xs py-2 px-3 text-center flex items-center justify-center gap-1.5 shadow-brutal-dark"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Masuk Pertemuan (KB {lesson.orderNumber})</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/experiments?type=${lesson.simulationType}`}
                    className="kinetix-btn-pink text-xs py-2 px-3 text-center flex items-center justify-center gap-1 shadow-brutal-dark"
                    title="Buka Simulasi Virtual Lab"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
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
