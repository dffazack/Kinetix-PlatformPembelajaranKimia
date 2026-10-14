'use client';

import React, { useState, useEffect } from 'react';
import { ContentBlock } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Send, CheckCircle2, PenLine } from 'lucide-react';

interface ParagraphEssayBlockProps {
  block: ContentBlock;
  lessonId: string;
}

export default function ParagraphEssayBlock({ block, lessonId }: ParagraphEssayBlockProps) {
  const { user } = useAuth();
  const { submitParagraphAnswer, getParagraphAnswer } = useData();

  const saved = user ? getParagraphAnswer(user.id, lessonId, block.id) : '';
  const [answer, setAnswer] = useState<string>(saved);
  const [submitted, setSubmitted] = useState<boolean>(!!saved);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Sync if saved value changes (e.g. after data reload)
  useEffect(() => {
    if (saved && !answer) {
      setAnswer(saved);
      setSubmitted(true);
    }
  }, [saved]);

  const handleSubmit = async () => {
    if (!user || !answer.trim()) return;
    setIsSaving(true);
    await submitParagraphAnswer(user.id, user.name, user.email, lessonId, block.id, answer.trim());
    setIsSaving(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-5 space-y-4 kinetix-shadow-sm">
      {/* Header badge */}
      <div className="flex items-center gap-2 border-b border-teal-dark/30 pb-2">
        <div className="bg-pink text-charcoal-900 border border-charcoal-900 p-1">
          <PenLine className="w-4 h-4" />
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-pink-hover">
          Soal Isian Paragraf (Essay Terbuka)
        </span>
      </div>

      {/* Question prompt */}
      <p className="text-sm font-sans font-semibold text-charcoal-900 leading-relaxed">
        {block.content}
      </p>

      {/* Answer area */}
      {!submitted ? (
        <div className="space-y-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="Tuliskan jawabanmu secara lengkap di sini..."
            className="w-full bg-cream border-2 border-charcoal-400 p-3 font-sans text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-teal resize-y"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!answer.trim() || isSaving}
              className="kinetix-btn-pink text-xs py-2 px-5 flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Kirim Jawaban'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-emerald-50 border-2 border-emerald-500 p-3 flex items-center gap-2 font-mono text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Jawaban berhasil dikirim dan disimpan di sistem!
          </div>
          <div className="bg-cream border border-charcoal-300 p-3 text-sm font-sans text-charcoal-800 italic leading-relaxed whitespace-pre-line">
            &quot;{answer}&quot;
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono font-bold text-teal-dark hover:text-pink underline"
          >
            Edit Jawaban
          </button>
        </div>
      )}

      {!user && (
        <p className="text-xs font-mono text-charcoal-500 italic">
          Login sebagai siswa untuk mengirimkan jawaban.
        </p>
      )}
    </div>
  );
}
