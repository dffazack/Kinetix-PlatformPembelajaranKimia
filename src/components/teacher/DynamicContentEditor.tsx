'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Lesson, ContentBlock, ContentBlockType } from '@/lib/types';
import { Plus, Trash2, Edit3, Save, Eye, MoveUp, MoveDown, Layers, FileText, FlaskConical, AlertCircle, Check } from 'lucide-react';

interface DynamicContentEditorProps {
  lesson: Lesson;
}

export default function DynamicContentEditor({ lesson }: DynamicContentEditorProps) {
  const { updateLesson } = useData();

  const [activeBlocks, setActiveBlocks] = useState<ContentBlock[]>(lesson.contentBlocks);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // New block form state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newType, setNewType] = useState<ContentBlockType>('text');
  const [newContent, setNewContent] = useState<string>('');
  const [newCaption, setNewCaption] = useState<string>('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<string>('');
  const [newHint, setNewHint] = useState<string>('');
  const [newExpType, setNewExpType] = useState<string>('FACTORS_REACTION');
  const [newBtnLabel, setNewBtnLabel] = useState<string>('Buka Laboratorium Virtual');

  const handleSaveAll = () => {
    const updated: Lesson = {
      ...lesson,
      contentBlocks: activeBlocks,
    };
    updateLesson(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDeleteBlock = (blockId: string) => {
    const updated = activeBlocks.filter(b => b.id !== blockId);
    setActiveBlocks(updated);
    const updatedLesson: Lesson = { ...lesson, contentBlocks: updated };
    updateLesson(updatedLesson);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === activeBlocks.length - 1)) {
      return;
    }
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const copy = [...activeBlocks];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setActiveBlocks(copy);
    updateLesson({ ...lesson, contentBlocks: copy });
  };

  const handleAddNewBlock = () => {
    if (!newContent.trim()) return;

    const blockId = `block-${Date.now()}`;
    const newBlock: ContentBlock = {
      id: blockId,
      type: newType,
      content: newContent,
      metadata: {},
    };

    if (newType === 'callout') {
      newBlock.metadata = { variant: 'info' };
    } else if (newType === 'equation') {
      newBlock.metadata = { caption: newCaption };
    } else if (newType === 'fill_blank') {
      newBlock.metadata = {
        blankId: `blank-${Date.now()}`,
        correctAnswer: newCorrectAnswer,
        acceptableAnswers: [newCorrectAnswer],
        hint: newHint,
      };
    } else if (newType === 'experiment_cta') {
      newBlock.metadata = {
        experimentType: newExpType,
        buttonLabel: newBtnLabel,
      };
    }

    const updated = [...activeBlocks, newBlock];
    setActiveBlocks(updated);
    updateLesson({ ...lesson, contentBlocks: updated });

    // Reset modal form
    setNewContent('');
    setNewCaption('');
    setNewCorrectAnswer('');
    setNewHint('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase bg-teal text-white px-2 py-0.5 font-bold tracking-wider inline-block mb-1">
            Dynamic Content Editor (CRUD KB)
          </span>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Kelola Konten: {lesson.title}
          </h3>
          <p className="text-xs text-charcoal-600 font-mono">
            {activeBlocks.length} Blok Konten Aktif Terkonfigurasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddModal(true)} className="kinetix-btn-pink text-xs">
            <Plus className="w-4 h-4" />
            TAMBAH BLOK KONTEN
          </button>
          <button onClick={handleSaveAll} className="kinetix-btn-primary text-xs">
            <Save className="w-4 h-4" />
            SIMPAN PERUBAHAN
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="bg-teal/20 border-2 border-teal p-3 text-xs font-mono font-bold text-teal-deep flex items-center gap-2">
          <Check className="w-4 h-4 text-teal" /> Perubahan konten berhasil disimpan ke sistem!
        </div>
      )}

      {/* Content Blocks List */}
      <div className="space-y-4">
        {activeBlocks.map((block, idx) => (
          <div
            key={block.id}
            className="bg-cream border-2 border-charcoal-400 p-4 space-y-3 transition-all hover:border-teal"
          >
            <div className="flex items-center justify-between border-b border-charcoal-300 pb-2">
              <div className="flex items-center gap-2">
                <span className="bg-charcoal-900 text-cream font-mono font-bold text-[10px] px-2 py-0.5 uppercase">
                  #{idx + 1}
                </span>
                <span className="bg-teal text-white font-mono font-bold text-[10px] px-2 py-0.5 uppercase">
                  {block.type.toUpperCase()}
                </span>
              </div>

              {/* Ordering and Delete buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMoveBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 border border-charcoal-400 hover:bg-cream-dark disabled:opacity-30"
                  title="Pindah ke atas"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveBlock(idx, 'down')}
                  disabled={idx === activeBlocks.length - 1}
                  className="p-1 border border-charcoal-400 hover:bg-cream-dark disabled:opacity-30"
                  title="Pindah ke bawah"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  className="p-1 border border-charcoal-900 bg-pink text-charcoal-900 hover:bg-cream transition-colors ml-2"
                  title="Hapus blok konten"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Block Content preview or edit textarea */}
            <div className="text-xs font-mono">
              <textarea
                value={block.content}
                onChange={e => {
                  const val = e.target.value;
                  setActiveBlocks(prev =>
                    prev.map(b => (b.id === block.id ? { ...b, content: val } : b))
                  );
                }}
                rows={block.type === 'heading' ? 1 : 3}
                className="w-full bg-cream-card border border-charcoal-400 p-2 font-mono text-xs focus:outline-none focus:border-teal"
              />
            </div>

            {/* If block is fill_blank or experiment_cta, show metadata inputs */}
            {block.type === 'fill_blank' && (
              <div className="grid grid-cols-2 gap-3 bg-cream-card border border-teal/40 p-2 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-charcoal-600 block">Kunci Jawaban Isian:</label>
                  <input
                    type="text"
                    value={block.metadata?.correctAnswer || ''}
                    onChange={e => {
                      const ans = e.target.value;
                      setActiveBlocks(prev =>
                        prev.map(b =>
                          b.id === block.id
                            ? { ...b, metadata: { ...b.metadata, correctAnswer: ans, acceptableAnswers: [ans] } }
                            : b
                        )
                      );
                    }}
                    className="w-full bg-cream border border-teal p-1 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-charcoal-600 block">Petunjuk / Hint Guru:</label>
                  <input
                    type="text"
                    value={block.metadata?.hint || ''}
                    onChange={e => {
                      const h = e.target.value;
                      setActiveBlocks(prev =>
                        prev.map(b =>
                          b.id === block.id
                            ? { ...b, metadata: { ...b.metadata, hint: h } }
                            : b
                        )
                      );
                    }}
                    className="w-full bg-cream border border-teal p-1"
                  />
                </div>
              </div>
            )}

            {block.type === 'experiment_cta' && (
              <div className="bg-teal/10 border border-teal p-2 text-xs font-mono flex items-center justify-between">
                <span>Tombol mengarah ke: <strong>{block.metadata?.experimentType || 'FACTORS_REACTION'}</strong></span>
                <span className="text-[10px] text-charcoal-600">Label: "{block.metadata?.buttonLabel}"</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream border-3 border-charcoal-900 max-w-xl w-full p-6 space-y-4 kinetix-shadow-dark">
            <h4 className="font-bold text-lg uppercase text-charcoal-900 border-b-2 border-teal-dark pb-2">
              Tambah Blok Konten Baru
            </h4>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-mono font-bold mb-1">Tipe Konten:</label>
              <select
                value={newType}
                onChange={e => setNewType(e.target.value as ContentBlockType)}
                className="w-full bg-cream-card border-2 border-teal p-2 font-mono text-xs font-bold focus:outline-none"
              >
                <option value="text">Teks Paragraf Teori</option>
                <option value="heading">Judul Bagian (Subheading)</option>
                <option value="callout">Kotak Kaidah / Callout</option>
                <option value="equation">Persamaan Kimia / Rumus</option>
                <option value="fill_blank">Soal Isian Mandiri (Fill-in-the-Blank)</option>
                <option value="video">Tautan Video Pembelajaran</option>
                <option value="experiment_cta">Tombol Akses Halaman Eksperimen</option>
              </select>
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Isi Konten {newType === 'fill_blank' ? '(Gunakan [blank] untuk tempat isian)' : ''}:
              </label>
              <textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={4}
                placeholder={
                  newType === 'fill_blank'
                    ? 'Contoh: Katalis berfungsi menurunkan nilai [blank] pada reaksi kimia.'
                    : 'Tuliskan materi pembelajaran...'
                }
                className="w-full bg-cream-card border-2 border-charcoal-400 p-2 text-xs font-mono focus:outline-none focus:border-teal"
              />
            </div>

            {newType === 'fill_blank' && (
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block font-bold mb-1">Kunci Jawaban Tepat:</label>
                  <input
                    type="text"
                    value={newCorrectAnswer}
                    onChange={e => setNewCorrectAnswer(e.target.value)}
                    placeholder="Contoh: energi aktivasi"
                    className="w-full bg-cream-card border-2 border-teal p-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Petunjuk Guru (Hint):</label>
                  <input
                    type="text"
                    value={newHint}
                    onChange={e => setNewHint(e.target.value)}
                    placeholder="Contoh: Hambatan minimum energi..."
                    className="w-full bg-cream-card border-2 border-teal p-1.5"
                  />
                </div>
              </div>
            )}

            {newType === 'experiment_cta' && (
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block font-bold mb-1">Target Halaman Simulasi:</label>
                  <select
                    value={newExpType}
                    onChange={e => setNewExpType(e.target.value)}
                    className="w-full bg-cream-card border-2 border-teal p-1.5"
                  >
                    <option value="CONCENTRATION_TIME">KB 1: Konsentrasi vs Waktu</option>
                    <option value="COLLISION_THEORY">KB 2: Teori Tumbukan 2D</option>
                    <option value="ACTIVATION_ENERGY">KB 3: Energi Aktivasi & Katalis</option>
                    <option value="FACTORS_REACTION">KB 4: Laboratorium 4 Faktor Laju</option>
                    <option value="RATE_LAW">KB 5: Hukum Laju & Orde</option>
                    <option value="INDUSTRIAL_KINETICS">KB 6: Kinetika Industri Haber-Bosch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Teks Tombol Aksi:</label>
                  <input
                    type="text"
                    value={newBtnLabel}
                    onChange={e => setNewBtnLabel(e.target.value)}
                    className="w-full bg-cream-card border-2 border-teal p-1.5"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-charcoal-300">
              <button onClick={() => setShowAddModal(false)} className="kinetix-btn-secondary text-xs">
                BATAL
              </button>
              <button onClick={handleAddNewBlock} className="kinetix-btn-primary text-xs">
                TAMBAHKAN KE MODUL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
