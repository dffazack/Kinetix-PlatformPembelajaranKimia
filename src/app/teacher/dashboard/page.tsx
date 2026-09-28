'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import GradeRecapTable from '@/components/teacher/GradeRecapTable';
import DynamicContentEditor from '@/components/teacher/DynamicContentEditor';
import { Shield, FileSpreadsheet, Edit3, Plus, BookOpen, Users, Award, RotateCcw, AlertTriangle } from 'lucide-react';
import { Lesson } from '@/lib/types';

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const { lessons, results, resetToDefault } = useData();

  const [activeTab, setActiveTab] = useState<'recap' | 'crud'>('recap');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || 'kb-1');

  const selectedLesson = lessons.find(l => l.id === selectedLessonId) || lessons[0];

  return (
    <div className="space-y-8">
      {/* Teacher Welcome Header */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pink text-charcoal-900 border-2 border-charcoal-900 flex items-center justify-center text-3xl font-bold shadow-brutal-dark">
              👩‍🏫
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal text-white px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Shield className="w-3.5 h-3.5 text-pink" />
                Panel Kendali Pendidik (Teacher Dashboard)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal-900">
                {user?.role === 'TEACHER' ? user.name : 'Dra. Siti Rahmawati, M.Pd.'}
              </h1>
              <p className="text-xs font-mono text-charcoal-600">
                Guru Pengampu Kimia • SMA Negeri 1 Sains Kimia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Kembalikan seluruh modul dan data demo siswa ke pengaturan default bawaan pabrik?')) {
                  resetToDefault();
                }
              }}
              className="kinetix-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
              title="Reset data demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Data Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b-3 border-teal-dark">
        <button
          onClick={() => setActiveTab('recap')}
          className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border-2 border-b-0 transition-all flex items-center gap-2 ${
            activeTab === 'recap'
              ? 'bg-cream-card text-charcoal-900 border-teal-dark -mb-[3px] z-10 shadow-brutal-teal-sm'
              : 'bg-cream text-charcoal-600 border-transparent hover:text-teal-dark'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-teal" />
          1. Monitoring & Rekap Nilai Siswa
        </button>

        <button
          onClick={() => setActiveTab('crud')}
          className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border-2 border-b-0 transition-all flex items-center gap-2 ${
            activeTab === 'crud'
              ? 'bg-cream-card text-charcoal-900 border-teal-dark -mb-[3px] z-10 shadow-brutal-teal-sm'
              : 'bg-cream text-charcoal-600 border-transparent hover:text-teal-dark'
          }`}
        >
          <Edit3 className="w-4 h-4 text-pink-hover" />
          2. Manajemen Modul & Editor Dinamis (CRUD KB)
        </button>
      </div>

      {/* Tab 1: Grade Recap and Monitoring */}
      {activeTab === 'recap' && <GradeRecapTable />}

      {/* Tab 2: Module Management & Dynamic Content Editor */}
      {activeTab === 'crud' && (
        <div className="space-y-6">
          {/* Module Selector */}
          <div className="bg-cream-card border-2 border-teal-dark p-4 flex flex-wrap items-center justify-between gap-4 kinetix-shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold text-charcoal-800 uppercase">Pilih Modul yang Diedit:</span>
              <select
                value={selectedLessonId}
                onChange={e => setSelectedLessonId(e.target.value)}
                className="bg-cream border-2 border-teal px-3 py-1.5 font-mono text-xs font-bold text-teal-deep focus:outline-none"
              >
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    KB {l.orderNumber}: {l.title.replace(/^KB \d+: /, '')}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href={`/modules/${selectedLesson?.id}`}
              className="kinetix-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal" />
              Pratinjau Tampilan Siswa
            </Link>
          </div>

          {selectedLesson && <DynamicContentEditor lesson={selectedLesson} />}
        </div>
      )}
    </div>
  );
}
