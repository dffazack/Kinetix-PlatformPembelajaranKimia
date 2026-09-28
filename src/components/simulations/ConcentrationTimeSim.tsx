'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Droplets, Zap } from 'lucide-react';

export default function ConcentrationTimeSim() {
  const [initialConc, setInitialConc] = useState<number>(1.0); // M
  const [rateConstant, setRateConstant] = useState<number>(0.15); // s^-1
  const [order, setOrder] = useState<number>(1); // 1st order
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [history, setHistory] = useState<{ t: number; reactant: number; product: number; instantRate: number }[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset simulation
  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
    const initialRate = rateConstant * Math.pow(initialConc, order);
    setHistory([{ t: 0, reactant: initialConc, product: 0, instantRate: initialRate }]);
  };

  useEffect(() => {
    handleReset();
  }, [initialConc, rateConstant, order]);

  // Tick simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          const nextTime = Math.round((prevTime + 0.5) * 10) / 10;
          if (nextTime > 40) {
            setIsPlaying(false);
            return prevTime;
          }

          let rConc = 0;
          if (order === 0) {
            rConc = Math.max(0, initialConc - rateConstant * nextTime);
          } else if (order === 1) {
            rConc = initialConc * Math.exp(-rateConstant * nextTime);
          } else {
            rConc = initialConc / (1 + rateConstant * initialConc * nextTime);
          }

          const pConc = Math.max(0, initialConc - rConc);
          const instRate = rateConstant * Math.pow(rConc, order);

          setHistory(prev => [...prev, { t: nextTime, reactant: rConc, product: pConc, instantRate: instRate }]);
          return nextTime;
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, initialConc, rateConstant, order]);

  const currentPoint = history[history.length - 1] || { t: 0, reactant: initialConc, product: 0, instantRate: 0 };

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 1
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Dinamika Konsentrasi vs Waktu: A → B
          </h3>
          <p className="text-sm text-charcoal-600">
            Pantau laju pengurangan konsentrasi reaktan [A] dan pertambahan produk [B] secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`kinetix-btn-primary ${isPlaying ? 'bg-pink text-charcoal-900 border-charcoal-900 hover:bg-pink-hover' : ''}`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'JEDA' : 'MULAI REAKSI'}
          </button>
          <button
            onClick={handleReset}
            className="kinetix-btn-secondary"
            title="Ulangi simulasi dari t = 0"
          >
            <RotateCcw className="w-4 h-4" />
            RESET
          </button>
        </div>
      </div>

      {/* Grid: Controls and Live Displays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders */}
        <div className="bg-cream border-2 border-teal p-5 space-y-5">
          <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
            <Activity className="w-4 h-4 text-teal" /> Parameter Eksperimen
          </h4>

          {/* Initial Concentration */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Konsentrasi Awal [A]₀</span>
              <span className="text-teal font-extrabold">{initialConc.toFixed(1)} M</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={initialConc}
              disabled={isPlaying}
              onChange={e => setInitialConc(parseFloat(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>0.2 M</span>
              <span>1.0 M</span>
              <span>2.0 M</span>
            </div>
          </div>

          {/* Rate Constant k */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Tetapan Laju Jenis (k)</span>
              <span className="text-teal font-extrabold">{rateConstant.toFixed(2)} s⁻¹</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.40"
              step="0.01"
              value={rateConstant}
              disabled={isPlaying}
              onChange={e => setRateConstant(parseFloat(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>0.05 (Lambat)</span>
              <span>0.40 (Cepat)</span>
            </div>
          </div>

          {/* Order Selection */}
          <div>
            <label className="block text-xs font-mono font-bold mb-2">Model Orde Reaksi</label>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map(ord => (
                <button
                  key={ord}
                  disabled={isPlaying}
                  onClick={() => setOrder(ord)}
                  className={`py-1.5 text-xs font-mono font-bold border-2 transition-all ${
                    order === ord
                      ? 'bg-teal text-white border-teal-dark shadow-sm'
                      : 'bg-cream-card text-charcoal-700 border-charcoal-300 hover:border-teal'
                  }`}
                >
                  Orde {ord}
                </button>
              ))}
            </div>
          </div>

          {/* Live Metric Cards */}
          <div className="border-t-2 border-dashed border-teal/40 pt-4 space-y-3">
            <div className="flex items-center justify-between bg-cream-card border border-teal-dark p-2">
              <span className="text-xs font-mono">Waktu Terhitung (t):</span>
              <span className="font-mono font-bold text-sm text-charcoal-900">{time.toFixed(1)} s</span>
            </div>
            <div className="flex items-center justify-between bg-teal/10 border border-teal p-2">
              <span className="text-xs font-mono text-teal-dark flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-teal inline-block"></span> [A] Sisa:
              </span>
              <span className="font-mono font-bold text-sm text-teal-dark">{currentPoint.reactant.toFixed(3)} M</span>
            </div>
            <div className="flex items-center justify-between bg-pink/15 border border-pink p-2">
              <span className="text-xs font-mono text-charcoal-900 flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-pink inline-block"></span> [B] Terbentuk:
              </span>
              <span className="font-mono font-bold text-sm text-charcoal-900">{currentPoint.product.toFixed(3)} M</span>
            </div>
            <div className="flex items-center justify-between bg-cream-card border border-charcoal-900 p-2">
              <span className="text-xs font-mono">Laju Sesaat (v):</span>
              <span className="font-mono font-bold text-sm text-teal-dark">{currentPoint.instantRate.toFixed(4)} M/s</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Canvas Graph */}
        <div className="lg:col-span-2 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-charcoal-300 pb-2">
            <span className="text-xs font-mono font-bold text-charcoal-800">
              GRAFIK PERUBAHAN KONSENTRASI TERHADAP WAKTU
            </span>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-teal inline-block"></span> Reaktan [A]
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-pink inline-block"></span> Produk [B]
              </span>
            </div>
          </div>

          {/* SVG Coordinate Graph */}
          <div className="relative w-full h-64 bg-cream-card border border-teal/40 p-2">
            <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[40, 80, 120, 160, 200].map(y => (
                <line key={`grid-y-${y}`} x1="40" y1={y} x2="480" y2={y} stroke="#008080" strokeOpacity="0.15" strokeDasharray="3 3" />
              ))}
              {[120, 200, 280, 360, 440].map(x => (
                <line key={`grid-x-${x}`} x1={x} y1="20" x2={x} y2="210" stroke="#008080" strokeOpacity="0.15" strokeDasharray="3 3" />
              ))}

              {/* Axes */}
              <line x1="40" y1="210" x2="485" y2="210" stroke="#121C1C" strokeWidth="2" />
              <line x1="40" y1="15" x2="40" y2="210" stroke="#121C1C" strokeWidth="2" />

              {/* Axis labels */}
              <text x="485" y="225" fontSize="10" fontFamily="monospace" textAnchor="end" fill="#121C1C">t (detik)</text>
              <text x="10" y="20" fontSize="10" fontFamily="monospace" fill="#121C1C">[Konsentrasi] M</text>
              <text x="32" y="213" fontSize="9" fontFamily="monospace" textAnchor="end" fill="#5F7575">0.0</text>
              <text x="32" y="115" fontSize="9" fontFamily="monospace" textAnchor="end" fill="#5F7575">1.0</text>
              <text x="32" y="25" fontSize="9" fontFamily="monospace" textAnchor="end" fill="#5F7575">2.0</text>

              {/* Reactant curve: [A] */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#008080"
                  strokeWidth="3"
                  points={history
                    .map(pt => {
                      const x = 40 + (pt.t / 40) * 440;
                      const y = 210 - (pt.reactant / 2.0) * 190;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              )}

              {/* Product curve: [B] */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#FF69B4"
                  strokeWidth="3"
                  points={history
                    .map(pt => {
                      const x = 40 + (pt.t / 40) * 440;
                      const y = 210 - (pt.product / 2.0) * 190;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              )}

              {/* Current Point Dot */}
              {history.length > 0 && (
                <>
                  <circle
                    cx={40 + (currentPoint.t / 40) * 440}
                    cy={210 - (currentPoint.reactant / 2.0) * 190}
                    r="5"
                    fill="#005959"
                    stroke="#FFF"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={40 + (currentPoint.t / 40) * 440}
                    cy={210 - (currentPoint.product / 2.0) * 190}
                    r="5"
                    fill="#FF1493"
                    stroke="#FFF"
                    strokeWidth="1.5"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Insight box */}
          <div className="mt-4 bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800">
            <strong>Analisis Kinetika:</strong> Pada awal reaksi ($t = 0$), gradien kemiringan garis singgung kurva berada pada titik tercuram (laju maksimum). Seiring berkurangnya konsentrasi reaktan [A], frekuensi tumbukan menurun sehingga kurva mendatar menuju kesetimbangan/kesempurnaan reaksi.
          </div>
        </div>
      </div>
    </div>
  );
}
