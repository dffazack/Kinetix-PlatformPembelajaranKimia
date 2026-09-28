'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { StudentResult } from '@/lib/types';
import { Download, Search, Filter, Eye, Award, CheckCircle2, XCircle, FileSpreadsheet, X } from 'lucide-react';

export default function GradeRecapTable() {
  const { results, lessons } = useData();

  const [selectedKb, setSelectedKb] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewingResult, setViewingResult] = useState<StudentResult | null>(null);

  // Filter results
  const filtered = results.filter(r => {
    const matchesKb = selectedKb === 'all' || r.lessonId === selectedKb;
    const matchesQuery =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKb && matchesQuery;
  });

  // Calculate statistics
  const totalSubmissions = filtered.length;
  const avgScore =
    totalSubmissions > 0
      ? Math.round(filtered.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions)
      : 0;
  const passingCount = filtered.filter(r => r.score >= 75).length;
  const passingRate = totalSubmissions > 0 ? Math.round((passingCount / totalSubmissions) * 100) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Nama Siswa', 'Email', 'Modul (KB)', 'Skor', 'Jumlah Benar', 'Total Soal', 'Tanggal Selesai'];
    const rows = filtered.map(r => {
      const lesson = lessons.find(l => l.id === r.lessonId);
      return [
        `"${r.studentName}"`,
        `"${r.studentEmail}"`,
        `"${lesson ? lesson.title : r.lessonId}"`,
        r.score,
        r.correctCount,
        r.totalQuestions,
        `"${new Date(r.completedAt).toLocaleString('id-ID')}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_nilai_kinetix_${selectedKb}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-cream-card border-2 border-charcoal-900 p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-charcoal-500">Total Evaluasi Masuk</div>
          <div className="text-3xl font-mono font-extrabold text-charcoal-900">{totalSubmissions}</div>
          <div className="text-[11px] font-mono text-charcoal-600 mt-1">Pengiriman dari seluruh siswa</div>
        </div>

        <div className="bg-teal/15 border-2 border-teal p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-teal-dark font-bold">Rata-Rata Nilai Kelas</div>
          <div className="text-3xl font-mono font-extrabold text-teal-deep">{avgScore} / 100</div>
          <div className="text-[11px] font-mono text-teal-dark mt-1">Standar KKM: 75</div>
        </div>

        <div className="bg-pink/20 border-2 border-pink p-4 kinetix-shadow-sm">
          <div className="text-[10px] font-mono uppercase text-charcoal-900 font-bold">Tingkat Ketuntasan (≥75)</div>
          <div className="text-3xl font-mono font-extrabold text-pink-hover">{passingRate}%</div>
          <div className="text-[11px] font-mono text-charcoal-700 mt-1">{passingCount} dari {totalSubmissions} tuntas</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cream-card border-2 border-teal-dark p-4 flex flex-wrap items-center justify-between gap-4 kinetix-shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* KB Filter */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Filter className="w-4 h-4 text-teal" />
            <span className="font-bold text-charcoal-800">Filter Modul:</span>
            <select
              value={selectedKb}
              onChange={e => setSelectedKb(e.target.value)}
              className="bg-cream border-2 border-teal px-2.5 py-1.5 font-mono text-xs font-bold text-teal-deep focus:outline-none"
            >
              <option value="all">Semua Modul (KB 1 - KB 6)</option>
              {lessons.map(l => (
                <option key={l.id} value={l.id}>
                  KB {l.orderNumber}: {l.title.replace(/^KB \d+: /, '')}
                </option>
              ))}
            </select>
          </div>

          {/* Search Query */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama atau email siswa..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-cream border-2 border-charcoal-400 pl-8 pr-3 py-1 text-xs font-mono focus:outline-none focus:border-teal min-w-[220px]"
            />
          </div>
        </div>

        {/* Export Button */}
        <button onClick={handleExportCSV} className="kinetix-btn-secondary text-xs py-1.5 px-3">
          <FileSpreadsheet className="w-4 h-4 text-teal" />
          EKSPOR DATA KE CSV
        </button>
      </div>

      {/* Main Recap Table */}
      <div className="bg-cream-card border-2 border-teal-dark kinetix-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead className="bg-teal text-white border-b-2 border-teal-deep">
              <tr>
                <th className="p-3 text-left">Nama Siswa</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Modul Pembelajaran</th>
                <th className="p-3 text-center">Skor Evaluasi</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-left">Waktu Pengumpulan</th>
                <th className="p-3 text-center">Aksi Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-charcoal-500 font-mono">
                    Belum ada data nilai evaluasi yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => {
                  const lesson = lessons.find(l => l.id === r.lessonId);
                  const isPassed = r.score >= 75;

                  return (
                    <tr key={r.id} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-cream'}>
                      <td className="p-3 font-bold text-charcoal-900">{r.studentName}</td>
                      <td className="p-3 text-charcoal-600">{r.studentEmail}</td>
                      <td className="p-3">
                        <span className="font-bold text-teal-dark">
                          KB {lesson?.orderNumber}: {lesson?.title.replace(/^KB \d+: /, '')}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 font-extrabold border ${
                            isPassed
                              ? 'bg-teal/20 text-teal-deep border-teal'
                              : 'bg-pink/20 text-pink-hover border-pink'
                          }`}
                        >
                          {r.score}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                            isPassed
                              ? 'bg-teal text-white border-teal-dark'
                              : 'bg-pink text-charcoal-900 border-charcoal-900'
                          }`}
                        >
                          {isPassed ? 'TUNTAS' : 'REMEDIAL'}
                        </span>
                      </td>
                      <td className="p-3 text-charcoal-600">
                        {new Date(r.completedAt).toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setViewingResult(r)}
                          className="kinetix-btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1 mx-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Jawaban
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Result Details Modal / Drawer */}
      {viewingResult && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream border-3 border-charcoal-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 kinetix-shadow-dark">
            <div className="flex items-center justify-between border-b-2 border-teal-dark pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-teal text-white px-2 py-0.5 font-bold">
                  Detail Rekap Lembar Jawaban Siswa
                </span>
                <h4 className="text-xl font-bold uppercase text-charcoal-900 mt-1">
                  {viewingResult.studentName}
                </h4>
                <p className="text-xs font-mono text-charcoal-600">
                  {viewingResult.studentEmail} • Skor: {viewingResult.score}/100
                </p>
              </div>

              <button
                onClick={() => setViewingResult(null)}
                className="p-1.5 border border-charcoal-900 bg-pink text-charcoal-900 hover:bg-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Jawaban Soal Isian (Fill-in-the-blank) section from PRD */}
            <div className="bg-cream-card border-2 border-teal p-4 space-y-3">
              <h5 className="font-mono font-bold text-xs uppercase text-teal-deep flex items-center gap-2 border-b border-teal/20 pb-2">
                Jawaban Soal Isian Mandiri (Fill-in-the-blank)
              </h5>
              {Object.keys(viewingResult.fillAnswers || {}).length === 0 ? (
                <p className="text-xs font-mono text-charcoal-500 italic">
                  Belum ada catatan isian mandiri yang tersimpan untuk sesi ini.
                </p>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {Object.entries(viewingResult.fillAnswers).map(([k, v]) => (
                    <div key={k} className="flex justify-between bg-cream border border-teal/40 p-2">
                      <span className="text-charcoal-600 font-bold">Kode Soal [{k}]:</span>
                      <span className="text-teal-dark font-extrabold">{v || '(Kosong)'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rekap Jawaban Pilihan Ganda */}
            <div className="space-y-3">
              <h5 className="font-mono font-bold text-xs uppercase text-charcoal-900 border-b border-charcoal-300 pb-1">
                Rekap 10 Jawaban Pilihan Ganda
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {Object.entries(viewingResult.mcAnswers || {}).map(([qId, ans], idx) => (
                  <div key={qId} className="bg-cream-card border border-charcoal-400 p-2 text-center">
                    <div className="text-[10px] text-charcoal-500">Soal #{idx + 1}</div>
                    <div className="text-base font-bold text-teal-deep">{ans}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right pt-3 border-t border-charcoal-300">
              <button onClick={() => setViewingResult(null)} className="kinetix-btn-secondary text-xs">
                TUTUP JENDELA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
