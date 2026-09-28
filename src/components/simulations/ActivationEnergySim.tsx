'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';

export default function ActivationEnergySim() {
  const [reactionType, setReactionType] = useState<'exothermic' | 'endothermic'>('exothermic');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(298); // Kelvin
  const [uncatalyzedEa, setUncatalyzedEa] = useState<number>(75); // kJ/mol
  const [catalyzedEa, setCatalyzedEa] = useState<number>(35); // kJ/mol
  const [deltaH, setDeltaH] = useState<number>(-40); // kJ/mol for exothermic

  // Ball rolling animation state
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [ballProgress, setBallProgress] = useState<number>(0); // 0 (reactants) to 1 (products)
  const [hasPassedBarrier, setHasPassedBarrier] = useState<boolean>(false);

  // Update deltaH when reaction type changes
  useEffect(() => {
    if (reactionType === 'exothermic') {
      setDeltaH(-40);
    } else {
      setDeltaH(30);
    }
  }, [reactionType]);

  // Active Ea
  const activeEa = hasCatalyst ? catalyzedEa : uncatalyzedEa;

  // Arrhenius calculations: k = A * exp(-Ea / (R * T))
  const R = 8.314; // J/(mol*K)
  const A = 1e11;
  const kUncatalyzed = A * Math.exp((-uncatalyzedEa * 1000) / (R * temperature));
  const kCatalyzed = A * Math.exp((-catalyzedEa * 1000) / (R * temperature));
  const speedupRatio = kCatalyzed / (kUncatalyzed || 1e-15);

  const startAnimation = () => {
    setIsRolling(true);
    setBallProgress(0);
    setHasPassedBarrier(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      setBallProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setIsRolling(false);
        setHasPassedBarrier(true);
      }
    }, 30);
  };

  // SVG coordinate helpers
  // Start: (80, yReactant), Peak: (250, yPeak), End: (420, yProduct)
  const yReactant = 160;
  const yProduct = reactionType === 'exothermic' ? yReactant + 45 : yReactant - 35;
  const yUncatalyzedPeak = yReactant - (uncatalyzedEa * 1.3);
  const yCatalyzedPeak = yReactant - (catalyzedEa * 1.3);
  const currentYPeak = hasCatalyst ? yCatalyzedPeak : yUncatalyzedPeak;

  // Ball coordinates
  let ballX = 80;
  let ballY = yReactant;
  if (ballProgress <= 0.5) {
    const t = ballProgress / 0.5;
    ballX = 80 + t * (250 - 80);
    ballY = yReactant + t * (currentYPeak - yReactant);
  } else {
    const t = (ballProgress - 0.5) / 0.5;
    ballX = 250 + t * (420 - 250);
    ballY = currentYPeak + t * (yProduct - currentYPeak);
  }

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 3
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Diagram Profil Energi & Peran Katalis
          </h3>
          <p className="text-sm text-charcoal-600">
            Pahami bagaimana katalis membuka rute reaksi berenergi rendah dengan menurunkan ambang Energi Aktivasi (Ea).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startAnimation}
            disabled={isRolling}
            className="kinetix-btn-primary"
          >
            <Play className="w-4 h-4" />
            LUNCURKAN PARTIKEL
          </button>
        </div>
      </div>

      {/* Grid: Controls & Energy Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-cream border-2 border-teal p-5 space-y-5">
          <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
            <Zap className="w-4 h-4 text-teal" /> Modus Termokimia
          </h4>

          {/* Reaction Type Toggle */}
          <div>
            <label className="block text-xs font-mono font-bold mb-2">Tipe Reaksi</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setReactionType('exothermic')}
                className={`py-2 text-xs font-mono font-bold border-2 transition-all ${
                  reactionType === 'exothermic'
                    ? 'bg-teal text-white border-teal-dark shadow-sm'
                    : 'bg-cream-card text-charcoal-700 border-charcoal-300'
                }`}
              >
                Eksoterm (ΔH &lt; 0)
              </button>
              <button
                onClick={() => setReactionType('endothermic')}
                className={`py-2 text-xs font-mono font-bold border-2 transition-all ${
                  reactionType === 'endothermic'
                    ? 'bg-teal text-white border-teal-dark shadow-sm'
                    : 'bg-cream-card text-charcoal-700 border-charcoal-300'
                }`}
              >
                Endoterm (ΔH &gt; 0)
              </button>
            </div>
          </div>

          {/* Catalyst Switcher */}
          <div className="bg-cream-card border-2 border-teal-dark p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-mono font-bold uppercase text-charcoal-900">
                  Status Katalisator
                </span>
                <span className="text-[11px] text-charcoal-500">
                  {hasCatalyst ? 'Jalur alternatif aktif (Ea turun)' : 'Tanpa katalis (Ea tinggi)'}
                </span>
              </div>
              <button
                onClick={() => setHasCatalyst(!hasCatalyst)}
                className={`px-3 py-1.5 text-xs font-mono font-bold border-2 transition-all ${
                  hasCatalyst
                    ? 'bg-pink text-charcoal-900 border-charcoal-900 font-extrabold shadow-sm'
                    : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                }`}
              >
                {hasCatalyst ? 'KATALIS AKTIF' : 'TANPA KATALIS'}
              </button>
            </div>
          </div>

          {/* Ea Sliders */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Ea Tanpa Katalis</span>
              <span className="text-teal font-extrabold">{uncatalyzedEa} kJ/mol</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={uncatalyzedEa}
              onChange={e => setUncatalyzedEa(parseInt(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
          </div>

          {hasCatalyst && (
            <div className="bg-pink/15 p-2 border border-pink">
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span className="text-charcoal-900">Ea Dengan Katalis</span>
                <span className="text-pink-hover font-extrabold">{catalyzedEa} kJ/mol</span>
              </div>
              <input
                type="range"
                min="20"
                max={uncatalyzedEa - 10}
                step="5"
                value={catalyzedEa}
                onChange={e => setCatalyzedEa(parseInt(e.target.value))}
                className="w-full accent-pink cursor-pointer"
              />
            </div>
          )}

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Suhu Reaksi (T)</span>
              <span className="text-teal font-extrabold">{temperature} K ({(temperature - 273)}°C)</span>
            </div>
            <input
              type="range"
              min="273"
              max="500"
              step="5"
              value={temperature}
              onChange={e => setTemperature(parseInt(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
          </div>

          {/* Mathematical Multiplier */}
          <div className="border-t-2 border-dashed border-teal/40 pt-3">
            <div className="text-[11px] font-mono text-charcoal-600 mb-1">Peningkatan Laju Reaksi:</div>
            <div className="bg-cream-card border border-teal-dark p-2 text-center font-mono">
              {hasCatalyst ? (
                <span className="text-pink-hover font-extrabold text-lg">
                  {speedupRatio > 1000000
                    ? `${(speedupRatio / 1000000).toFixed(1)} Juta × Lebih Cepat!`
                    : `${speedupRatio.toLocaleString('id-ID', { maximumFractionDigits: 0 })} × Lebih Cepat!`}
                </span>
              ) : (
                <span className="text-charcoal-500 font-bold text-sm">Laju Dasar (1×)</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Columns: Interactive Diagram */}
        <div className="lg:col-span-2 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 border-b border-charcoal-300 pb-2">
            <span className="text-xs font-mono font-bold text-charcoal-800">
              PROFIL KOORDINAT REAKSI vs ENERGI POTENSIAL
            </span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-teal font-bold">● Reaktan</span>
              <span className="text-pink-hover font-bold">● Kompleks Transisi</span>
              <span className="text-charcoal-900 font-bold">● Produk</span>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full h-80 bg-cream-card border border-teal/40 p-2">
            <svg className="w-full h-full" viewBox="0 0 500 260" preserveAspectRatio="none">
              {/* Axes */}
              <line x1="50" y1="230" x2="470" y2="230" stroke="#121C1C" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="230" stroke="#121C1C" strokeWidth="2" />

              <text x="470" y="245" fontSize="10" fontFamily="monospace" textAnchor="end" fill="#121C1C">Koordinat Reaksi →</text>
              <text x="20" y="25" fontSize="10" fontFamily="monospace" fill="#121C1C">Energi (kJ/mol) ↑</text>

              {/* Reactant Plateau */}
              <line x1="50" y1={yReactant} x2="110" y2={yReactant} stroke="#008080" strokeWidth="3" />
              <text x="75" y={yReactant - 8} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#008080">Reaktan</text>

              {/* Product Plateau */}
              <line x1="390" y1={yProduct} x2="460" y2={yProduct} stroke="#121C1C" strokeWidth="3" />
              <text x="415" y={yProduct - 8} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#121C1C">Produk</text>

              {/* Uncatalyzed Curve: (110, yReactant) -> (250, yUncatalyzedPeak) -> (390, yProduct) */}
              <path
                d={`M 110 ${yReactant} Q 180 ${yUncatalyzedPeak}, 250 ${yUncatalyzedPeak} T 390 ${yProduct}`}
                fill="none"
                stroke="#008080"
                strokeWidth={hasCatalyst ? "1.5" : "3.5"}
                strokeDasharray={hasCatalyst ? "4 4" : "none"}
                strokeOpacity={hasCatalyst ? "0.4" : "1"}
              />

              {/* Catalyzed Curve (if enabled) */}
              {hasCatalyst && (
                <path
                  d={`M 110 ${yReactant} Q 180 ${yCatalyzedPeak}, 250 ${yCatalyzedPeak} T 390 ${yProduct}`}
                  fill="none"
                  stroke="#FF69B4"
                  strokeWidth="3.5"
                />
              )}

              {/* Energy Markers and Arrows */}
              {/* Ea Uncatalyzed line */}
              <line x1="250" y1={yUncatalyzedPeak} x2="310" y2={yUncatalyzedPeak} stroke="#005959" strokeDasharray="2 2" />
              <line x1="110" y1={yReactant} x2="310" y2={yReactant} stroke="#005959" strokeDasharray="2 2" />
              <line x1="300" y1={yUncatalyzedPeak} x2="300" y2={yReactant} stroke="#008080" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="315" y={(yUncatalyzedPeak + yReactant) / 2} fontSize="10" fontFamily="monospace" fill="#008080" fontWeight="bold">
                Ea = {uncatalyzedEa} kJ
              </text>

              {/* Ea Catalyzed line */}
              {hasCatalyst && (
                <>
                  <line x1="250" y1={yCatalyzedPeak} x2="190" y2={yCatalyzedPeak} stroke="#FF69B4" strokeDasharray="2 2" />
                  <line x1="200" y1={yCatalyzedPeak} x2="200" y2={yReactant} stroke="#FF69B4" strokeWidth="2" />
                  <text x="135" y={(yCatalyzedPeak + yReactant) / 2} fontSize="10" fontFamily="monospace" fill="#FF1493" fontWeight="bold">
                    Ea* = {catalyzedEa} kJ
                  </text>
                </>
              )}

              {/* Delta H line */}
              <line x1="390" y1={yProduct} x2="460" y2={yProduct} stroke="#555" strokeDasharray="2 2" />
              <line x1="440" y1={yReactant} x2="440" y2={yProduct} stroke="#121C1C" strokeWidth="2" />
              <text x="448" y={(yReactant + yProduct) / 2 + 4} fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#121C1C">
                ΔH = {deltaH} kJ
              </text>

              {/* Animated Molecule Ball */}
              {isRolling && (
                <g>
                  <circle cx={ballX} cy={ballY} r="9" fill={hasCatalyst ? "#FF69B4" : "#008080"} stroke="#121C1C" strokeWidth="2" />
                  <text x={ballX} y={ballY + 3} fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">
                    AB*
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Explanation Box */}
          <div className="mt-4 bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800 space-y-1">
            <div>
              <strong>Kaidah Arrhenius:</strong> Katalisator menurunkan puncak bukit aktivasi dari <strong>{uncatalyzedEa} kJ/mol</strong> menjadi <strong>{catalyzedEa} kJ/mol</strong>.
            </div>
            <div>
              Perhatikan bahwa nilai <strong>ΔH = {deltaH} kJ/mol</strong> tetap persis sama, membuktikan katalis tidak mempengaruhi termodinamika/kesetimbangan, melainkan hanya mempercepat kinetika reaksi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
