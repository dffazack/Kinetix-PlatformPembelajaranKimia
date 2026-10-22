'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SimulationHub from '@/components/simulations/SimulationHub';
import { FlaskConical, Atom, Sparkles } from 'lucide-react';

function ExperimentContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as any;

  const validTypes = [
    'CONCENTRATION_TIME',
    'COLLISION_THEORY',
    'ACTIVATION_ENERGY',
    'FACTORS_REACTION',
    'RATE_LAW',
    'INDUSTRIAL_KINETICS',
  ];

  const initialType = validTypes.includes(typeParam) ? typeParam : 'FACTORS_REACTION';

  return <SimulationHub initialType={initialType} />;
}

export default function ExperimentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow bg-kinetics-radar relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-pink text-charcoal-900 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border border-charcoal-900 shadow-brutal-teal-sm">
              <FlaskConical className="w-3.5 h-3.5" />
              Laboratorium Virtual Kinetika Kimia 2D
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900">
              Simulasi Eksperimen Laju Reaksi
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-700 font-sans max-w-2xl leading-relaxed">
              Atur variabel eksperimen (Konsentrasi reaktan, Suhu termal, Luas Permukaan bidang sentuh, Katalis) dan amati langsung respons partikel submikroskopik, laju pembentukan gas, serta kurva kinetika real-time.
            </p>
          </div>

          <div className="bg-charcoal-900 text-cream border-2 border-teal p-3.5 text-xs font-mono space-y-1 shadow-brutal-dark">
            <div className="text-teal-light font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 bg-pink inline-block" />
              ENJIN FISIKA SUBMIKROSKOPIK
            </div>
            <div className="text-charcoal-300 text-[11px]">
              Diferensial Runge-Kutta & Tumbukan Elastis 2D
            </div>
          </div>
        </div>

        {/* Quick Chemistry Ticker Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-charcoal-300 mt-4 font-mono text-[11px]">
          <span className="bg-teal text-white px-2 py-0.5 font-bold uppercase">
            Hukum Kinetika:
          </span>
          <span className="kinetix-formula-tag">v = k[A]ᵐ[B]ⁿ</span>
          <span className="kinetix-formula-tag">Z_eff = Z · e^(-Ea/RT) · p</span>
          <span className="kinetix-formula-tag">v₂ = v₁ · 2^((T₂ - T₁)/10)</span>
          <span className="kinetix-formula-tag">Ea (Katalis) &lt; Ea</span>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 font-mono text-center">Memuat modul laboratorium interaktif...</div>}>
        <ExperimentContent />
      </Suspense>
    </div>
  );
}
