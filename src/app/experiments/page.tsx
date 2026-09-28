'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SimulationHub from '@/components/simulations/SimulationHub';
import { FlaskConical } from 'lucide-react';

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
      <div className="bg-cream-card border-3 border-teal-dark p-6 sm:p-8 kinetix-shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-pink text-charcoal-900 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" />
              Laboratorium Virtual Kimia
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-charcoal-900">
              Simulasi Eksperimen Laju Reaksi
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 font-sans max-w-2xl leading-relaxed">
              Atur variabel eksperimen (Konsentrasi, Suhu, Luas Permukaan, Katalis) dan amati langsung respons partikel, volume gas $CO_2$, serta profil grafik kinetika.
            </p>
          </div>

          <div className="bg-cream border-2 border-teal p-3 text-xs font-mono">
            <div className="text-teal-dark font-bold">MODE: INTERAKTIF REAL-TIME</div>
            <div className="text-charcoal-500 text-[11px]">Enjin Simulasi HTML5 Canvas & Differential Physics</div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 font-mono text-center">Memuat modul laboratorium...</div>}>
        <ExperimentContent />
      </Suspense>
    </div>
  );
}
