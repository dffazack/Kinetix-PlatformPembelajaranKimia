'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Send, CheckCircle2, BookOpen, Brain, Sparkles } from 'lucide-react';

interface ReflectionJournalProps {
  lessonId: string;
  prompts: string[];
}

export default function ReflectionJournal({ lessonId, prompts }: ReflectionJournalProps) {
  const { user } = useAuth();
  const { submitReflection, getStudentResultForLesson } = useData();

  const existingResult = user ? getStudentResultForLesson(user.id, lessonId) : undefined;
  const initialAnswers = existingResult?.reflectionAnswers || {};
  const alreadySaved = existingResult?.stagesCompleted?.includes('REFLECTION') ?? false;

  const [answers, setAnswers] = useState<Record<number, string>>(initialAnswers);
  const [isSaved, setIsSaved] = useState<boolean>(alreadySaved);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTextChange = (idx: number, val: string) => {
    if (isSaved) return;
    setAnswers((prev) => ({
      ...prev,
      [idx]: val,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Silakan login terlebih dahulu untuk menyimpan refleksi metakognitif Anda!');
      return;
    }

    setIsSubmitting(true);
    await submitReflection(user.id, lessonId, answers);
    setIsSaved(true);
    setIsSubmitting(false);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#008080', '#FF69B4', '#FAF7E1'],
    });
  };

  return (
    <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow space-y-6">
      <div className="border-b-2 border-teal-dark pb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-pink text-charcoal-900 border border-charcoal-900 px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
            <Brain className="w-3.5 h-3.5" />
            <span>Tahap 4 PBL: Metakognisi & Refleksi Diri</span>
          </div>
          <h3 className="text-xl font-bold font-mono text-charcoal-900">
            Jurnal Refleksi Metakognitif
          </h3>
          <p className="text-xs text-charcoal-600 font-sans">
            Tuliskan hasil perenungan dan pemahaman konseptual Anda untuk melatih kemampuan berpikir kritis dan evaluasi diri.
          </p>
        </div>

        {isSaved && (
          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-600 px-3 py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Refleksi Tersimpan di Database
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {prompts.map((prompt, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-xs sm:text-sm font-mono font-bold text-charcoal-900 leading-snug">
              <span className="bg-teal text-white px-2 py-0.5 mr-2">Pertanyaan {idx + 1}</span>
              {prompt}
            </label>
            <textarea
              rows={3}
              disabled={isSaved}
              value={answers[idx] || ''}
              onChange={(e) => handleTextChange(idx, e.target.value)}
              placeholder="Tuliskan refleksi kritis dan pemahaman Anda secara mendalam..."
              required
              className="w-full bg-cream border-2 border-charcoal-900 p-3.5 text-xs sm:text-sm font-sans text-charcoal-900 focus:outline-none focus:border-teal transition-colors disabled:bg-cream-dark/50"
            />
          </div>
        ))}

        <div className="pt-2 flex items-center justify-between">
          <p className="text-[11px] font-mono text-charcoal-500">
            * Jawaban jurnal refleksi ini dapat dibaca oleh Guru Pengampu pada dashboard rekap nilai.
          </p>

          {!isSaved ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="kinetix-btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-brutal-dark disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Menyimpan ke Database...' : 'Simpan Refleksi'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsSaved(false)}
              className="bg-cream border border-charcoal-900 px-3 py-1 text-xs font-mono font-bold hover:bg-cream-dark"
            >
              Edit Kembali Jawaban
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
