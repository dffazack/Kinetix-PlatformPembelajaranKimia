'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'A' | 'B' | 'AB';
  orientationAngle: number; // 0 - 360
  energy: number;
}

export default function CollisionTheorySim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number>(300); // Kelvin (200 - 600K)
  const [activationEnergy, setActivationEnergy] = useState<number>(50); // kJ/mol (20 - 80)
  const [orientationTolerance, setOrientationTolerance] = useState<number>(45); // degrees
  const [particleCount, setParticleCount] = useState<number>(40);

  // Statistics
  const [stats, setStats] = useState({
    totalCollisions: 0,
    effectiveCollisions: 0,
    ineffectiveCollisions: 0,
    productsFormed: 0,
  });

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize particles
  const initParticles = () => {
    const particles: Particle[] = [];
    const width = 500;
    const height = 300;
    const speedFactor = Math.sqrt(temperature / 300) * 2.2;

    for (let i = 0; i < particleCount; i++) {
      const isTypeA = i < particleCount / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.8 + Math.random() * 1.5) * speedFactor;

      particles.push({
        id: i,
        x: 30 + Math.random() * (width - 60),
        y: 30 + Math.random() * (height - 60),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: isTypeA ? 9 : 8,
        type: isTypeA ? 'A' : 'B',
        orientationAngle: Math.floor(Math.random() * 360),
        energy: Math.floor(20 + Math.random() * (temperature / 6)),
      });
    }

    particlesRef.current = particles;
    setStats({
      totalCollisions: 0,
      effectiveCollisions: 0,
      ineffectiveCollisions: 0,
      productsFormed: 0,
    });
  };

  useEffect(() => {
    initParticles();
  }, [particleCount]);

  // Adjust speeds when temperature changes
  useEffect(() => {
    const speedFactor = Math.sqrt(temperature / 300);
    particlesRef.current.forEach(p => {
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
      const targetSpeed = (0.8 + Math.random() * 1.5) * speedFactor * 2.2;
      const factor = targetSpeed / currentSpeed;
      p.vx *= factor;
      p.vy *= factor;
      p.energy = Math.floor(20 + Math.random() * (temperature / 6));
    });
  }, [temperature]);

  // Physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localCollisions = 0;
    let localEffective = 0;
    let localIneffective = 0;
    let localProducts = 0;

    const render = () => {
      ctx.fillStyle = '#FAF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw container boundary
      ctx.strokeStyle = '#005959';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update positions and handle wall collisions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;
          p.orientationAngle = (p.orientationAngle + p.vx * 3) % 360;

          // Left/Right walls
          if (p.x - p.radius < 0) {
            p.x = p.radius;
            p.vx = -p.vx;
          } else if (p.x + p.radius > canvas.width) {
            p.x = canvas.width - p.radius;
            p.vx = -p.vx;
          }

          // Top/Bottom walls
          if (p.y - p.radius < 0) {
            p.y = p.radius;
            p.vy = -p.vy;
          } else if (p.y + p.radius > canvas.height) {
            p.y = canvas.height - p.radius;
            p.vy = -p.vy;
          }
        }

        // Check particle-to-particle collisions
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + p2.radius) {
            // Collision occurred!
            localCollisions++;

            // Separate overlapping particles
            const overlap = (p.radius + p2.radius) - dist;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            p.x -= nx * overlap * 0.5;
            p.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;

            // Simple elastic bounce vector
            const tempVx = p.vx;
            const tempVy = p.vy;
            p.vx = p2.vx;
            p.vy = p2.vy;
            p2.vx = tempVx;
            p2.vy = tempVy;

            // Check if reaction criteria are met (A + B → AB)
            const canReact = (p.type === 'A' && p2.type === 'B') || (p.type === 'B' && p2.type === 'A');
            const totalKineticEnergy = p.energy + p2.energy;
            const hasSufficientEnergy = totalKineticEnergy >= activationEnergy;

            // Check orientation: angle between relative velocity and contact normal
            const relativeAngle = Math.abs(p.orientationAngle - p2.orientationAngle);
            const correctOrientation = (relativeAngle % 180) <= orientationTolerance;

            if (canReact && hasSufficientEnergy && correctOrientation) {
              // EFFECTIVE COLLISION!
              localEffective++;
              localProducts++;

              p.type = 'AB';
              p2.type = 'AB';

              // Visual reaction burst
              ctx.beginPath();
              ctx.arc((p.x + p2.x) / 2, (p.y + p2.y) / 2, 22, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 105, 180, 0.6)';
              ctx.fill();
            } else {
              // INEFFECTIVE COLLISION
              localIneffective++;
              // Draw small yellow bounce spark
              ctx.beginPath();
              ctx.arc((p.x + p2.x) / 2, (p.y + p2.y) / 2, 7, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(0, 128, 128, 0.4)';
              ctx.fill();
            }
          }
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.orientationAngle * Math.PI) / 180);

        if (p.type === 'A') {
          // Reaktan A: Dark Teal Circle with receptor notch
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#008080';
          ctx.fill();
          ctx.strokeStyle = '#003D3D';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Pointer marker indicating reactive orientation
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.radius + 2, 0);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.type === 'B') {
          // Reaktan B: Amber / Light Teal Square or circle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#E4A830';
          ctx.fill();
          ctx.strokeStyle = '#9E6D15';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.radius + 2, 0);
          ctx.strokeStyle = '#121C1C';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Produk AB: Bright Pink Double Atom
          ctx.beginPath();
          ctx.arc(-4, 0, 7, 0, Math.PI * 2);
          ctx.arc(4, 0, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#FF69B4';
          ctx.fill();
          ctx.strokeStyle = '#121C1C';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Update statistics at throttle
      if (Math.random() < 0.2) {
        setStats(prev => ({
          totalCollisions: prev.totalCollisions + localCollisions,
          effectiveCollisions: prev.effectiveCollisions + localEffective,
          ineffectiveCollisions: prev.ineffectiveCollisions + localIneffective,
          productsFormed: prev.productsFormed + localProducts,
        }));
        localCollisions = 0;
        localEffective = 0;
        localIneffective = 0;
        localProducts = 0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, activationEnergy, orientationTolerance]);

  const effectivePercentage =
    stats.totalCollisions > 0
      ? ((stats.effectiveCollisions / stats.totalCollisions) * 100).toFixed(1)
      : '0.0';

  return (
    <div className="bg-cream-card border-2 border-teal-dark p-6 space-y-6 kinetix-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-teal-dark pb-4">
        <div>
          <div className="inline-block bg-teal text-cream px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            Simulasi KB 2
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-charcoal-900">
            Simulasi Mikroskopis Teori Tumbukan (2D Canvas)
          </h3>
          <p className="text-sm text-charcoal-600">
            Amati partikel reaktan A (hijau toska) dan B (kuning emas) bertumbukan. Hanya tumbukan dengan orientasi tepat dan energi kinetik ≥ Ea yang menghasilkan produk AB (merah muda).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`kinetix-btn-primary ${isPlaying ? 'bg-pink text-charcoal-900 border-charcoal-900 hover:bg-pink-hover' : ''}`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'JEDA SIMULASI' : 'LANJUTKAN'}
          </button>
          <button
            onClick={() => {
              initParticles();
            }}
            className="kinetix-btn-secondary"
          >
            <RotateCcw className="w-4 h-4" />
            RESET PARTIKEL
          </button>
        </div>
      </div>

      {/* Grid: Controls and Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-cream border-2 border-teal p-5 space-y-5">
          <h4 className="font-bold text-sm uppercase tracking-wider text-teal-deep flex items-center gap-2 border-b border-teal/30 pb-2">
            <Flame className="w-4 h-4 text-pink" /> Variabel Termodinamika & Fisik
          </h4>

          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Suhu Sistem (T)</span>
              <span className="text-pink font-extrabold">{temperature} K ({(temperature - 273).toFixed(0)}°C)</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              step="10"
              value={temperature}
              onChange={e => setTemperature(parseInt(e.target.value))}
              className="w-full accent-pink cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>200 K (Dingin)</span>
              <span>400 K</span>
              <span>600 K (Panas)</span>
            </div>
          </div>

          {/* Activation Energy */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Ambang Energi Aktivasi (Ea)</span>
              <span className="text-teal font-extrabold">{activationEnergy} kJ/mol</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              value={activationEnergy}
              onChange={e => setActivationEnergy(parseInt(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>20 kJ (Rendah)</span>
              <span>55 kJ</span>
              <span>90 kJ (Tinggi)</span>
            </div>
          </div>

          {/* Orientation Tolerance */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Toleransi Sudut Orientasi</span>
              <span className="text-teal font-extrabold">±{orientationTolerance}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              step="5"
              value={orientationTolerance}
              onChange={e => setOrientationTolerance(parseInt(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-500 font-mono">
              <span>±15° (Sangat Ketat)</span>
              <span>±80° (Longgar)</span>
            </div>
          </div>

          {/* Particle Density */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Kepadatan Partikel (Konsentrasi)</span>
              <span className="text-teal font-extrabold">{particleCount} Partikel</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="10"
              value={particleCount}
              onChange={e => setParticleCount(parseInt(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
          </div>

          {/* Legend */}
          <div className="border-t-2 border-dashed border-teal/40 pt-3 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-none bg-teal border border-teal-deep"></span>
              <span>Reaktan A (Molekul A)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-none bg-[#E4A830] border border-[#9E6D15]"></span>
              <span>Reaktan B (Molekul B)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-none bg-pink border border-charcoal-900"></span>
              <span className="font-bold text-charcoal-900">Produk AB (Tumbukan Efektif)</span>
            </div>
          </div>
        </div>

        {/* Live Canvas and Live Counter Stats */}
        <div className="lg:col-span-2 bg-cream border-2 border-teal-dark p-5 flex flex-col justify-between">
          <div className="relative w-full aspect-[5/3] bg-[#FAF8EE] border-2 border-teal-deep mb-4 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={500}
              height={300}
              className="w-full h-full block"
            />
          </div>

          {/* 4 Brutalist Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-cream-card border-2 border-charcoal-800 p-2.5 text-center">
              <div className="text-[10px] font-mono uppercase text-charcoal-500">Total Tumbukan</div>
              <div className="text-xl font-mono font-extrabold text-charcoal-900">{stats.totalCollisions}</div>
            </div>
            <div className="bg-teal/10 border-2 border-teal p-2.5 text-center">
              <div className="text-[10px] font-mono uppercase text-teal-dark">Tumbukan Efektif</div>
              <div className="text-xl font-mono font-extrabold text-teal-dark">{stats.effectiveCollisions}</div>
            </div>
            <div className="bg-cream-card border-2 border-charcoal-400 p-2.5 text-center">
              <div className="text-[10px] font-mono uppercase text-charcoal-500">Tumbukan Membal</div>
              <div className="text-xl font-mono font-extrabold text-charcoal-600">{stats.ineffectiveCollisions}</div>
            </div>
            <div className="bg-pink/20 border-2 border-pink p-2.5 text-center">
              <div className="text-[10px] font-mono uppercase text-charcoal-900">Efisiensi (%)</div>
              <div className="text-xl font-mono font-extrabold text-pink-hover">{effectivePercentage}%</div>
            </div>
          </div>

          {/* Kinetic Takeaway */}
          <div className="mt-4 bg-teal/10 border-l-4 border-teal p-3 text-xs text-charcoal-800">
            <strong>Kaidah Teori Tumbukan:</strong> Perhatikan bahwa sebagian besar tumbukan antar partikel hanya saling memantul (inefektif). Ketika Anda menaikkan Suhu ke 600K atau menurunkan Ea ke 20 kJ/mol, persentase tumbukan efektif melesat naik drastis!
          </div>
        </div>
      </div>
    </div>
  );
}
