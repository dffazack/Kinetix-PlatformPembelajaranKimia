'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Question } from '@/lib/types';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Send, Award, RefreshCw, BookOpen } from 'lucide-react';

interface EvaluationQuizProps {
  lessonId: string;
  lessonTitle: string;
  onClose?: () => void;
}

export default function EvaluationQuiz({ lessonId, lessonTitle, onClose }: EvaluationQuizProps) {
  const { user } = useAuth();
  const { getQuestionsForLesson, submitEvaluation, getStudentResultForLesson } = useData();

  const questions: Question[] = getQuestionsForLesson(lessonId);
  const existingResult = user ? getStudentResultForLesson(user.id, lessonId) : undefined;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    existingResult?.mcAnswers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!existingResult);
  const [scoreResult, setScoreResult] = useState<{ score: number; correctCount: number; total: number; feedback?: string } | null>(
    existingResult
      ? { score: existingResult.score, correctCount: existingResult.correctCount, total: existingResult.totalQuestions, feedback: existingResult.feedback }
      : null
  );

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionLetter: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter,
    }));
  };

  const handleSubmit = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk menyimpan nilai evaluasi!');
      return;
    }

    const res = submitEvaluation(
      user.id,
      user.name,
      user.email,
      lessonId,
      selectedAnswers,
      {}
    );

    setScoreResult({
      score: res.score,
      correctCount: res.correctCount,
      total: res.total,
      feedback: res.result.feedback,
    });
    setIsSubmitted(true);

    if (res.score >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#008080', '#FF69B4', '#FFFDD0'],
      });
    }
  };

  const handleRetake = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setScoreResult(null);
  };

  if (!currentQ && total === 0) {
    return (
      <div className="bg-cream-card border-2 border-teal p-8 text-center font-mono">
        <p>Soal evaluasi untuk modul ini belum dimuat.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream-card border-2 border-teal-dark kinetix-shadow">
      {/* Top Header */}
      <div className="bg-teal text-white p-5 border-b-2 border-teal-deep flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase bg-pink text-charcoal-900 px-2 py-0.5 font-bold tracking-wider inline-block mb-1">
            Evaluasi Mandiri (10 Soal Pilihan Ganda)
          </span>
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
            {lessonTitle}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-cream/90 bg-teal-dark border border-teal-light px-3 py-1.5">
            Terjawab: <strong>{answeredCount}</strong> / {total}
          </div>
        </div>
      </div>

      {/* Main Assessment Body */}
      <div className="p-6 space-y-6">
        {/* If Submitted: Show Score Overview Banner */}
        {isSubmitted && scoreResult && (
          <div className="bg-cream border-2 border-charcoal-900 p-5 kinetix-shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-300 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink border-2 border-charcoal-900 flex items-center justify-center font-bold text-xl text-charcoal-900 shadow-brutal-dark">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-charcoal-600">Nilai Akhir Evaluasi</div>
                  <div className="text-3xl font-mono font-extrabold text-teal-dark">
                    {scoreResult.score} <span className="text-base text-charcoal-500 font-normal">/ 100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="bg-teal/15 border border-teal p-2">
                  Benar: <strong>{scoreResult.correctCount}</strong>
                </div>
                <div className="bg-pink/20 border border-pink p-2">
                  Salah: <strong>{scoreResult.total - scoreResult.correctCount}</strong>
                </div>
                <button onClick={handleRetake} className="kinetix-btn-secondary text-xs py-2 px-3">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ulangi Kuis
                </button>
              </div>
            </div>

            <p className="text-sm font-sans font-medium text-charcoal-800">
              <strong>Catatan Evaluasi:</strong> {scoreResult.feedback}
            </p>
          </div>
        )}

        {/* Question Selector Quick Bar */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-charcoal-300 pb-4">
          {questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isCurrent = idx === currentIndex;
            const isCorrectAnswer =
              isSubmitted && selectedAnswers[q.id]?.toUpperCase() === q.correctAnswer.toUpperCase();

            let btnStyle = 'bg-cream text-charcoal-800 border-charcoal-400';
            if (isCurrent) {
              btnStyle = 'bg-teal text-white border-teal-deep ring-2 ring-pink';
            } else if (isSubmitted) {
              btnStyle = isCorrectAnswer
                ? 'bg-teal/20 text-teal-dark border-teal font-bold'
                : 'bg-pink/20 text-pink-hover border-pink font-bold';
            } else if (isAnswered) {
              btnStyle = 'bg-cream-dark text-teal-dark border-teal font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 font-mono text-xs font-bold border-2 transition-all flex items-center justify-center ${btnStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Current Question Display */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs font-bold text-teal-dark uppercase tracking-wider">
              Pertanyaan #{currentIndex + 1} dari {total}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-charcoal-900 leading-snug font-sans">
            {currentQ.questionText}
          </h4>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options?.map((opt, oIdx) => {
              const letter = opt.substring(0, 1).toUpperCase();
              const isSelected = selectedAnswers[currentQ.id]?.toUpperCase() === letter;
              const isCorrect = currentQ.correctAnswer.toUpperCase() === letter;

              let optionBoxStyle = 'bg-cream border-charcoal-400 hover:border-teal';
              if (isSelected && !isSubmitted) {
                optionBoxStyle = 'bg-teal/15 border-teal text-teal-deep font-bold shadow-brutal-teal-sm';
              } else if (isSubmitted) {
                if (isCorrect) {
                  optionBoxStyle = 'bg-teal/20 border-teal text-teal-deep font-bold';
                } else if (isSelected && !isCorrect) {
                  optionBoxStyle = 'bg-pink/25 border-pink text-charcoal-900 font-bold';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, letter)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 border-2 transition-all flex items-center justify-between text-xs sm:text-sm font-sans ${optionBoxStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 border font-mono font-bold text-xs flex items-center justify-center ${
                        isSelected
                          ? 'bg-teal text-white border-teal-dark'
                          : 'bg-cream-card text-charcoal-700 border-charcoal-400'
                      }`}
                    >
                      {letter}
                    </span>
                    <span>{opt.substring(3)}</span>
                  </div>

                  {isSubmitted && isCorrect && (
                    <span className="flex items-center gap-1 text-teal font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Kunci Jawaban
                    </span>
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <span className="flex items-center gap-1 text-pink-hover font-mono text-xs font-bold">
                      <XCircle className="w-4 h-4" /> Jawaban Anda
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="bg-cream border-l-4 border-teal p-4 space-y-1 text-xs font-mono text-charcoal-800">
              <div className="font-bold text-teal-dark flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Pembahasan Ilmiah:
              </div>
              <p className="leading-relaxed font-sans">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Bottom Pagination & Submit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-charcoal-300">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="kinetix-btn-secondary text-xs disabled:opacity-40"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Soal Sebelumnya
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < total - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(total - 1, prev + 1))}
                className="kinetix-btn-secondary text-xs"
              >
                Soal Berikutnya <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < total}
                className="kinetix-btn-primary text-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                KIRIM JAWABAN ({answeredCount}/{total})
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
