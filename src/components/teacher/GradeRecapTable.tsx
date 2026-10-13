'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { StudentResult } from '@/lib/types';
import { Download, Search, Filter, Eye, Award, CheckCircle2, XCircle, FileSpreadsheet, X, TrendingUp, Brain } from 'lucide-react';

export default function GradeRecapTable() {
  const { results, lessons } = useData();

  const [selectedKb, setSelectedKb] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewingResult, setViewingResult] = useState<StudentResult | null>(null);

  // Filter results
  const filtered = results.filter((r) => {
    const matchesKb = selectedKb === 'all' || r.lessonId === selectedKb;
    const matchesQuery =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKb && matchesQuery;
  });

  // Calculate statistics
  const totalSubmissions = filtered.length;
  const avgPre =
    totalSubmissions > 0
      ? Math.round(filtered.reduce((acc, curr) => acc + (curr.preTestScore || 0), 0) / totalSubmissions)
      : 0;
  const avgPost =
    totalSubmissions > 0
      ? Math.round(filtered.reduce((acc, curr) => acc + (curr.postTestScore || curr.score || 0), 0) / totalSubmissions)
      : 0;
  const avgNGain =
    totalSubmissions > 0
      ? Math.round(
          (filtered.reduce((acc, curr) => acc + (curr.nGain || 0), 0) / totalSubmissions) * 100
        ) / 100
      : 0;
  const passingCount = filtered.filter((r) => (r.postTestScore || r.score) >= 75).length;
  const passingRate = totalSubmissions > 0 ? Math.round((passingCount / totalSubmissions) * 100) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Nama Siswa', 'Email', 'Modul (Pertemuan)', 'Skor Pre-Test', 'Skor Post-Test', 'N-Gain', 'Refleksi Terisi', 'Tanggal'];
    const rows = filtered.map((r) => {
      const lesson = lessons.find((l) => l.id === r.lessonId);
      const hasReflection = r.reflectionAnswers && Object.keys(r.reflectionAnswers).length > 0 ? 'Ya' : 'Belum';
      return [
        `"${r.studentName}"`,
        `"${r.studentEmail}"`,
        `"${lesson ? lesson.title : r.lessonId}"`,
        r.preTestScore ?? 0,
        r.postTestScore ?? r.score,
        r.nGain ?? 0,
        `"${hasReflection}"`,
        `"${new Date(r.completedAt).toLocaleString('id-ID')}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_kinetix_pbl_${selectedKb}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-cream-card border-2 border-charcoal-900 p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-charcoal-500">Total Evaluasi Masuk</div>
          <div className="text-3xl font-mono font-extrabold text-charcoal-900">{totalSubmissions}</div>
          <div className="text-[11px] font-mono text-charcoal-600 mt-1">Data siswa aktif</div>
        </div>

        <div className="bg-cream-card border-2 border-teal p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-charcoal-600 font-bold">Rata-Rata Pre-Test</div>
          <div className="text-3xl font-mono font-extrabold text-charcoal-800">{avgPre}%</div>
          <div className="text-[11px] font-mono text-charcoal-600 mt-1">Diagnostik Awal</div>
        </div>

        <div className="bg-teal/15 border-2 border-teal p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-teal-dark font-bold">Rata-Rata Post-Test</div>
          <div className="text-3xl font-mono font-extrabold text-teal-deep">{avgPost}%</div>
          <div className="text-[11px] font-mono text-teal-dark mt-1">Ketuntasan KKM: {passingRate}%</div>
        </div>

        <div className="bg-pink/20 border-2 border-pink p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-charcoal-900 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-pink-hover" />
            Rata-Rata N-Gain Score
          </div>
          <div className="text-3xl font-mono font-extrabold text-pink-hover">{avgNGain}</div>
          <div className="text-[11px] font-mono text-charcoal-700 mt-1">Efektivitas Pembelajaran PBL</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cream-card border-2 border-teal-dark p-4 flex flex-wrap items-center justify-between gap-4 kinetix-shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* KB Filter */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Filter className="w-4 h-4 text-teal" />
            <span className="font-bold text-charcoal-800">Filter Pertemuan:</span>
            <select
              value={selectedKb}
              onChange={(e) => setSelectedKb(e.target.value)}
              className="bg-cream border-2 border-teal px-2.5 py-1.5 font-mono text-xs font-bold text-teal-deep focus:outline-none"
            >
              <option value="all">Semua Pertemuan (KB 1 - KB 5)</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  KB {l.orderNumber}: {l.title.replace(/^Pertemuan \d+ \(KB \d+\): /, '')}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-charcoal-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau email siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-cream border-2 border-charcoal-900 pl-8 pr-3 py-1.5 text-xs font-sans text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-teal w-60"
            />
          </div>
        </div>

        {/* Export CSV Button */}
        <button
          type="button"
          onClick={handleExportCSV}
          className="kinetix-btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 font-bold"
        >
          <FileSpreadsheet className="w-4 h-4 text-teal" />
          <span>Ekspor Rekap (CSV)</span>
        </button>
      </div>

      {/* Grades Table */}
      <div className="bg-cream-card border-3 border-teal-dark overflow-x-auto kinetix-shadow">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-teal text-white font-mono text-[11px] uppercase tracking-wider border-b-2 border-teal-deep">
              <th className="p-3">Siswa</th>
              <th className="p-3">Pertemuan (KB)</th>
              <th className="p-3 text-center">Pre-Test</th>
              <th className="p-3 text-center">Post-Test</th>
              <th className="p-3 text-center">N-Gain</th>
              <th className="p-3 text-center">Jurnal Refleksi</th>
              <th className="p-3">Waktu Selesai</th>
              <th className="p-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-charcoal-500 font-mono text-xs">
                  Belum ada data evaluasi yang sesuai dengan filter atau pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const lesson = lessons.find((l) => l.id === item.lessonId);
                const post = item.postTestScore ?? item.score;
                const pre = item.preTestScore ?? 0;
                const hasReflect = item.reflectionAnswers && Object.keys(item.reflectionAnswers).length > 0;

                return (
                  <tr key={item.id} className="hover:bg-cream/60 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-charcoal-900">{item.studentName}</div>
                      <div className="text-[11px] font-mono text-charcoal-500">{item.studentEmail}</div>
                    </td>

                    <td className="p-3">
                      <span className="font-mono font-bold bg-cream px-2 py-0.5 border border-charcoal-300">
                        {lesson ? `KB ${lesson.orderNumber}` : item.lessonId}
                      </span>
                    </td>

                    <td className="p-3 text-center font-mono font-bold text-charcoal-800">
                      {pre}%
                    </td>

                    <td className="p-3 text-center font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 border ${
                          post >= 75
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-600'
                            : 'bg-rose-100 text-rose-800 border-rose-600'
                        }`}
                      >
                        {post}%
                      </span>
                    </td>

                    <td className="p-3 text-center font-mono font-bold">
                      <span className="bg-pink text-charcoal-900 border border-charcoal-900 px-2 py-0.5">
                        {item.nGain ?? 0}
                      </span>
                    </td>

                    <td className="p-3 text-center font-mono text-xs">
                      {hasReflect ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-500 px-2 py-0.5 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ada
                        </span>
                      ) : (
                        <span className="text-charcoal-400">Belum</span>
                      )}
                    </td>

                    <td className="p-3 font-mono text-[11px] text-charcoal-600">
                      {new Date(item.completedAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setViewingResult(item)}
                        className="bg-cream border-2 border-charcoal-900 hover:bg-teal hover:text-white px-2.5 py-1 text-xs font-mono font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL: Showing Pre/Post Answers + Metacognitive Reflections */}
      {viewingResult && (
        <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-cream-card border-3 border-charcoal-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto kinetix-shadow space-y-6 p-6">
            <div className="flex items-center justify-between border-b-2 border-charcoal-900 pb-3">
              <div>
                <span className="font-mono text-xs font-bold bg-teal text-white px-2 py-0.5 uppercase">
                  Rapor Pembelajaran Siswa
                </span>
                <h3 className="text-xl font-bold font-mono text-charcoal-900 mt-1">
                  {viewingResult.studentName}
                </h3>
                <p className="text-xs font-mono text-charcoal-600">{viewingResult.studentEmail}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingResult(null)}
                className="bg-cream border-2 border-charcoal-900 p-1.5 hover:bg-pink transition-colors"
              >
                <X className="w-5 h-5 text-charcoal-900" />
              </button>
            </div>

            {/* Scores summary */}
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-cream border border-charcoal-900 p-3 text-center">
                <span className="text-charcoal-600 block text-[10px]">SKOR PRE-TEST</span>
                <span className="text-xl font-bold text-charcoal-900">{viewingResult.preTestScore}%</span>
              </div>
              <div className="bg-teal text-white border border-teal-deep p-3 text-center">
                <span className="text-cream/80 block text-[10px]">SKOR POST-TEST</span>
                <span className="text-xl font-bold">{viewingResult.postTestScore ?? viewingResult.score}%</span>
              </div>
              <div className="bg-pink text-charcoal-900 border border-charcoal-900 p-3 text-center">
                <span className="text-charcoal-800 block text-[10px]">N-GAIN SCORE</span>
                <span className="text-xl font-bold">{viewingResult.nGain}</span>
              </div>
            </div>

            {/* Metacognitive Reflection Responses */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-charcoal-900 border-b border-charcoal-300 pb-1">
                <Brain className="w-4 h-4 text-teal" />
                <span>Respons Jurnal Refleksi Metakognitif Siswa:</span>
              </div>

              {viewingResult.reflectionAnswers && Object.keys(viewingResult.reflectionAnswers).length > 0 ? (
                <div className="space-y-2.5">
                  {Object.entries(viewingResult.reflectionAnswers).map(([k, ans]) => (
                    <div key={k} className="bg-cream border border-teal-dark p-3 text-xs space-y-1">
                      <span className="font-mono font-bold text-teal-dark block">
                        Pertanyaan Refleksi {Number(k) + 1}:
                      </span>
                      <p className="font-sans text-charcoal-800 italic leading-relaxed">
                        &quot;{ans}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-charcoal-500 italic">
                  Siswa belum mengisi respons jurnal refleksi metakognitif untuk modul ini.
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingResult(null)}
                className="kinetix-btn-secondary text-xs py-2 px-5"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
