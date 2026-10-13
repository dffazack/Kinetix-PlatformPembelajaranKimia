'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import ContentBlockRenderer from '@/components/modules/ContentBlockRenderer';
import EvaluationQuiz from '@/components/evaluation/EvaluationQuiz';
import ReflectionJournal from '@/components/evaluation/ReflectionJournal';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  FlaskConical,
  Award,
  Lock,
  CheckCircle2,
  Brain,
  Video,
  AlertCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/lib/utils';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const {
    getLesson,
    lessons,
    isStageUnlocked,
    getStudentResultForLesson,
    completePblOrientation,
    completeSimulation,
  } = useData();

  const lessonId = params.id as string;
  const lesson = getLesson(lessonId);

  // Active step in sequence: 'pre_test' | 'orientation' | 'simulation' | 'post_test' | 'reflection'
  const [activeStep, setActiveStep] = useState<
    'pre_test' | 'orientation' | 'simulation' | 'post_test' | 'reflection'
  >('pre_test');

  const studentResult = user ? getStudentResultForLesson(user.id, lessonId) : undefined;
  const stages = studentResult?.stagesCompleted || [];

  const preTestUnlocked = true; // Always unlocked
  const orientationUnlocked = isStageUnlocked(user?.id, lessonId, 'ORIENTATION');
  const simulationUnlocked = isStageUnlocked(user?.id, lessonId, 'SIMULATION');
  const postTestUnlocked = isStageUnlocked(user?.id, lessonId, 'POST_TEST');
  const reflectionUnlocked = isStageUnlocked(user?.id, lessonId, 'REFLECTION');

  if (!lesson) {
    return (
      <div className="bg-cream-card border-3 border-teal-dark p-8 text-center space-y-4 kinetix-shadow">
        <h2 className="text-xl font-bold font-mono text-charcoal-900">Modul Tidak Ditemukan</h2>
        <p className="text-xs font-mono text-charcoal-600">ID Pertemuan / KB: {lessonId}</p>
        <Link href="/modules" className="kinetix-btn-primary text-xs">
          Kembali ke Daftar Pertemuan
        </Link>
      </div>
    );
  }

  // Find previous and next lessons
  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const handleMarkOrientationDone = async () => {
    if (user) {
      await completePblOrientation(user.id, lessonId);
      setActiveStep('simulation');
    }
  };

  const handleMarkSimulationDone = async () => {
    if (user) {
      await completeSimulation(user.id, lessonId);
      setActiveStep('post_test');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between font-mono text-xs">
        <Link
          href="/modules"
          className="text-teal-dark hover:text-pink font-bold flex items-center gap-1.5 uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Semua Pertemuan (KB 1 - 5)
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
              Pertemuan {lesson.orderNumber}
            </span>
            <span className="font-mono text-xs text-charcoal-600 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {lesson.duration}
            </span>
          </div>

          {studentResult && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="bg-cream border border-teal px-2.5 py-1">
                Pre-test: <strong>{studentResult.preTestScore}%</strong>
              </span>
              <span className="bg-teal text-white px-2.5 py-1 font-bold">
                Post-test: <strong>{studentResult.postTestScore}%</strong>
              </span>
              <span className="bg-pink text-charcoal-900 border border-charcoal-900 px-2 py-1 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> N-Gain: {studentResult.nGain}
              </span>
            </div>
          )}
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

        {/* Learning Objectives Box */}
        <div className="bg-cream p-4 border border-teal-dark/30 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-dark flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal" /> Tujuan Pembelajaran (Deep Learning Level):
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans text-charcoal-800">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono font-bold text-teal mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SEQUENCING & LOCKING STEPPER NAV */}
      <div className="bg-cream-card border-3 border-teal-dark p-3 kinetix-shadow">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-600 mb-2 px-1">
          Alur Belajar Berbasis Masalah (Sintaks PBL & Sequencing):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {/* Step 1: Pre-test */}
          <button
            type="button"
            onClick={() => setActiveStep('pre_test')}
            className={`p-2.5 border-2 text-left transition-all flex flex-col justify-between ${
              activeStep === 'pre_test'
                ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-900 border-charcoal-900 hover:bg-cream-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">1. Asesmen Awal</span>
              {stages.includes('PRE_TEST') ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-pink"></span>
              )}
            </div>
            <span className="font-bold text-[11px] mt-1">Pre-Test (10 Menit)</span>
          </button>

          {/* Step 2: Orientasi PBL */}
          <button
            type="button"
            disabled={!orientationUnlocked}
            onClick={() => setActiveStep('orientation')}
            className={`p-2.5 border-2 text-left transition-all flex flex-col justify-between ${
              !orientationUnlocked
                ? 'bg-cream-dark/50 text-charcoal-400 border-charcoal-300 cursor-not-allowed'
                : activeStep === 'orientation'
                ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-900 border-charcoal-900 hover:bg-cream-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">2. Eksplorasi PBL</span>
              {!orientationUnlocked ? (
                <Lock className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              ) : stages.includes('ORIENTATION') ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : null}
            </div>
            <span className="font-bold text-[11px] mt-1">Orientasi Masalah</span>
          </button>

          {/* Step 3: Simulation */}
          <button
            type="button"
            disabled={!simulationUnlocked}
            onClick={() => setActiveStep('simulation')}
            className={`p-2.5 border-2 text-left transition-all flex flex-col justify-between ${
              !simulationUnlocked
                ? 'bg-cream-dark/50 text-charcoal-400 border-charcoal-300 cursor-not-allowed'
                : activeStep === 'simulation'
                ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-900 border-charcoal-900 hover:bg-cream-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">3. Virtual Lab</span>
              {!simulationUnlocked ? (
                <Lock className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              ) : stages.includes('SIMULATION') ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <FlaskConical className="w-3.5 h-3.5 text-pink shrink-0" />
              )}
            </div>
            <span className="font-bold text-[11px] mt-1">Simulasi 2D</span>
          </button>

          {/* Step 4: Post-test */}
          <button
            type="button"
            disabled={!postTestUnlocked}
            onClick={() => setActiveStep('post_test')}
            className={`p-2.5 border-2 text-left transition-all flex flex-col justify-between ${
              !postTestUnlocked
                ? 'bg-cream-dark/50 text-charcoal-400 border-charcoal-300 cursor-not-allowed'
                : activeStep === 'post_test'
                ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-900 border-charcoal-900 hover:bg-cream-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">4. Asesmen Akhir</span>
              {!postTestUnlocked ? (
                <Lock className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              ) : stages.includes('POST_TEST') ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Award className="w-3.5 h-3.5 text-teal shrink-0" />
              )}
            </div>
            <span className="font-bold text-[11px] mt-1">Post-Test HOTS</span>
          </button>

          {/* Step 5: Reflection */}
          <button
            type="button"
            disabled={!reflectionUnlocked}
            onClick={() => setActiveStep('reflection')}
            className={`p-2.5 border-2 text-left transition-all flex flex-col justify-between ${
              !reflectionUnlocked
                ? 'bg-cream-dark/50 text-charcoal-400 border-charcoal-300 cursor-not-allowed'
                : activeStep === 'reflection'
                ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                : 'bg-cream text-charcoal-900 border-charcoal-900 hover:bg-cream-dark'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">5. Refleksi</span>
              {!reflectionUnlocked ? (
                <Lock className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              ) : stages.includes('REFLECTION') ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Brain className="w-3.5 h-3.5 text-teal shrink-0" />
              )}
            </div>
            <span className="font-bold text-[11px] mt-1">Jurnal Metakognitif</span>
          </button>
        </div>
      </div>

      {/* STEP CONTENT SECTION */}
      {/* 1. PRE-TEST */}
      {activeStep === 'pre_test' && (
        <div className="space-y-4">
          <EvaluationQuiz
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            testType="PRE_TEST"
            onSuccess={() => {
              // Transition to orientation once pretest is done
              setActiveStep('orientation');
            }}
          />
        </div>
      )}

      {/* 2. ORIENTASI MASALAH & EKSPLORASI PBL */}
      {activeStep === 'orientation' && (
        <div className="space-y-6">
          {!orientationUnlocked ? (
            <div className="bg-cream-card border-2 border-charcoal-900 p-8 text-center space-y-3 font-mono">
              <Lock className="w-8 h-8 text-charcoal-500 mx-auto" />
              <h3 className="font-bold text-base">Tahap Orientasi Masalah Terkunci</h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto">
                Sesuai prinsip pedagogis, Anda wajib menyelesaikan <strong>Pre-test</strong> terlebih dahulu sebelum modul orientasi masalah dan video dibuka.
              </p>
              <button
                type="button"
                onClick={() => setActiveStep('pre_test')}
                className="kinetix-btn-primary text-xs py-2 px-4"
              >
                Kembali ke Pre-Test
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Contextual PBL Problem Highlight */}
              {lesson.pblProblem && (
                <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-pink text-charcoal-900 border border-charcoal-900 font-mono text-xs font-bold px-2.5 py-0.5 uppercase">
                      Sintaks 1 PBL: Orientasi Masalah
                    </span>
                  </div>
                  <p className="text-sm font-sans font-medium text-charcoal-900 leading-relaxed">
                    {lesson.pblProblem}
                  </p>
                </div>
              )}

              {/* YouTube Video Section (Dual-Video Problem Orientation for KB 1) */}
              {lesson.id === 'kb-1' ? (
                <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-teal-dark/30 pb-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-charcoal-900">
                      <Video className="w-4 h-4 text-teal" />
                      <span>Video Orientasi Masalah: Perbandingan Kontras Laju Reaksi</span>
                    </div>
                    <span className="font-mono text-[10px] bg-pink text-charcoal-900 border border-charcoal-900 px-2 py-0.5 font-bold uppercase">
                      Problem-Based Learning
                    </span>
                  </div>

                  <p className="text-xs font-sans text-charcoal-700">
                    Bandingkan fenomena reaksi lambat pada perkaratan besi dengan fenomena reaksi sangat cepat pada ledakan partikel debu:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Video 1: Perkaratan Timelapse */}
                    <div className="space-y-2 bg-cream p-3 border-2 border-charcoal-900 shadow-brutal-teal-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-teal-dark">
                          1. Reaksi Lambat: Perkaratan (Timelapse)
                        </span>
                        <span className="font-mono text-[10px] bg-teal text-white px-1.5 py-0.5 font-bold">
                          Bulan / Tahun
                        </span>
                      </div>
                      <div className="aspect-video w-full border border-charcoal-900 bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl('https://youtu.be/vTD0h6d_H-Y?si=bVyD1eZUoyrY9A8K')}
                          title="Reaksi perkaratan (timelapse)"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* Video 2: Eksperimen Debu */}
                    <div className="space-y-2 bg-cream p-3 border-2 border-charcoal-900 shadow-brutal-pink-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-pink-hover">
                          2. Reaksi Cepat: Eksperimen Debu (Explosion)
                        </span>
                        <span className="font-mono text-[10px] bg-pink text-charcoal-900 border border-charcoal-900 px-1.5 py-0.5 font-bold">
                          Milidetik
                        </span>
                      </div>
                      <div className="aspect-video w-full border border-charcoal-900 bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl('https://youtu.be/jENpGlJ0dzA?si=FCbzypui9aYs_ifI')}
                          title="Reaksi eksperimen debu"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : lesson.videoUrl ? (
                <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-charcoal-900">
                    <Video className="w-4 h-4 text-teal" />
                    <span>Video Referensi Pembelajaran (Problem-Based Learning):</span>
                  </div>
                  <div className="aspect-video w-full border-2 border-charcoal-900 bg-black">
                    <iframe
                      src={getYouTubeEmbedUrl(lesson.videoUrl)}
                      title="Video Pembelajaran Kinetix"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : null}

              {/* Structured Material Content Blocks */}
              <div className="space-y-6">
                {lesson.contentBlocks
                  .filter((b) => lesson.id !== 'kb-1' || !['kb1-video-rust', 'kb1-video-dust'].includes(b.id))
                  .map((block) => (
                    <ContentBlockRenderer key={block.id} block={block} lessonId={lesson.id} />
                  ))}
              </div>

              {/* Mark Complete & Unlock Simulation Button */}
              <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-mono text-sm font-bold text-charcoal-900">
                    Selesai Membaca & Menyimak Video Masalah?
                  </h4>
                  <p className="font-sans text-xs text-charcoal-600">
                    Klik tombol di samping untuk membuka Laboratorium Virtual Simulasi 2D.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleMarkOrientationDone}
                  className="kinetix-btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-brutal-dark"
                >
                  <FlaskConical className="w-4 h-4" />
                  Lanjut ke Simulasi Virtual Lab →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SIMULASI VIRTUAL LAB */}
      {activeStep === 'simulation' && (
        <div className="space-y-6">
          {!simulationUnlocked ? (
            <div className="bg-cream-card border-2 border-charcoal-900 p-8 text-center space-y-3 font-mono">
              <Lock className="w-8 h-8 text-charcoal-500 mx-auto" />
              <h3 className="font-bold text-base">Laboratorium Virtual Terkunci</h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto">
                Laboratorium virtual terkunci hingga Anda menuntaskan tahapan Orientasi Masalah PBL dan menyimak video pembelajaran.
              </p>
              <button
                type="button"
                onClick={() => setActiveStep('orientation')}
                className="kinetix-btn-primary text-xs py-2 px-4"
              >
                Buka Tahap Orientasi Masalah
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-cream-card border-3 border-teal-dark p-6 kinetix-shadow flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] bg-teal text-white px-2 py-0.5 font-bold uppercase">
                    Tahap 3 PBL: Penyelidikan Mandiri & Lab 2D
                  </span>
                  <h3 className="font-mono text-lg font-bold text-charcoal-900 mt-1">
                    Eksperimen Interaktif: {lesson.subtitle}
                  </h3>
                  <p className="font-sans text-xs text-charcoal-700 mt-0.5">
                    Manipulasi variabel kinetika (konsentrasi, luas permukaan, temperatur, katalis) untuk mengamati gerak partikel mikroskopis dan laju reaksi.
                  </p>
                </div>

                <Link
                  href={`/experiments?type=${lesson.simulationType}`}
                  className="kinetix-btn-pink text-xs py-2.5 px-5 flex items-center gap-2 shadow-brutal-dark"
                >
                  <FlaskConical className="w-4 h-4" />
                  Buka Halaman Penuh Virtual Lab
                </Link>
              </div>

              {/* Complete Simulation Button to unlock Post-test */}
              <div className="bg-cream-card border-2 border-teal-dark p-5 flex flex-wrap items-center justify-between gap-4 shadow-brutal-teal-sm">
                <div className="space-y-1">
                  <h4 className="font-mono text-xs font-bold text-charcoal-900">
                    Selesai Melakukan Eksperimen & Penyelidikan Virtual?
                  </h4>
                  <p className="font-sans text-[11px] text-charcoal-600">
                    Kunci Post-test HOTS akan terbuka setelah Anda mengonfirmasi tahapan eksperimen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleMarkSimulationDone}
                  className="kinetix-btn-primary text-xs py-2 px-5 flex items-center gap-2 shadow-brutal-dark"
                >
                  <Award className="w-4 h-4" />
                  Lanjut ke Post-Test HOTS →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. POST-TEST HOTS */}
      {activeStep === 'post_test' && (
        <div className="space-y-4">
          {!postTestUnlocked ? (
            <div className="bg-cream-card border-2 border-charcoal-900 p-8 text-center space-y-3 font-mono">
              <Lock className="w-8 h-8 text-charcoal-500 mx-auto" />
              <h3 className="font-bold text-base">Asesmen Akhir (Post-Test) Terkunci</h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto">
                Selesaikan eksperimen virtual dan diskusi konsep sebelum mengerjakan soal evaluasi akhir.
              </p>
              <button
                type="button"
                onClick={() => setActiveStep('simulation')}
                className="kinetix-btn-primary text-xs py-2 px-4"
              >
                Menuju Tahap Simulasi
              </button>
            </div>
          ) : (
            <EvaluationQuiz
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              testType="POST_TEST"
              onSuccess={() => {
                setActiveStep('reflection');
              }}
            />
          )}
        </div>
      )}

      {/* 5. REFLEKSI METAKOGNITIF */}
      {activeStep === 'reflection' && (
        <div className="space-y-4">
          {!reflectionUnlocked ? (
            <div className="bg-cream-card border-2 border-charcoal-900 p-8 text-center space-y-3 font-mono">
              <Lock className="w-8 h-8 text-charcoal-500 mx-auto" />
              <h3 className="font-bold text-base">Jurnal Refleksi Terkunci</h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto">
                Silakan selesaikan <strong>Post-Test HOTS</strong> terlebih dahulu untuk membuka jurnal refleksi metakognitif.
              </p>
              <button
                type="button"
                onClick={() => setActiveStep('post_test')}
                className="kinetix-btn-primary text-xs py-2 px-4"
              >
                Menuju Post-Test
              </button>
            </div>
          ) : (
            <ReflectionJournal
              lessonId={lesson.id}
              prompts={
                lesson.reflectionPrompts && lesson.reflectionPrompts.length > 0
                  ? lesson.reflectionPrompts
                  : [
                      'Konsep baru apa yang paling mengubah pemahamanmu tentang kinetika kimia pada pertemuan ini?',
                      'Bagaimana pengalaman simulasi virtual membantumu memvisualisasikan reaksi kimia pada tingkat submikroskopik?',
                      'Kemampuan berpikir analitis apa yang berhasil kamu kembangkan selama pertemuan ini?',
                    ]
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
