'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { ContentBlock } from '@/lib/types';
import { CheckCircle2, XCircle, Lightbulb, Save, Sparkles } from 'lucide-react';

interface FillBlankBlockProps {
  block: ContentBlock;
}

export default function FillBlankBlock({ block }: FillBlankBlockProps) {
  const { user } = useAuth();
  const { saveFillBlankAnswer, getFillBlankAnswer } = useData();

  const blankId = block.metadata?.blankId || block.id;
  const studentId = user?.id || 'guest';

  const [inputVal, setInputVal] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Load saved answer from context / storage
  useEffect(() => {
    const saved = getFillBlankAnswer(studentId, blankId);
    if (saved) {
      setInputVal(saved);
      setIsSaved(true);
    }
  }, [studentId, blankId, getFillBlankAnswer]);

  const handleInputChange = (val: string) => {
    setInputVal(val);
    setIsChecked(false);
    setIsSaved(false);
    // Autosave to storage
    saveFillBlankAnswer(studentId, blankId, val);
  };

  const handleManualSave = () => {
    saveFillBlankAnswer(studentId, blankId, inputVal);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCheckAnswer = () => {
    if (!inputVal.trim()) return;

    const acceptable = block.metadata?.acceptableAnswers || [block.metadata?.correctAnswer || ''];
    const cleanInput = inputVal.trim().toLowerCase().replace(/\s+/g, ' ');

    const match = acceptable.some(
      ans => ans.trim().toLowerCase().replace(/\s+/g, ' ') === cleanInput
    );

    setIsCorrect(match);
    setIsChecked(true);
    saveFillBlankAnswer(studentId, blankId, inputVal);
  };

  // Parse prompt text with [blank] placeholder
  const parts = block.content.split('[blank]');

  return (
    <div className="bg-cream-card border-2 border-teal p-5 space-y-4 kinetix-shadow">
      <div className="flex items-center justify-between border-b border-teal/30 pb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-deep">
          <Sparkles className="w-3.5 h-3.5 text-pink" />
          Aktivitas Mandiri: Soal Isian (Fill-in-the-Blank)
        </span>
        <span className="text-[11px] font-mono text-charcoal-500">
          Autosave Aktif
        </span>
      </div>

      {/* Question prompt with embedded input field */}
      <div className="text-sm text-charcoal-900 leading-relaxed font-sans font-medium">
        {parts[0]}
        <span className="inline-block mx-1">
          <input
            type="text"
            value={inputVal}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="Ketik jawaban..."
            className="bg-cream border-2 border-teal-dark px-2.5 py-1 text-xs font-mono font-bold text-teal-deep focus:outline-none focus:border-pink min-w-[140px] max-w-[200px]"
          />
        </span>
        {parts[1]}
      </div>

      {/* Actions and Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheckAnswer}
            disabled={!inputVal.trim()}
            className="kinetix-btn-primary text-xs py-1.5 px-3 disabled:opacity-50"
          >
            Periksa Jawaban
          </button>

          {block.metadata?.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="kinetix-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
            >
              <Lightbulb className="w-3.5 h-3.5 text-pink-hover" />
              {showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}
            </button>
          )}

          {isSaved && (
            <span className="text-xs font-mono text-teal flex items-center gap-1">
              <Save className="w-3.5 h-3.5" /> Tersimpan!
            </span>
          )}
        </div>

        {/* Verification Alert Badge */}
        {isChecked && (
          <div
            className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 border-2 ${
              isCorrect
                ? 'bg-teal/20 text-teal-deep border-teal'
                : 'bg-pink/20 text-charcoal-900 border-pink'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>BENAR! Jawaban Anda Tepat.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-pink-hover" />
                <span>BELUM TEPAT. Coba hitung/pikirkan kembali.</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hint Accordion */}
      {showHint && block.metadata?.hint && (
        <div className="bg-cream border-l-4 border-pink p-3 text-xs font-mono text-charcoal-800">
          <strong>💡 Petunjuk Guru:</strong> {block.metadata.hint}
        </div>
      )}
    </div>
  );
}
