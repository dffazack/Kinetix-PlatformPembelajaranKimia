'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Question, QuestionTestType } from '@/lib/types';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Send, Award, HelpCircle, Check, Sparkles, TrendingUp } from 'lucide-react';

interface EvaluationQuizProps {
  lessonId: string;
  lessonTitle: string;
  testType: QuestionTestType; // 'PRE_TEST' | 'POST_TEST'
  onSuccess?: () => void;
}

export default function EvaluationQuiz({ lessonId, lessonTitle, testType, onSuccess }: EvaluationQuizProps) {
  const { user } = useAuth();
  const {
    getQuestionsForLesson,
    submitPreTest,
    submitPostTest,
    getStudentResultForLesson
  } = useData();

  const questions: Question[] = getQuestionsForLesson(lessonId, testType);
  const existingResult = user ? getStudentResultForLesson(user.id, lessonId) : undefined;

  const isPreTest = testType === 'PRE_TEST';
  const initialAnswers = isPreTest
    ? existingResult?.preAnswers || {}
    : existingResult?.postAnswers || {};

  const alreadySubmitted = isPreTest
    ? (existingResult?.stagesCompleted?.includes('PRE_TEST') ?? false)
    : (existingResult?.stagesCompleted?.includes('POST_TEST') ?? false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(initialAnswers);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(alreadySubmitted);
  const [scoreData, setScoreData] = useState<{ score: number; nGain?: number } | null>(
    alreadySubmitted
      ? {
          score: isPreTest ? existingResult?.preTestScore ?? 0 : existingResult?.postTestScore ?? 0,
          nGain: isPreTest ? undefined : existingResult?.nGain,
        }
      : null
  );

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionLetter: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionLetter,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk menyimpan hasil asesmen Anda!');
      return;
    }

    if (answeredCount < total) {
      const confirmIncomplete = confirm(
        `Anda baru menjawab ${answeredCount} dari ${total} soal. Yakin ingin mengirim jawaban sekarang?`
      );
      if (!confirmIncomplete) return;
    }

    if (isPreTest) {
      const res = await submitPreTest(user.id, user.name, user.email, lessonId, selectedAnswers);
      setScoreData({ score: res.score });
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } else {
      const res = await submitPostTest(user.id, user.name, user.email, lessonId, selectedAnswers);
      setScoreData({ score: res.score, nGain: res.nGain });
      setIsSubmitted(true);

      if (res.score >= 70) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#008080', '#FF69B4', '#FFFDD0'],
        });
      }
      if (onSuccess) onSuccess();
    }
  };

  if (!currentQ && total === 0) {
    return (
      <div className="bg-cream-card border-2 border-teal p-8 text-center font-mono">
        <p>Soal {isPreTest ? 'Pre-test' : 'Post-test'} untuk modul ini belum dimuat dari database.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream-card border-3 border-teal-dark kinetix-shadow">
      {/* Top Header */}
      <div className="bg-teal text-white p-5 border-b-2 border-teal-deep flex flex-wrap items-center justify-between gap-4">
        <div>
          <span
            className={`text-[10px] font-mono uppercase px-2 py-0.5 font-bold tracking-wider inline-block mb-1 border ${
              isPreTest ? 'bg-pink text-charcoal-900 border-charcoal-900' : 'bg-cream text-charcoal-900 border-charcoal-900'
            }`}
          >
            {isPreTest ? 'Asesmen Awal (Pre-test Diagnostik)' : 'Asesmen Akhir (Post-test HOTS)'}
          </span>
          <h3 className="text-lg font-mono font-bold leading-tight">
            {lessonTitle}
          </h3>
          <p className="text-xs text-cream/90 font-mono mt-0.5">
            {isPreTest
              ? 'Tujuan: Mendiagnosis pemahaman awal & mendeteksi potensi miskonsepsi.'
              : 'Tujuan: Mengukur pencapaian Higher-Order Thinking Skills (HOTS) & N-Gain.'}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-teal-dark border border-teal-light px-3 py-1 font-bold">
            Soal {currentIndex + 1} dari {total}
          </span>
          <span className="bg-cream text-charcoal-900 px-3 py-1 font-bold border border-charcoal-900">
            Terjawab: {answeredCount}/{total}
          </span>
        </div>
      </div>

      {/* Interactive Question Grid Palette (Learning Platform Standard) */}
      <div className="bg-cream-dark/50 border-b-2 border-teal-dark p-3.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <span className="font-bold text-charcoal-700 uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 bg-pink inline-block border border-charcoal-900" />
          Nomor Soal:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isActive = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 font-bold border flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-pink text-charcoal-900 border-charcoal-900 shadow-brutal-teal-sm font-extrabold'
                    : isAnswered
                    ? 'bg-teal text-white border-teal-deep'
                    : 'bg-cream text-charcoal-700 border-charcoal-400 hover:border-charcoal-900'
                }`}
                title={`Lompat ke Soal ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Assessment Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Score & N-Gain Banner when submitted */}
        {isSubmitted && scoreData && (
          <div className="bg-cream border-2 border-teal-dark p-5 space-y-3 shadow-brutal-teal-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-teal/30 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal" />
                <span className="font-mono text-sm font-bold uppercase text-charcoal-900">
                  Hasil {isPreTest ? 'Pre-Test' : 'Post-Test'} Anda:
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-teal-dark bg-white border border-teal px-3 py-1">
                  Skor: {scoreData.score} / 100
                </span>
                {!isPreTest && scoreData.nGain !== undefined && (
                  <span className="font-mono text-xs sm:text-sm font-bold bg-pink text-charcoal-900 border border-charcoal-900 px-3 py-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    N-Gain: {scoreData.nGain}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs font-mono text-charcoal-700 leading-relaxed">
              {isPreTest ? (
                <>
                  ✅ <strong>Pre-test berhasil disimpan ke database.</strong> Tahapan{' '}
                  <span className="text-teal-dark font-bold">Orientasi Masalah & Eksplorasi (PBL)</span> kini telah
                  terbuka. Silakan amati pembahasan kunci di bawah untuk meluruskan konsepsi awal!
                </>
              ) : (
                <>
                  🎉 <strong>Post-test tuntas!</strong> Kunci jawaban dan pembahasan HOTS langsung ditampilkan di bawah.
                  Silakan lanjutkan ke <strong>Jurnal Refleksi Metakognitif</strong> untuk menyelesaikan pertemuan ini.
                </>
              )}
            </p>
          </div>
        )}

        {/* Question Header & Category Badge */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white bg-charcoal-900 px-2 py-0.5">
              Nomor {currentIndex + 1}
            </span>
            {currentQ.category && (
              <span className="font-mono text-[10px] font-bold text-teal-dark bg-teal-soft border border-teal px-2 py-0.5 uppercase">
                Kategori: {currentQ.category}
              </span>
            )}
            {isSubmitted && (
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 border ${
                  selectedAnswers[currentQ.id]?.trim().toUpperCase() === currentQ.correctAnswer.trim().toUpperCase()
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-600'
                    : 'bg-rose-100 text-rose-800 border-rose-600'
                }`}
              >
                {selectedAnswers[currentQ.id]?.trim().toUpperCase() === currentQ.correctAnswer.trim().toUpperCase()
                  ? 'Benar (+)'
                  : 'Kurang Tepat (-)'}
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-charcoal-900 font-sans leading-relaxed whitespace-pre-line">
            {currentQ.questionText}
          </h4>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options && currentQ.options.length > 0 ? (
            currentQ.options.map((opt, oIdx) => {
              const optionLetter = opt.trim().substring(0, 1).toUpperCase();
              const isSelected = selectedAnswers[currentQ.id]?.toUpperCase() === optionLetter;
              const isCorrect = isSubmitted && optionLetter === currentQ.correctAnswer.trim().toUpperCase();
              const isWrongSelected = isSubmitted && isSelected && !isCorrect;

              let optionStyle =
                'bg-cream-card border-2 border-charcoal-900 text-charcoal-900 hover:bg-cream hover:border-teal';
              if (isSelected && !isSubmitted) {
                optionStyle = 'bg-teal text-white border-2 border-teal-dark shadow-brutal-teal-sm';
              } else if (isCorrect) {
                optionStyle = 'bg-emerald-100 border-2 border-emerald-700 text-emerald-950 font-bold';
              } else if (isWrongSelected) {
                optionStyle = 'bg-rose-100 border-2 border-rose-600 text-rose-900 line-through';
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(currentQ.id, optionLetter)}
                  className={`w-full text-left p-3.5 sm:p-4 text-xs sm:text-sm font-sans transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 border shrink-0 ${
                      isSelected && !isSubmitted
                        ? 'bg-pink text-charcoal-900 border-charcoal-900'
                        : isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-800'
                        : 'bg-cream text-charcoal-900 border-charcoal-900'
                    }`}
                  >
                    {optionLetter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.replace(/^[A-D]\.\s*/, '')}</span>
                  {isCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0 self-center" />}
                  {isWrongSelected && <XCircle className="w-4 h-4 text-rose-600 shrink-0 self-center" />}
                </button>
              );
            })
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-charcoal-800">Jawaban Esai / Analisis Siswa:</label>
              <textarea
                disabled={isSubmitted}
                value={selectedAnswers[currentQ.id] || ''}
                onChange={(e) => handleSelectOption(currentQ.id, e.target.value)}
                placeholder="Tuliskan analisis ilmiah singkat Anda di sini..."
                rows={3}
                className="w-full bg-cream border-2 border-charcoal-900 p-3 text-xs font-sans focus:outline-none focus:border-teal"
              />
            </div>
          )}
        </div>

        {/* Kunci Jawaban & Pembahasan Lengkap (Muncul langsung setelah submit sesuai PRD) */}
        {isSubmitted && currentQ.explanation && (
          <div className="bg-cream-card border-2 border-teal-dark p-4.5 space-y-2 border-l-4 border-l-teal">
            <div className="flex items-center gap-1.5 text-teal-dark font-mono text-xs font-extrabold uppercase">
              <HelpCircle className="w-4 h-4 text-teal" />
              <span>Kunci Jawaban & Pembahasan Pedagogis:</span>
            </div>
            <p className="text-xs text-charcoal-800 font-sans leading-relaxed whitespace-pre-line">
              <strong>Kunci: {currentQ.correctAnswer}</strong> — {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-teal/20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              className="bg-cream border-2 border-charcoal-900 text-charcoal-900 px-3.5 py-2 text-xs font-mono font-bold hover:bg-cream-dark disabled:opacity-40 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
            </button>

            <button
              type="button"
              disabled={currentIndex === total - 1}
              onClick={() => setCurrentIndex((p) => Math.min(total - 1, p + 1))}
              className="bg-cream border-2 border-charcoal-900 text-charcoal-900 px-3.5 py-2 text-xs font-mono font-bold hover:bg-cream-dark disabled:opacity-40 flex items-center gap-1"
            >
              Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="kinetix-btn-primary text-xs py-2 px-5 flex items-center gap-1.5 shadow-brutal-dark"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Jawaban {isPreTest ? 'Pre-Test' : 'Post-Test'}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-500 px-3 py-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tersimpan di Database
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
