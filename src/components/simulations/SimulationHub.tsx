'use client';

import React, { useState } from 'react';
import ConcentrationTimeSim from './ConcentrationTimeSim';
import CollisionTheorySim from './CollisionTheorySim';
import ActivationEnergySim from './ActivationEnergySim';
import FactorsReactionSim from './FactorsReactionSim';
import RateLawSim from './RateLawSim';
import IndustrialKineticsSim from './IndustrialKineticsSim';
import { Activity, Flame, Zap, Beaker, Calculator, Factory } from 'lucide-react';

interface SimulationHubProps {
  initialType?: 'CONCENTRATION_TIME' | 'COLLISION_THEORY' | 'ACTIVATION_ENERGY' | 'FACTORS_REACTION' | 'RATE_LAW' | 'INDUSTRIAL_KINETICS';
}

export default function SimulationHub({ initialType = 'FACTORS_REACTION' }: SimulationHubProps) {
  const [activeType, setActiveType] = useState(initialType);

  const sims = [
    {
      id: 'CONCENTRATION_TIME',
      kbNumber: 1,
      title: 'Konsentrasi vs Waktu',
      icon: Activity,
      desc: 'Pengurangan reaktan & pertambahan produk seiring berjalannya waktu',
    },
    {
      id: 'COLLISION_THEORY',
      kbNumber: 2,
      title: 'Teori Tumbukan 2D',
      icon: Flame,
      desc: 'Simulasi mikroskopis orientasi molekul dan energi aktivasi minimum',
    },
    {
      id: 'ACTIVATION_ENERGY',
      kbNumber: 3,
      title: 'Energi Aktivasi (Ea)',
      icon: Zap,
      desc: 'Profil bukit rintangan energi dan mekanisme kerja katalisator',
    },
    {
      id: 'FACTORS_REACTION',
      kbNumber: 4,
      title: '4 Faktor Laju Reaksi',
      icon: Beaker,
      desc: 'Manipulasi konsentrasi, suhu, luas permukaan, dan katalis dalam erlenmeyer',
    },
    {
      id: 'RATE_LAW',
      kbNumber: 5,
      title: 'Hukum Laju & Orde',
      icon: Calculator,
      desc: 'Pemecahan orde reaksi matematis dari data eksperimental awal',
    },
    {
      id: 'INDUSTRIAL_KINETICS',
      kbNumber: 6,
      title: 'Kinetika Industri',
      icon: Factory,
      desc: 'Optimasi reaktor Haber-Bosch amonia dan konverter emisi knalpot',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Selector Bar */}
      <div className="bg-cream-card border-2 border-teal-dark p-4 kinetix-shadow">
        <div className="text-xs font-mono font-bold uppercase text-charcoal-600 mb-3">
          PILIH MODUL LABORATORIUM SIMULASI VIRTUAL:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {sims.map(s => {
            const Icon = s.icon;
            const isSelected = activeType === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveType(s.id as any)}
                className={`p-3 text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal text-white border-teal-dark shadow-brutal-teal-sm'
                    : 'bg-cream text-charcoal-800 border-charcoal-400 hover:border-teal'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 font-bold uppercase ${
                      isSelected ? 'bg-pink text-charcoal-900' : 'bg-charcoal-800 text-cream'
                    }`}
                  >
                    KB {s.kbNumber}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs leading-tight line-clamp-1">{s.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Simulation Component */}
      <div>
        {activeType === 'CONCENTRATION_TIME' && <ConcentrationTimeSim />}
        {activeType === 'COLLISION_THEORY' && <CollisionTheorySim />}
        {activeType === 'ACTIVATION_ENERGY' && <ActivationEnergySim />}
        {activeType === 'FACTORS_REACTION' && <FactorsReactionSim />}
        {activeType === 'RATE_LAW' && <RateLawSim />}
        {activeType === 'INDUSTRIAL_KINETICS' && <IndustrialKineticsSim />}
      </div>
    </div>
  );
}
