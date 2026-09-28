'use client';

import React, { useState } from 'react';
import { Factory, Car, Gauge, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function IndustrialKineticsSim() {
  const [activeTab, setActiveTab] = useState<'haber' | 'converter'>('haber');

  // Haber-Bosch state
  const [temperature, setTemperature] = useState<number>(425); // Celsius (250 - 600)
  const [pressure, setPressure] = useState<number>(200); // atm (50 - 300)
  const [hasFeCatalyst, setHasFeCatalyst] = useState<boolean>(true);

  // Automotive Converter state
  const [exhaustTemp, setExhaustTemp] = useState<number>(350); // Celsius (100 - 600)
  const [engineLoad, setEngineLoad] = useState<'low' | 'medium' | 'high'>('medium');

  // Haber-Bosch Calculations
  // Equilibrium yield decreases with temp (exothermic), but increases with pressure
  const eqYieldPercent = Math.max(
    5,
    Math.min(95, 90 - (temperature - 250) * 0.18 + (pressure - 50) * 0.12)
  );

  // Reaction rate increases exponentially with temp (Arrhenius) and presence of catalyst
  const rateFactor = Math.exp((temperature - 250) / 75) * (hasFeCatalyst ? 4.5 : 0.6);

  // Effective hourly production is a trade-off between kinetic rate and thermodynamic yield
  const hourlyOutputTons = Math.round(((eqYieldPercent * rateFactor) / 22) * 10) / 10;
  const isOptimalZone = temperature >= 400 && temperature <= 460 && pressure >= 180 && hasFeCatalyst;

  // Catalytic Converter Calculations
  // Light-off temperature is ~300°C. Below that, conversion is poor.
  const conversionEfficiency = Math.max(
    5,
    Math.min(99, Math.round(100 / (1 + Math.exp(-(exhaustTemp - 300) / 35))))
  );

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 6
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Aplikasi Kinetika Kimia: Industri & Teknologi Modern
          </h3>
          <p className="text-sm text-charcoal-600">
            Eksplorasi kompromi kinetika-termodinamika pada sintesis amonia Haber-Bosch dan netralisasi emisi gas buang otomotif.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('haber')}
            className={`kinetix-btn-secondary ${activeTab === 'haber' ? 'bg-teal text-white border-teal-dark shadow-sm' : ''}`}
          >
            <Factory className="w-4 h-4" />
            REAKTOR HABER-BOSCH
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`kinetix-btn-secondary ${activeTab === 'converter' ? 'bg-teal text-white border-teal-dark shadow-sm' : ''}`}
          >
            <Car className="w-4 h-4" />
            CATALYTIC CONVERTER
          </button>
        </div>
      </div>

      {activeTab === 'haber' ? (
        /* ================= HABER-BOSCH PROCESS ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-cream border-2 border-teal p-5 space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
              <Gauge className="w-4 h-4 text-teal" /> Parameter Operasi Reaktor Industri
            </h4>

            {/* Suhu Reaktor */}
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span>Suhu Reaktor (T)</span>
                <span className="text-pink-hover font-extrabold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="250"
                max="600"
                step="10"
                value={temperature}
                onChange={e => setTemperature(parseInt(e.target.value))}
                className="w-full accent-pink cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
                <span>250°C (Laju Lambat)</span>
                <span className="text-teal font-bold">400-450°C (Kompromi)</span>
                <span>600°C (Rendemen Drop)</span>
              </div>
            </div>

            {/* Tekanan Reaktor */}
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span>Tekanan Sistem (P)</span>
                <span className="text-teal font-extrabold">{pressure} atm</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={pressure}
                onChange={e => setPressure(parseInt(e.target.value))}
                className="w-full accent-teal cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
                <span>50 atm</span>
                <span>200 atm (Standar Pabrik)</span>
                <span>300 atm</span>
              </div>
            </div>

            {/* Katalis Fe / Al2O3 */}
            <div className="bg-cream-card border-2 border-teal-dark p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-mono font-bold uppercase text-charcoal-900">
                    Katalis Porous Besi (Fe)
                  </span>
                  <span className="text-[11px] text-charcoal-500">
                    Memutus ikatan rangkap tiga N≡N
                  </span>
                </div>
                <button
                  onClick={() => setHasFeCatalyst(!hasFeCatalyst)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border-2 transition-all ${
                    hasFeCatalyst
                      ? 'bg-pink text-charcoal-900 border-charcoal-900 font-extrabold'
                      : 'bg-cream-dark text-charcoal-600 border-charcoal-400'
                  }`}
                >
                  {hasFeCatalyst ? 'TERPASANG' : 'LEPAS'}
                </button>
              </div>
            </div>

            {/* Status Optimal Alert */}
            <div
              className={`p-3 border-2 font-mono text-xs ${
                isOptimalZone
                  ? 'bg-teal/15 border-teal text-teal-deep'
                  : 'bg-cream-card border-charcoal-500 text-charcoal-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {isOptimalZone ? (
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-pink-hover" />
                )}
                {isOptimalZone ? 'TITIK KOMPROMI OPTIMUM TERCAPAI' : 'DI LUAR TITIK OPTIMUM'}
              </div>
              <p className="text-[11px]">
                {isOptimalZone
                  ? 'Kondisi 400-450°C, 200 atm, dan katalis Fe menghasilkan laju reaksi ekonomis dengan rendemen stabil!'
                  : 'Pada suhu terlalu rendah laju amat lambat, sedangkan suhu terlalu tinggi menghancurkan rendemen kesetimbangan.'}
              </p>
            </div>
          </div>

          {/* Right Column: Visual Reactor Diagram & Telemetry */}
          <div className="lg:col-span-7 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
            <div className="text-xs font-mono font-bold text-charcoal-800 uppercase mb-3 flex items-center justify-between border-b border-charcoal-300 pb-2">
              <span>Diagram Reaktor Haber-Bosch: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)</span>
              <span className="text-pink-hover font-mono">ΔH = -92 kJ/mol</span>
            </div>

            {/* Digital Telemetry Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-cream-card border-2 border-charcoal-800 p-3 text-center">
                <div className="text-[10px] font-mono uppercase text-charcoal-500">Rendemen Teoritis</div>
                <div className="text-xl font-mono font-extrabold text-teal-dark">{eqYieldPercent.toFixed(0)}%</div>
              </div>
              <div className="bg-cream-card border-2 border-charcoal-800 p-3 text-center">
                <div className="text-[10px] font-mono uppercase text-charcoal-500">Faktor Laju (v)</div>
                <div className="text-xl font-mono font-extrabold text-charcoal-900">{rateFactor.toFixed(1)}×</div>
              </div>
              <div className="bg-pink/20 border-2 border-pink p-3 text-center">
                <div className="text-[10px] font-mono uppercase text-charcoal-900 font-bold">Produksi Bersih</div>
                <div className="text-xl font-mono font-extrabold text-pink-hover">{hourlyOutputTons} Ton/Jam</div>
              </div>
            </div>

            {/* SVG Reactor Visual */}
            <div className="relative w-full h-44 bg-[#FAF8EE] border border-teal/40 p-2 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 450 150">
                {/* Gas Inflow pipes */}
                <rect x="20" y="45" width="80" height="15" fill="#008080" />
                <text x="60" y="40" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#008080" fontWeight="bold">
                  N₂ + 3 H₂ Masuk
                </text>

                {/* Heavy High-Pressure Vessel */}
                <rect x="100" y="20" width="180" height="110" fill="#E2DDB2" stroke="#121C1C" strokeWidth="3" />
                <rect x="110" y="30" width="160" height="90" fill="#FAF8EE" stroke="#005959" strokeWidth="2" />

                {/* Catalyst Bed (Iron grids) */}
                {hasFeCatalyst && (
                  <g fill="#A39D80" stroke="#005959" strokeWidth="1">
                    <rect x="130" y="45" width="120" height="15" />
                    <rect x="130" y="70" width="120" height="15" />
                    <rect x="130" y="95" width="120" height="15" />
                    <text x="190" y="56" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">
                      Lapisan Katalis Fe
                    </text>
                  </g>
                )}

                {/* Output Ammonia pipe */}
                <rect x="280" y="65" width="90" height="20" fill="#FF69B4" stroke="#121C1C" strokeWidth="2" />
                <text x="325" y="58" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#FF1493" fontWeight="bold">
                  2 NH₃ Terbentuk
                </text>

                <text x="190" y="142" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#121C1C">
                  Bejana Reaksi Tekanan Tinggi ({pressure} atm)
                </text>
              </svg>
            </div>

            <div className="mt-4 bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800">
              <strong>Prinsip Kinetika Industri:</strong> Mengapa pabrik tidak beroperasi pada suhu 150°C agar rendemennya 98%? Karena pada 150°C waktu paruh reaksi mencapai ribuan hari! Pengorbanan rendemen pada 450°C dikompensasi oleh kecepatan laju reaksi yang luar biasa cepat dengan daur ulang sisa gas yang belum bereaksi.
            </div>
          </div>
        </div>
      ) : (
        /* ================= CATALYTIC CONVERTER ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-cream border-2 border-teal p-5 space-y-5">
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
              <Car className="w-4 h-4 text-teal" /> Kondisi Gas Buang Kendaraan
            </h4>

            {/* Exhaust Temperature */}
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span>Suhu Gas Buang Knalpot</span>
                <span className="text-pink-hover font-extrabold">{exhaustTemp}°C</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                step="20"
                value={exhaustTemp}
                onChange={e => setExhaustTemp(parseInt(e.target.value))}
                className="w-full accent-pink cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
                <span>100°C (Cold Start)</span>
                <span className="text-teal font-bold">~300°C (Light-off)</span>
                <span>600°C (Optimal)</span>
              </div>
            </div>

            {/* Conversion Efficiency Gauge */}
            <div className="bg-cream-card border-2 border-teal-dark p-4 space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span>Efisiensi Netralisasi Racun:</span>
                <span className={conversionEfficiency >= 85 ? 'text-teal font-extrabold' : 'text-pink-hover font-extrabold'}>
                  {conversionEfficiency}%
                </span>
              </div>
              <div className="w-full bg-cream-dark h-4 border border-teal-dark">
                <div
                  className="h-full bg-teal transition-all duration-300"
                  style={{ width: `${conversionEfficiency}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-charcoal-600 font-mono">
                {exhaustTemp < 280
                  ? '⚠️ Katalis belum mencapai "Light-Off Temperature" (suhu aktif minimum). Emisi CO dan NOx masih lolos tinggi.'
                  : '✅ Katalis aktif bekerja! Logam Pt/Pd/Rh mengoksidasi CO menjadi CO₂ dan mereduksi NO menjadi N₂ bebas.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
            <div className="text-xs font-mono font-bold text-charcoal-800 uppercase mb-3 border-b border-charcoal-300 pb-2">
              Mekanisme Katalitik Kisi Keramik Berpori (Honeycomb Pt/Rh)
            </div>

            {/* Chemical reaction equations */}
            <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
              <div className="bg-cream-card border-2 border-teal p-3">
                <div className="font-bold text-teal-dark mb-1">Oksidasi Karbon Monoksida:</div>
                <div className="text-charcoal-800">2 CO(g) + O₂(g) → 2 CO₂(g)</div>
                <div className="text-[10px] text-charcoal-500 mt-1">Katalis: Logam Platinum (Pt)</div>
              </div>
              <div className="bg-cream-card border-2 border-pink p-3">
                <div className="font-bold text-pink-hover mb-1">Reduksi Nitrogen Oksida:</div>
                <div className="text-charcoal-800">2 NO(g) → N₂(g) + O₂(g)</div>
                <div className="text-[10px] text-charcoal-500 mt-1">Katalis: Logam Rhodium (Rh)</div>
              </div>
            </div>

            <div className="bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800">
              <strong>Kinetika Heterogen:</strong> Molekul gas racun teradsorpsi pada permukaan padat katalis logam mulia, meregangkan ikatan kovalennya sehingga energi aktivasi reaksi penguraian terpangkas drastis. Reaksi yang tadinya membutuhkan waktu jam/hari terjadi dalam milidetik di knalpot!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
