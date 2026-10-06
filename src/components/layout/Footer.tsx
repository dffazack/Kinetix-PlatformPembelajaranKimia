'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan footer khusus di halaman login
  if (pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-charcoal-900 text-cream border-t-3 border-teal p-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="font-extrabold text-teal-light uppercase tracking-wider text-sm">
            KINETIX.
          </span>
          <p className="text-charcoal-300 text-[11px] mt-0.5">
            Platform Pembelajaran Kinetika Kimia Berbasis Laboratorium Virtual & Evaluasi Terintegrasi
          </p>
        </div>
        <div className="flex items-center gap-4 text-charcoal-300">
          <span className="bg-teal-dark px-2 py-0.5 text-cream border border-teal-light">
            Sistem Desain: Geometris Lancip (0px Radius)
          </span>
          <span>Cream • Teal • Pink</span>
        </div>
      </div>
    </footer>
  );
}
