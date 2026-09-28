'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, PlusCircle, Thermometer, Layers, Beaker, CheckCircle2 } from 'lucide-react';

interface TrialResult {
  id: number;
  label: string;
  conc: number;
  temp: number;
  surface: 'powder' | 'granule' | 'chunk';
  catalyst: boolean;
  timeTo50ml: number; // seconds
  maxRate: number; // mL/s
}

export default function FactorsReactionSim() {
  // 4 Core Variable Inputs (PRD Requirements)
  const [concentration, setConcentration] = useState<number>(1.0); // M (0.2 - 3.0)
  const [temperature, setTemperature] = useState<number>(25); // Celsius (10 - 80)
  const [surfaceArea, setSurfaceArea] = useState<'chunk' | 'granule' | 'powder'>('granule');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);

  // Experiment state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gasVolume, setGasVolume] = useState<number>(0); // 0 - 100 mL
  const [curvePoints, setCurvePoints] = useState<{ t: number; v: number }[]>([]);
  const [savedTrials, setSavedTrials] = useState<TrialResult[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Multiplier calculations based on physical chemistry
  // 1. Surface area factor:
  const surfaceMultiplier = surfaceArea === 'powder' ? 3.0 : surfaceArea === 'granule' ? 1.5 : 0.6;
  // 2. Temperature factor (approx 2x per 10°C rule):
  const tempMultiplier = Math.pow(2.0, (temperature - 25) / 10);
  // 3. Concentration factor (rate proportional to [HCl]^1.2):
  const concMultiplier = Math.pow(concentration, 1.2);
  // 4. Catalyst factor:
  const catalystMultiplier = hasCatalyst ? 2.5 : 1.0;

  // Base rate coefficient (mL of CO2 per second)
  const rateFactor = 1.8 * surfaceMultiplier * tempMultiplier * concMultiplier * catalystMultiplier;

  const handleReset = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setElapsedTime(0);
    setGasVolume(0);
    setCurvePoints([{ t: 0, v: 0 }]);
  };

  useEffect(() => {
    handleReset();
  }, [concentration, temperature, surfaceArea, hasCatalyst]);

  // Run experiment loop
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => {
          const nextTime = Math.round((prevTime + 0.2) * 10) / 10;

          // Gas volume accumulates asymptotically towards 80 mL limit
          const maxVol = 80;
          // Differential equation: dV/dt = rateFactor * (1 - V/maxVol)
          const newVol = Math.min(maxVol, maxVol * (1 - Math.exp((-rateFactor * nextTime) / maxVol)));

          setGasVolume(newVol);
          setCurvePoints(prev => [...prev, { t: nextTime, v: newVol }]);

          if (newVol >= maxVol - 0.5 || nextTime >= 60) {
            setIsRunning(false);
          }

          return nextTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, rateFactor]);

  const saveCurrentTrial = () => {
    // Find time to 50mL
    const pt50 = curvePoints.find(p => p.v >= 50);
    const time50 = pt50 ? pt50.t : elapsedTime;

    const newTrial: TrialResult = {
      id: Date.now(),
      label: `Percobaan #${savedTrials.length + 1}`,
      conc: concentration,
      temp: temperature,
      surface: surfaceArea,
      catalyst: hasCatalyst,
      timeTo50ml: time50,
      maxRate: rateFactor,
    };
    setSavedTrials(prev => [...prev, newTrial]);
  };

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 4 - Laboratorium Reaksi
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Investigasi 4 Faktor Laju Reaksi: CaCO₃(s) + 2 HCl(aq)
          </h3>
          <p className="text-sm text-charcoal-600">
            Manipulasi Konsentrasi, Suhu, Luas Permukaan, dan Katalis untuk mengamati laju produksi gas $CO_2$ pada tabung suntik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`kinetix-btn-primary ${isRunning ? 'bg-pink text-charcoal-900 border-charcoal-900 hover:bg-pink-hover' : ''}`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'HENTIKAN' : 'MULAI REAKSI'}
          </button>
          <button onClick={handleReset} className="kinetix-btn-secondary">
            <RotateCcw className="w-4 h-4" />
            RESET
          </button>
          <button
            onClick={saveCurrentTrial}
            disabled={gasVolume < 10}
            className="kinetix-btn-pink disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            SIMPAN DATA
          </button>
        </div>
      </div>

      {/* Main Lab Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 4 Variable Sliders & Selectors (PRD) */}
        <div className="lg:col-span-4 bg-cream border-2 border-teal p-5 space-y-5">
          <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
            <Beaker className="w-4 h-4 text-teal" /> Kontrol 4 Variabel Bebas
          </h4>

          {/* 1. Konsentrasi Larutan HCl */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>1. Konsentrasi [HCl]</span>
              <span className="text-teal font-extrabold">{concentration.toFixed(1)} M</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.2"
              value={concentration}
              disabled={isRunning}
              onChange={e => setConcentration(parseFloat(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>0.2 M (Encer)</span>
              <span>1.5 M</span>
              <span>3.0 M (Pekat)</span>
            </div>
          </div>

          {/* 2. Suhu Larutan */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>2. Suhu Larutan (T)</span>
              <span className="text-pink-hover font-extrabold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={temperature}
              disabled={isRunning}
              onChange={e => setTemperature(parseInt(e.target.value))}
              className="w-full accent-pink cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>10°C (Dingin)</span>
              <span>25°C (Kamar)</span>
              <span>80°C (Panas)</span>
            </div>
          </div>

          {/* 3. Bentuk Fisik / Luas Permukaan */}
          <div>
            <label className="block text-xs font-mono font-bold mb-2">
              3. Bentuk Padatan CaCO₃ (Luas Permukaan)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'chunk', label: 'Bongkahan' },
                { id: 'granule', label: 'Butiran' },
                { id: 'powder', label: 'Serbuk Halus' },
              ].map(opt => (
                <button
                  key={opt.id}
                  disabled={isRunning}
                  onClick={() => setSurfaceArea(opt.id as any)}
                  className={`py-2 text-[11px] font-mono font-bold border-2 transition-all ${
                    surfaceArea === opt.id
                      ? 'bg-teal text-white border-teal-dark shadow-sm'
                      : 'bg-cream-card text-charcoal-700 border-charcoal-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Katalisator */}
          <div className="bg-cream-card border-2 border-teal-dark p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-mono font-bold uppercase text-charcoal-900">
                  4. Katalis Cu²⁺
                </span>
                <span className="text-[11px] text-charcoal-500">
                  {hasCatalyst ? 'Katalis ditambahkan (+2.5×)' : 'Tanpa katalis'}
                </span>
              </div>
              <button
                onClick={() => setHasCatalyst(!hasCatalyst)}
                disabled={isRunning}
                className={`px-3 py-1.5 text-xs font-mono font-bold border-2 transition-all ${
                  hasCatalyst
                    ? 'bg-pink text-charcoal-900 border-charcoal-900 font-extrabold shadow-sm'
                    : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                }`}
              >
                {hasCatalyst ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>
          </div>

          {/* Digital Telemetry Readout */}
          <div className="bg-cream-card border-2 border-charcoal-900 p-3 space-y-2 font-mono">
            <div className="flex justify-between text-xs">
              <span>Waktu Reaksi:</span>
              <span className="font-extrabold text-charcoal-900">{elapsedTime.toFixed(1)} detik</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Volume Gas CO₂:</span>
              <span className="font-extrabold text-teal-dark">{gasVolume.toFixed(1)} mL</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Laju Reaksi Indeks:</span>
              <span className="font-extrabold text-pink-hover">{rateFactor.toFixed(2)} mL/s</span>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Apparatus & Live Curve Plot */}
        <div className="lg:col-span-8 space-y-6">
          {/* Animated Physical Apparatus Visualization */}
          <div className="bg-cream border-2 border-teal-dark p-5 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-charcoal-800 uppercase mb-3 flex items-center justify-between border-b border-charcoal-300 pb-2">
              <span>Visualisasi Alat: Erlenmeyer & Tabung Suntik Gas (Gas Syringe)</span>
              <span className="text-teal font-mono">CO₂ Terkumpul: {gasVolume.toFixed(1)} / 80 mL</span>
            </div>

            {/* SVG Apparatus Graphic */}
            <div className="relative w-full h-48 bg-[#FAF8EE] border border-teal/40 flex items-center justify-center p-3">
              <svg className="w-full h-full" viewBox="0 0 540 180">
                {/* 1. ERLENMEYER FLASK (Left) */}
                {/* Base / Neck */}
                <path
                  d="M 90 40 L 110 40 L 110 70 L 150 145 L 50 145 L 90 70 Z"
                  fill="rgba(0, 128, 128, 0.08)"
                  stroke="#005959"
                  strokeWidth="3"
                />
                {/* Liquid Level */}
                <path
                  d="M 68 115 L 132 115 L 146 142 L 54 142 Z"
                  fill="rgba(0, 128, 128, 0.25)"
                />

                {/* Reactant Solid chunks at bottom */}
                {surfaceArea === 'chunk' && (
                  <g fill="#A39D80" stroke="#4F4A32" strokeWidth="1.5">
                    <rect x="70" y="132" width="18" height="10" />
                    <rect x="95" y="130" width="22" height="12" />
                  </g>
                )}
                {surfaceArea === 'granule' && (
                  <g fill="#A39D80">
                    <circle cx="75" cy="138" r="4" />
                    <circle cx="88" cy="136" r="5" />
                    <circle cx="102" cy="137" r="4" />
                    <circle cx="116" cy="136" r="4.5" />
                  </g>
                )}
                {surfaceArea === 'powder' && (
                  <g fill="#A39D80">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <circle key={i} cx={65 + i * 4} cy={138 + (i % 2) * 2} r="2" />
                    ))}
                  </g>
                )}

                {/* Bubbles in liquid when running */}
                {isRunning && (
                  <g fill="rgba(255, 255, 255, 0.9)" stroke="#008080" strokeWidth="0.8">
                    <circle cx="80" cy={130 - (elapsedTime * 30) % 25} r="2.5" />
                    <circle cx="95" cy={132 - (elapsedTime * 45) % 25} r="3.5" />
                    <circle cx="110" cy={128 - (elapsedTime * 35) % 25} r="2" />
                    <circle cx="120" cy={134 - (elapsedTime * 50) % 25} r="3" />
                  </g>
                )}

                {/* Stopper and Delivery Tube */}
                <rect x="92" y="32" width="16" height="10" fill="#7C6045" stroke="#3F2E1E" strokeWidth="1.5" />
                {/* Connecting glass tube */}
                <path
                  d="M 100 32 L 100 15 L 220 15 L 220 65 L 250 65"
                  fill="none"
                  stroke="#5F7575"
                  strokeWidth="4"
                />

                {/* 2. GAS SYRINGE (Right) */}
                {/* Outer Glass Barrel */}
                <rect x="250" y="50" width="220" height="30" fill="rgba(255, 255, 255, 0.6)" stroke="#005959" strokeWidth="3" />
                {/* Graduation marks on barrel */}
                {[0, 20, 40, 60, 80, 100].map((val, idx) => {
                  const gx = 250 + (val / 100) * 180;
                  return (
                    <g key={val}>
                      <line x1={gx} y1="50" x2={gx} y2="60" stroke="#005959" strokeWidth="1.5" />
                      <text x={gx} y="44" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#005959">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Plunger (Piston): moves to the right as gas volume increases */}
                {(() => {
                  const plungerX = 250 + (gasVolume / 100) * 180;
                  return (
                    <g>
                      {/* Plunger head */}
                      <rect x={plungerX} y="52" width="8" height="26" fill="#121C1C" />
                      {/* Plunger shaft */}
                      <rect x={plungerX + 8} y="62" width="60" height="6" fill="#444" />
                      {/* Plunger handle */}
                      <rect x={plungerX + 68} y="50" width="6" height="30" fill="#121C1C" />
                      {/* Gas zone inside syringe */}
                      <rect x="250" y="52" width={Math.max(0, plungerX - 250)} height="26" fill="rgba(255, 105, 180, 0.25)" />
                    </g>
                  );
                })()}

                {/* Labels on SVG */}
                <text x="100" y="165" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold" fill="#005959">
                  Labu Erlenmeyer
                </text>
                <text x="360" y="105" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold" fill="#005959">
                  Tabung Suntik Gas (CO₂ Syringe)
                </text>
              </svg>
            </div>
          </div>

          {/* Dynamic Curve Graph: Volume Gas CO2 vs Time */}
          <div className="bg-cream border-2 border-teal-dark p-5">
            <div className="flex items-center justify-between mb-2 border-b border-charcoal-300 pb-2">
              <span className="text-xs font-mono font-bold text-charcoal-800">
                GRAFIK PRODUKSI GAS CO₂ TERHADAP WAKTU (V vs t)
              </span>
              <span className="text-xs font-mono text-teal-dark font-bold">
                Gradien Awal: {rateFactor.toFixed(2)} mL/s
              </span>
            </div>

            <div className="relative w-full h-48 bg-cream-card border border-teal/40 p-2">
              <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* Horizontal Grid */}
                {[30, 60, 90, 120, 150].map(y => (
                  <line key={`gy-${y}`} x1="40" y1={y} x2="480" y2={y} stroke="#008080" strokeOpacity="0.12" strokeDasharray="3 3" />
                ))}

                {/* Axes */}
                <line x1="40" y1="150" x2="485" y2="150" stroke="#121C1C" strokeWidth="2" />
                <line x1="40" y1="15" x2="40" y2="150" stroke="#121C1C" strokeWidth="2" />

                <text x="485" y="165" fontSize="9" fontFamily="monospace" textAnchor="end" fill="#121C1C">Waktu (s) →</text>
                <text x="10" y="20" fontSize="9" fontFamily="monospace" fill="#121C1C">V (mL)</text>
                <text x="32" y="153" fontSize="8" fontFamily="monospace" textAnchor="end" fill="#5F7575">0</text>
                <text x="32" y="90" fontSize="8" fontFamily="monospace" textAnchor="end" fill="#5F7575">40</text>
                <text x="32" y="28" fontSize="8" fontFamily="monospace" textAnchor="end" fill="#5F7575">80</text>

                {/* Live Curve */}
                {curvePoints.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="3.5"
                    points={curvePoints
                      .map(pt => {
                        const x = 40 + (pt.t / 40) * 440;
                        const y = 150 - (pt.v / 80) * 125;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Saved Trials Comparison Table */}
          {savedTrials.length > 0 && (
            <div className="bg-cream-card border-2 border-teal p-4 space-y-2">
              <h5 className="font-mono font-bold text-xs uppercase text-teal-deep">
                Tabel Perbandingan Data Hasil Percobaan Siswa
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse border border-charcoal-400">
                  <thead className="bg-teal text-white">
                    <tr>
                      <th className="border border-teal-dark p-1.5 text-left">Label</th>
                      <th className="border border-teal-dark p-1.5">[HCl]</th>
                      <th className="border border-teal-dark p-1.5">Suhu</th>
                      <th className="border border-teal-dark p-1.5">Bentuk</th>
                      <th className="border border-teal-dark p-1.5">Katalis</th>
                      <th className="border border-teal-dark p-1.5">Waktu ke 50 mL</th>
                      <th className="border border-teal-dark p-1.5">Indeks Laju</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedTrials.map((t, i) => (
                      <tr key={t.id} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-cream'}>
                        <td className="border border-charcoal-300 p-1.5 font-bold">{t.label}</td>
                        <td className="border border-charcoal-300 p-1.5">{t.conc} M</td>
                        <td className="border border-charcoal-300 p-1.5">{t.temp}°C</td>
                        <td className="border border-charcoal-300 p-1.5 uppercase">{t.surface}</td>
                        <td className="border border-charcoal-300 p-1.5">{t.catalyst ? 'Ya' : 'Tidak'}</td>
                        <td className="border border-charcoal-300 p-1.5 font-bold text-teal-dark">{t.timeTo50ml.toFixed(1)} s</td>
                        <td className="border border-charcoal-300 p-1.5 font-bold text-pink-hover">{t.maxRate.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
