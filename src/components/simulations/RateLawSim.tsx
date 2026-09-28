'use client';

import React, { useState } from 'react';
import { Calculator, Check, AlertCircle, RefreshCw, BarChart3, HelpCircle } from 'lucide-react';

interface ExperimentRow {
  expNum: number;
  concA: number;
  concB: number;
  rate: number;
}

export default function RateLawSim() {
  // Preset scenarios
  const [trueOrderA, setTrueOrderA] = useState<number>(1);
  const [trueOrderB, setTrueOrderB] = useState<number>(2);
  const [kConstant, setKConstant] = useState<number>(0.5);

  // Student deductions
  const [guessedOrderA, setGuessedOrderA] = useState<string>('');
  const [guessedOrderB, setGuessedOrderB] = useState<string>('');
  const [checkResult, setCheckResult] = useState<{ checked: boolean; isCorrect: boolean; feedback: string } | null>(null);

  // Active plot order view
  const [activePlotOrder, setActivePlotOrder] = useState<0 | 1 | 2>(1);

  // Generate 4 experimental rows based on true orders
  const rows: ExperimentRow[] = [
    {
      expNum: 1,
      concA: 0.1,
      concB: 0.1,
      rate: Math.round(kConstant * Math.pow(0.1, trueOrderA) * Math.pow(0.1, trueOrderB) * 10000) / 10000,
    },
    {
      expNum: 2,
      concA: 0.2, // doubled A
      concB: 0.1, // same B
      rate: Math.round(kConstant * Math.pow(0.2, trueOrderA) * Math.pow(0.1, trueOrderB) * 10000) / 10000,
    },
    {
      expNum: 3,
      concA: 0.1, // same A
      concB: 0.2, // doubled B
      rate: Math.round(kConstant * Math.pow(0.1, trueOrderA) * Math.pow(0.2, trueOrderB) * 10000) / 10000,
    },
    {
      expNum: 4,
      concA: 0.2, // doubled A
      concB: 0.2, // doubled B
      rate: Math.round(kConstant * Math.pow(0.2, trueOrderA) * Math.pow(0.2, trueOrderB) * 10000) / 10000,
    },
  ];

  const handleRandomize = () => {
    const orders = [0, 1, 2];
    const newA = orders[Math.floor(Math.random() * orders.length)];
    const newB = orders[Math.floor(Math.random() * orders.length)];
    const newK = Math.round((0.2 + Math.random() * 0.8) * 10) / 10;
    setTrueOrderA(newA);
    setTrueOrderB(newB);
    setKConstant(newK);
    setGuessedOrderA('');
    setGuessedOrderB('');
    setCheckResult(null);
  };

  const handleCheckAnswer = () => {
    const ansA = parseInt(guessedOrderA);
    const ansB = parseInt(guessedOrderB);

    if (isNaN(ansA) || isNaN(ansB)) {
      setCheckResult({
        checked: true,
        isCorrect: false,
        feedback: 'Harap masukkan angka bilangan bulat untuk orde A dan orde B!',
      });
      return;
    }

    const correctA = ansA === trueOrderA;
    const correctB = ansB === trueOrderB;

    if (correctA && correctB) {
      setCheckResult({
        checked: true,
        isCorrect: true,
        feedback: `Hebat! Analisis Anda tepat. Persamaan laju reaksinya adalah: v = ${kConstant} · [A]${trueOrderA === 1 ? '' : `^${trueOrderA}`} · [B]${trueOrderB === 1 ? '' : `^${trueOrderB}`}. Orde total reaksi adalah ${trueOrderA + trueOrderB}.`,
      });
    } else {
      let hint = '';
      if (!correctA) hint += `Cek Percobaan 1 dan 2 (saat [B] tetap). `;
      if (!correctB) hint += `Cek Percobaan 1 dan 3 (saat [A] tetap). `;
      setCheckResult({
        checked: true,
        isCorrect: false,
        feedback: `Kurang tepat. ${hint} Hitung rasio perubahan laju reaksi terhadap perubahan konsentrasinya.`,
      });
    }
  };

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 5
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Penentuan Hukum Laju & Orde Reaksi: v = k [A]ᵐ [B]ⁿ
          </h3>
          <p className="text-sm text-charcoal-600">
            Pecahkan orde reaksi parsial $m$ dan $n$ dari data eksperimen konsentrasi awal dan laju awal.
          </p>
        </div>

        <button onClick={handleRandomize} className="kinetix-btn-secondary">
          <RefreshCw className="w-4 h-4" />
          ACAK DATA SOAL BARU
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Data Table & Solver */}
        <div className="lg:col-span-7 bg-cream border-2 border-teal p-5 space-y-5">
          <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
            <Calculator className="w-4 h-4 text-teal" /> Tabel Data Eksperimen Awal
          </h4>

          {/* Styled Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse border border-charcoal-800">
              <thead className="bg-teal text-white">
                <tr>
                  <th className="border border-teal-dark p-2 text-center">Percobaan</th>
                  <th className="border border-teal-dark p-2 text-center">[A] Molaritas (M)</th>
                  <th className="border border-teal-dark p-2 text-center">[B] Molaritas (M)</th>
                  <th className="border border-teal-dark p-2 text-center">Laju Reaksi Awal v (M/s)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.expNum} className={i % 2 === 0 ? 'bg-cream-card' : 'bg-cream'}>
                    <td className="border border-charcoal-400 p-2 text-center font-bold">{r.expNum}</td>
                    <td className="border border-charcoal-400 p-2 text-center">{r.concA.toFixed(1)}</td>
                    <td className="border border-charcoal-400 p-2 text-center">{r.concB.toFixed(1)}</td>
                    <td className="border border-charcoal-400 p-2 text-center font-bold text-teal-dark">
                      {r.rate.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Solver Box */}
          <div className="bg-cream-card border-2 border-teal-dark p-4 space-y-3">
            <h5 className="font-mono font-bold text-xs uppercase text-charcoal-900">
              Deduksi Siswa: Tentukan Orde Reaksi
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-charcoal-700 mb-1">
                  Orde terhadap zat A ($m$):
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  placeholder="0, 1, atau 2"
                  value={guessedOrderA}
                  onChange={e => setGuessedOrderA(e.target.value)}
                  className="w-full bg-cream border-2 border-teal px-3 py-1.5 font-mono font-bold text-sm focus:outline-none focus:border-pink"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-charcoal-700 mb-1">
                  Orde terhadap zat B ($n$):
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  placeholder="0, 1, atau 2"
                  value={guessedOrderB}
                  onChange={e => setGuessedOrderB(e.target.value)}
                  className="w-full bg-cream border-2 border-teal px-3 py-1.5 font-mono font-bold text-sm focus:outline-none focus:border-pink"
                />
              </div>
            </div>

            <button onClick={handleCheckAnswer} className="w-full kinetix-btn-primary mt-2">
              <Check className="w-4 h-4" />
              VERIFIKASI JAWABAN ORDE
            </button>

            {/* Feedback alert */}
            {checkResult && (
              <div
                className={`p-3 border-2 font-mono text-xs ${
                  checkResult.isCorrect
                    ? 'bg-teal/15 border-teal text-teal-deep'
                    : 'bg-pink/20 border-pink text-charcoal-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {checkResult.isCorrect ? <Check className="w-4 h-4 text-teal" /> : <AlertCircle className="w-4 h-4 text-pink-hover" />}
                  {checkResult.isCorrect ? 'BENAR!' : 'PERLU PERBAIKAN'}
                </div>
                <p>{checkResult.feedback}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Curves Comparison */}
        <div className="lg:col-span-5 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-charcoal-300 pb-2">
              <span className="text-xs font-mono font-bold text-charcoal-800">
                KARAKTERISTIK GRAFIK LINEAR ORDE REAKSI
              </span>
              <BarChart3 className="w-4 h-4 text-teal" />
            </div>

            {/* Order Selector Tabs */}
            <div className="grid grid-cols-3 gap-1 mb-4">
              {[0, 1, 2].map(ord => (
                <button
                  key={ord}
                  onClick={() => setActivePlotOrder(ord as any)}
                  className={`py-1 text-xs font-mono font-bold border-2 transition-all ${
                    activePlotOrder === ord
                      ? 'bg-teal text-white border-teal-dark'
                      : 'bg-cream-card text-charcoal-700 border-charcoal-300'
                  }`}
                >
                  Orde {ord}
                </button>
              ))}
            </div>

            {/* Visual plot explanation */}
            <div className="bg-cream-card border border-teal/40 p-4 text-xs font-mono space-y-2">
              {activePlotOrder === 0 && (
                <>
                  <div className="font-bold text-teal-dark">Orde Nol: [A]t = -kt + [A]₀</div>
                  <p className="text-charcoal-600">
                    Grafik <strong>[A] vs waktu</strong> berbentuk garis lurus dengan slope bernilai $-k$. Laju reaksi konstan, tidak bergantung pada sisa konsentrasi reaktan.
                  </p>
                  <div className="h-32 border-2 border-dashed border-teal flex items-center justify-center p-2">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="20" y1="90" x2="190" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="10" x2="20" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="20" x2="170" y2="80" stroke="#008080" strokeWidth="3" />
                      <text x="180" y="85" fontSize="8" fill="#121C1C">t</text>
                      <text x="5" y="20" fontSize="8" fill="#121C1C">[A]</text>
                    </svg>
                  </div>
                </>
              )}

              {activePlotOrder === 1 && (
                <>
                  <div className="font-bold text-teal-dark">Orde Satu: ln[A]t = -kt + ln[A]₀</div>
                  <p className="text-charcoal-600">
                    Grafik <strong>ln[A] vs waktu</strong> menghasilkan garis lurus linear. Waktu paruh ($t_{1/2} = 0,693/k$) bernilai konstan tidak bergantung konsentrasi mula-mula.
                  </p>
                  <div className="h-32 border-2 border-dashed border-teal flex items-center justify-center p-2">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="20" y1="90" x2="190" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="10" x2="20" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="15" x2="170" y2="80" stroke="#FF69B4" strokeWidth="3" />
                      <text x="180" y="85" fontSize="8" fill="#121C1C">t</text>
                      <text x="2" y="20" fontSize="8" fill="#121C1C">ln[A]</text>
                    </svg>
                  </div>
                </>
              )}

              {activePlotOrder === 2 && (
                <>
                  <div className="font-bold text-teal-dark">Orde Dua: 1/[A]t = kt + 1/[A]₀</div>
                  <p className="text-charcoal-600">
                    Grafik <strong>1/[A] vs waktu</strong> menghasilkan garis lurus dengan kemiringan positif $+k$.
                  </p>
                  <div className="h-32 border-2 border-dashed border-teal flex items-center justify-center p-2">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <line x1="20" y1="90" x2="190" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="10" x2="20" y2="90" stroke="#121C1C" strokeWidth="1.5" />
                      <line x1="20" y1="80" x2="170" y2="20" stroke="#008080" strokeWidth="3" />
                      <text x="180" y="85" fontSize="8" fill="#121C1C">t</text>
                      <text x="2" y="20" fontSize="8" fill="#121C1C">1/[A]</text>
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800">
            <strong>Kunci Analisis:</strong> Orde reaksi tidak dapat ditebak dari koefisien stoikiometri persamaan reaksi. Orde harus ditentukan secara eksperimental dari perbandingan data laju awal!
          </div>
        </div>
      </div>
    </div>
  );
}
