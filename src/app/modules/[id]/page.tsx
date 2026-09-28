'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import ContentBlockRenderer from '@/components/modules/ContentBlockRenderer';
import EvaluationQuiz from '@/components/evaluation/EvaluationQuiz';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Target, FlaskConical, Award } from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getLesson, lessons } = useData();

  const lessonId = params.id as string;
  const lesson = getLesson(lessonId);

  const [activeTab, setActiveTab] = useState<'material' | 'evaluation'>('material');

  if (!lesson) {
    return (
      <div className="bg-cream-card border-3 border-teal-dark p-8 text-center space-y-4 kinetix-shadow">
        <h2 className="text-xl font-bold font-mono text-charcoal-900">Modul Tidak Ditemukan</h2>
        <p className="text-xs font-mono text-charcoal-600">ID Modul: {lessonId}</p>
        <Link href="/modules" className="kinetix-btn-primary text-xs">
          Kembali ke Daftar Modul
        </Link>
      </div>
    );
  }

  // Find previous and next lessons
  const currentIndex = lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between font-mono text-xs">
        <Link
          href="/modules"
          className="text-teal-dark hover:text-pink font-bold flex items-center gap-1.5 uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Semua Modul
        </Link>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <Link
              href={`/modules/${prevLesson.id}`}
              className="bg-cream-card border border-teal-dark px-2.5 py-1 hover:bg-cream"
            >
              ← KB {prevLesson.orderNumber}
            </Link>
          )}
          {nextLesson && (
            <Link
              href={`/modules/${nextLesson.id}`}
              className="bg-cream-card border border-teal-dark px-2.5 py-1 hover:bg-cream"
            >
              KB {nextLesson.orderNumber} →
            </Link>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-teal-dark pb-3">
          <div className="flex items-center gap-2">
            <span className="bg-teal text-white font-mono font-bold text-xs px-2.5 py-1 uppercase">
              KB {lesson.orderNumber}
            </span>
            <span className="font-mono text-xs text-charcoal-600 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {lesson.duration}
            </span>
          </div>

          {/* Quick link to associated simulation */}
          <Link
            href={`/experiments?type=${lesson.simulationType}`}
            className="kinetix-btn-pink text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Buka Simulasi Eksperimen KB Ini
          </Link>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900 leading-tight">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base font-mono font-bold text-teal-dark mt-1">
            {lesson.subtitle}
          </p>
        </div>

        <p className="text-sm text-charcoal-700 leading-relaxed font-sans">
          {lesson.description}
        </p>

        {/* Objectives Box */}
        <div className="bg-cream border-2 border-teal/40 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-teal-deep">
            <Target className="w-4 h-4 text-teal" />
            Tujuan Pembelajaran Khusus (Indikator Ketercapaian)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-charcoal-800 font-sans">
            {lesson.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-teal font-extrabold font-mono">[{i + 1}]</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Materi Belajar vs Evaluasi 10 Soal */}
      <div className="flex border-b-3 border-teal-dark">
        <button
          onClick={() => setActiveTab('material')}
          className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-b-0 transition-all flex items-center gap-2 ${
            activeTab === 'material'
              ? 'bg-cream-card text-charcoal-900 border-teal-dark -mb-[3px] z-10'
              : 'bg-cream text-charcoal-600 border-transparent hover:text-teal-dark'
          }`}
        >
          <BookOpen className="w-4 h-4 text-teal" />
          Materi Pembelajaran & Soal Isian
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-b-0 transition-all flex items-center gap-2 ${
            activeTab === 'evaluation'
              ? 'bg-cream-card text-charcoal-900 border-teal-dark -mb-[3px] z-10'
              : 'bg-cream text-charcoal-600 border-transparent hover:text-teal-dark'
          }`}
        >
          <Award className="w-4 h-4 text-pink-hover" />
          Evaluasi Asesmen (10 Soal PG)
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'material' ? (
        <div className="space-y-8">
          {/* Content Blocks */}
          <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow space-y-6">
            {lesson.contentBlocks.map(block => (
              <ContentBlockRenderer key={block.id} block={block} lessonId={lesson.id} />
            ))}
          </div>

          {/* End of Material Prompt leading to Assessment */}
          <div className="bg-teal text-white border-3 border-charcoal-900 p-6 sm:p-8 kinetix-shadow-dark flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase bg-pink text-charcoal-900 px-2 py-0.5 font-bold tracking-wider inline-block">
                Langkah Terakhir: Asesmen Pemahaman
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
                Siap Menguji Penguasaan Materi KB {lesson.orderNumber}?
              </h3>
              <p className="text-xs sm:text-sm text-cream/90 font-sans leading-relaxed">
                Kerjakan 10 soal pilihan ganda evaluasi mandiri. Nilai akan langsung muncul beserta kunci jawaban dan pembahasan ilmiah.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('evaluation')}
              className="kinetix-btn-pink text-sm py-3 px-6 shadow-brutal-dark"
            >
              <Award className="w-4 h-4" />
              Buka Soal Evaluasi Sekarang
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Tab */
        <EvaluationQuiz
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          onClose={() => setActiveTab('material')}
        />
      )}
    </div>
  );
}
