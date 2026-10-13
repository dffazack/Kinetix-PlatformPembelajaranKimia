'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { BookOpen, CheckCircle2, Clock, Award, ArrowRight, FlaskConical, BarChart3, User, Sparkles, TrendingUp } from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { lessons, results } = useData();

  const studentResults = user ? results.filter((r) => r.studentId === user.id) : [];
  const completedCount = studentResults.filter((r) => r.stagesCompleted?.includes('POST_TEST')).length;
  const totalModules = lessons.length;
  const completionPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const totalPostScore = studentResults.reduce((acc, curr) => acc + (curr.postTestScore ?? curr.score ?? 0), 0);
  const avgPostScore = completedCount > 0 ? Math.round(totalPostScore / completedCount) : 0;

  const totalGain = studentResults.reduce((acc, curr) => acc + (curr.nGain ?? 0), 0);
  const avgGain = completedCount > 0 ? Math.round((totalGain / completedCount) * 100) / 100 : 0;

  return (
    <div className="space-y-8">
      {/* Student Welcome Banner */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal text-white border-2 border-charcoal-900 flex items-center justify-center text-3xl font-bold shadow-brutal-dark">
              {user?.avatar || '👨‍🎓'}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase bg-pink text-charcoal-900 px-2 py-0.5 font-bold tracking-wider inline-block">
                Portal Siswa KINETIX • Pendekatan Deep Learning
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal-900 mt-1">
                Halo, {user?.name || 'Siswa Kinetix'}!
              </h1>
              <p className="text-xs font-mono text-charcoal-600">
                {user?.school || 'SMA Negeri 1'} • {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link href="/modules" className="kinetix-btn-primary py-2.5 px-4 text-xs">
              <BookOpen className="w-4 h-4" />
              Lanjutkan Belajar Pertemuan
            </Link>
          </div>
        </div>
      </div>

      {/* Progress & Stat Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-cream-card border-2 border-charcoal-900 p-5 kinetix-shadow-sm space-y-2">
          <div className="text-[10px] font-mono uppercase text-charcoal-500 font-bold">
            Progres Pertemuan Kinetika
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-mono font-extrabold text-charcoal-900">
              {completedCount} <span className="text-sm font-normal text-charcoal-500">/ {totalModules} Pertemuan</span>
            </div>
            <div className="text-sm font-mono font-bold text-teal-dark">{completionPercent}%</div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-cream-dark h-3 border border-charcoal-800">
            <div
              className="bg-teal h-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-teal/15 border-2 border-teal p-5 kinetix-shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase text-teal-deep font-bold">
            Rata-Rata Nilai Post-Test
          </div>
          <div className="text-3xl font-mono font-extrabold text-teal-deep">
            {avgPostScore} <span className="text-sm font-normal text-teal-dark">/ 100</span>
          </div>
          <p className="text-[11px] font-mono text-teal-dark">
            {avgPostScore >= 75 ? '✅ Telah melampaui KKM (75)' : '⚠️ Terus tingkatkan pada level submikroskopik'}
          </p>
        </div>

        <div className="bg-pink/20 border-2 border-pink p-5 kinetix-shadow-sm space-y-1">
          <div className="text-[10px] font-mono uppercase text-charcoal-900 font-bold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-pink-hover" />
            Rata-Rata N-Gain Score
          </div>
          <div className="text-3xl font-mono font-extrabold text-pink-hover">
            {avgGain}
          </div>
          <p className="text-[11px] font-mono text-charcoal-700">
            Peningkatan efektivitas pemahaman konsep kimia
          </p>
        </div>
      </div>

      {/* Module Roadmap & Activity List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-teal-dark pb-2">
          <h2 className="text-xl font-bold uppercase tracking-wide text-charcoal-900 font-mono">
            Rencana Belajar: Pertemuan 1 — 5 (KB 1 — KB 5)
          </h2>
          <span className="text-xs font-mono text-charcoal-600">Klik untuk masuk modul</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const result = studentResults.find((r) => r.lessonId === lesson.id);
            const stages = result?.stagesCompleted || [];
            const isCompleted = stages.includes('POST_TEST');

            return (
              <div
                key={lesson.id}
                className="bg-cream-card border-2 border-teal-dark p-5 flex flex-col justify-between kinetix-shadow-sm hover:border-charcoal-900 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-teal text-white px-2 py-0.5 uppercase">
                      Pertemuan {lesson.orderNumber}
                    </span>
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-charcoal-700 bg-cream px-2 py-0.5 border border-charcoal-400">
                          Pre: {result?.preTestScore}%
                        </span>
                        <span className="font-mono text-xs font-bold text-teal-deep bg-teal/20 px-2 py-0.5 border border-teal">
                          Post: {result?.postTestScore}%
                        </span>
                        <span className="font-mono text-xs font-bold text-charcoal-900 bg-pink px-2 py-0.5 border border-charcoal-900">
                          N-Gain: {result?.nGain}
                        </span>
                      </div>
                    ) : stages.includes('PRE_TEST') ? (
                      <span className="font-mono text-xs text-charcoal-700 bg-amber-100 border border-amber-600 px-2 py-0.5">
                        Pre-test Selesai ({result?.preTestScore}%)
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-charcoal-500 bg-cream-dark px-2 py-0.5 border border-charcoal-400">
                        Belum Dikerjakan
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base uppercase text-charcoal-900 leading-snug line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 line-clamp-2 font-sans">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-charcoal-300 mt-3">
                  <Link
                    href={`/experiments?type=${lesson.simulationType}`}
                    className="font-mono text-xs font-bold text-teal-dark hover:text-pink flex items-center gap-1"
                  >
                    <FlaskConical className="w-3.5 h-3.5" /> Virtual Lab
                  </Link>

                  <Link
                    href={`/modules/${lesson.id}`}
                    className="kinetix-btn-primary text-xs py-1.5 px-3"
                  >
                    {isCompleted ? 'Pelajari Ulang' : 'Masuk Belajar'} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
