'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Flame, Sparkles, Zap, RefreshCw, Activity, ArrowRight, Gauge } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'A' | 'B' | 'PRODUCT';
  size: number;
}

export default function KineticsHeroVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive parameters
  const [temperature, setTemperature] = useState<number>(300); // Kelvin (280 - 400)
  const [concentration, setConcentration] = useState<number>(1.0); // Molar (0.5 - 2.5)
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  
  // Real-time calculated kinetic parameters
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [effectiveCollisionCount, setEffectiveCollisionCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  // Theoretical calculated rate
  // v = k * [A]^1 * [B]^1 where k = A * exp(-Ea / RT)
  const baseEa = 50; // kJ/mol
  const activeEa = hasCatalyst ? 25 : baseEa;
  const R = 8.314; // J/(mol*K)
  const T = temperature;
  // Arrhenius factor fraction
  const boltzmannFactor = Math.exp((-activeEa * 1000) / (R * T));
  // Normalized rate index (arbitrary unit 0.1 - 99.9)
  const calculatedRate = (concentration * concentration * boltzmannFactor * 1e8).toFixed(2);

  // Particles state ref for continuous animation
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize particles based on concentration
  const initParticles = () => {
    const totalCount = Math.floor(concentration * 14);
    const newParticles: Particle[] = [];
    const width = 360;
    const height = 220;

    for (let i = 0; i < totalCount; i++) {
      const speedScale = (temperature / 300) * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.8 + Math.random() * 1.2) * speedScale;

      newParticles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        type: i % 2 === 0 ? 'A' : 'B',
        size: 5,
      });
    }
    particlesRef.current = newParticles;
    setProductCount(0);
    setCollisionCount(0);
    setEffectiveCollisionCount(0);
  };

  useEffect(() => {
    initParticles();
  }, [concentration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localCollisions = 0;
    let localEffective = 0;
    let localProducts = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with background color matching design system
      ctx.fillStyle = '#111818';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(0, 128, 128, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Speed adjustment factor based on temperature
      const speedMultiplier = temperature / 300;

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx * speedMultiplier;
        p1.y += p1.vy * speedMultiplier;

        // Bounce walls
        if (p1.x - p1.size < 0) {
          p1.x = p1.size;
          p1.vx *= -1;
        } else if (p1.x + p1.size > width) {
          p1.x = width - p1.size;
          p1.vx *= -1;
        }
        if (p1.y - p1.size < 0) {
          p1.y = p1.size;
          p1.vy *= -1;
        } else if (p1.y + p1.size > height) {
          p1.y = height - p1.size;
          p1.vy *= -1;
        }

        // Check particle-particle collisions
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p1.size + p2.size) {
            // Collision occurred
            localCollisions++;
            
            // Elastic bounce
            const tempVx = p1.vx;
            const tempVy = p1.vy;
            p1.vx = p2.vx;
            p1.vy = p2.vy;
            p2.vx = tempVx;
            p2.vy = tempVy;

            // Separate overlapping particles
            const overlap = (p1.size + p2.size - dist) / 2;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            p1.x -= nx * overlap;
            p1.y -= ny * overlap;
            p2.x += nx * overlap;
            p2.y += ny * overlap;

            // Is effective collision? (A + B -> Product)
            // Probability depends on Boltzmann factor (temperature) and catalyst
            const reactionProb = hasCatalyst ? 0.35 : (temperature >= 350 ? 0.18 : 0.05);

            if (
              ((p1.type === 'A' && p2.type === 'B') || (p1.type === 'B' && p2.type === 'A')) &&
              Math.random() < reactionProb
            ) {
              localEffective++;
              p1.type = 'PRODUCT';
              p2.type = 'PRODUCT';
              localProducts++;

              // Draw spark effect
              ctx.strokeStyle = '#FF69B4';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(p1.x, p1.y, 12, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }

        // Draw particle
        ctx.save();
        if (p1.type === 'A') {
          ctx.fillStyle = '#00A3A3'; // Teal
          ctx.shadowColor = '#008080';
          ctx.shadowBlur = 4;
        } else if (p1.type === 'B') {
          ctx.fillStyle = '#FF69B4'; // Pink
          ctx.shadowColor = '#FF1493';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = '#FFFDD0'; // Cream/Product
          ctx.shadowColor = '#FAF7E1';
          ctx.shadowBlur = 6;
        }

        // Draw sharp geometric square particle (no rounded corners)
        ctx.fillRect(p1.x - p1.size, p1.y - p1.size, p1.size * 2, p1.size * 2);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const statInterval = setInterval(() => {
      setCollisionCount(prev => prev + localCollisions);
      setEffectiveCollisionCount(prev => prev + localEffective);
      setProductCount(prev => prev + localProducts);
      localCollisions = 0;
      localEffective = 0;
      localProducts = 0;
    }, 500);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(statInterval);
    };
  }, [temperature, hasCatalyst]);

  return (
    <div className="bg-charcoal-900 text-cream border-3 border-teal p-4 sm:p-5 kinetix-shadow-dark flex flex-col justify-between space-y-4">
      {/* Top Header of Interactive Monitor */}
      <div className="flex items-center justify-between border-b border-charcoal-700 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-pink animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-teal-light">
            SIMULATOR TEORI TUMBUKAN & LAJU
          </span>
        </div>
        <div className="font-mono text-[11px] text-charcoal-300">
          Reaksi: <strong className="text-cream">A + B → AB‡ → Produk</strong>
        </div>
      </div>

      {/* Canvas Particle Chamber */}
      <div className="relative border-2 border-teal-dark overflow-hidden bg-charcoal-900">
        <canvas
          ref={canvasRef}
          width={360}
          height={180}
          className="w-full h-[180px] block"
        />

        {/* Floating Legend Badge */}
        <div className="absolute top-2 left-2 bg-charcoal-900/90 border border-teal-light px-2 py-1 flex items-center gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00A3A3] inline-block" /> Reaktan A
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-pink inline-block" /> Reaktan B
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-cream inline-block" /> Produk C
          </div>
        </div>

        {/* Catalyst state indicator */}
        <div className="absolute bottom-2 right-2 font-mono text-[10px] bg-charcoal-900/90 border border-charcoal-600 px-2 py-0.5">
          {hasCatalyst ? (
            <span className="text-pink font-bold">⚡ Katalis AKTIF (Ea ↓ 50%)</span>
          ) : (
            <span className="text-charcoal-300">Katalis Non-Aktif</span>
          )}
        </div>
      </div>

      {/* Real-time Kinetics Metrics */}
      <div className="grid grid-cols-3 gap-2 font-mono text-center">
        <div className="bg-charcoal-800 border border-teal-dark p-2">
          <div className="text-[10px] text-charcoal-300 uppercase">Energi Aktivasi (Ea)</div>
          <div className="text-sm font-bold text-pink">{activeEa} kJ/mol</div>
        </div>
        <div className="bg-charcoal-800 border border-teal-dark p-2">
          <div className="text-[10px] text-charcoal-300 uppercase">Tumbukan Efektif</div>
          <div className="text-sm font-bold text-teal-light">{effectiveCollisionCount}</div>
        </div>
        <div className="bg-charcoal-800 border border-teal-dark p-2">
          <div className="text-[10px] text-charcoal-300 uppercase">Laju Reaksi (v)</div>
          <div className="text-sm font-bold text-cream">{calculatedRate} <span className="text-[10px]">M/s</span></div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-3 pt-1 border-t border-charcoal-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Suhu Slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-charcoal-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-pink" /> Suhu (T):
              </span>
              <span className="font-bold text-teal-light">{temperature} K ({(temperature - 273)}°C)</span>
            </div>
            <input
              type="range"
              min={280}
              max={400}
              step={10}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-teal h-1.5 bg-charcoal-700 cursor-pointer"
            />
          </div>

          {/* Konsentrasi Slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-charcoal-300 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-teal" /> Konsentrasi [A]:
              </span>
              <span className="font-bold text-teal-light">{concentration.toFixed(1)} M</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.5}
              value={concentration}
              onChange={(e) => setConcentration(Number(e.target.value))}
              className="w-full accent-pink h-1.5 bg-charcoal-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons: Toggle Catalyst & Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHasCatalyst(!hasCatalyst)}
            className={`flex-1 py-1.5 px-3 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border-2 ${
              hasCatalyst
                ? 'bg-pink text-charcoal-900 border-cream shadow-brutal-teal-sm'
                : 'bg-teal-dark text-cream border-teal-light hover:border-pink'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {hasCatalyst ? 'Matikan Katalis' : 'Tambahkan Katalis (↓ Ea)'}
          </button>

          <button
            type="button"
            onClick={initParticles}
            className="p-1.5 bg-charcoal-800 border-2 border-charcoal-600 hover:border-teal text-cream"
            title="Reset Partikel Reaktan"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
