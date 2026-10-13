'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Atom, BookOpen, FlaskConical, BarChart3, Shield, LogIn, LogOut, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Sembunyikan navbar khusus di halaman login
  if (pathname === '/login') {
    return null;
  }

  const isTeacher = user?.role === 'TEACHER';
  const isStudent = user?.role === 'STUDENT';

  return (
    <header className="sticky top-0 z-50 bg-teal border-b-3 border-teal-deep text-cream kinetix-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-pink text-charcoal-900 border-2 border-charcoal-900 flex items-center justify-center font-bold font-mono text-xl shadow-brutal-dark group-hover:bg-cream transition-colors">
              <Atom className="w-6 h-6 animate-spin-slow text-charcoal-900" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-cream font-mono uppercase">
                KINETIX<span className="text-pink">.</span>
              </span>
              <span className="hidden sm:block text-[9px] font-mono tracking-widest text-teal-light uppercase -mt-1">
                Exploring Kinetics, Mastering Reaction
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase font-bold tracking-wider">
            <Link
              href="/modules"
              className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                pathname.startsWith('/modules')
                  ? 'bg-cream text-charcoal-900 border-charcoal-900 shadow-brutal-pink-sm'
                  : 'text-cream border-transparent hover:border-pink hover:text-pink'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Kegiatan Belajar
            </Link>

            <Link
              href="/experiments"
              className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                pathname.startsWith('/experiments')
                  ? 'bg-cream text-charcoal-900 border-charcoal-900 shadow-brutal-pink-sm'
                  : 'text-cream border-transparent hover:border-pink hover:text-pink'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Laboratorium Virtual
            </Link>

            <Link
              href="/guide"
              className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                pathname.startsWith('/guide')
                  ? 'bg-cream text-charcoal-900 border-charcoal-900 shadow-brutal-pink-sm'
                  : 'text-cream border-transparent hover:border-pink hover:text-pink'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Panduan
            </Link>

            {/* Menu Khusus jika sudah Login: Panel Guru atau Dashboard Siswa */}
            {isTeacher && (
              <Link
                href="/teacher/dashboard"
                className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                  pathname.startsWith('/teacher')
                    ? 'bg-pink text-charcoal-900 border-charcoal-900 shadow-brutal-dark'
                    : 'bg-teal-dark text-cream border-teal-light hover:bg-pink hover:text-charcoal-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-pink-hover" />
                Panel Guru & Rekap
              </Link>
            )}

            {isStudent && (
              <Link
                href="/student/dashboard"
                className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                  pathname.startsWith('/student')
                    ? 'bg-cream text-charcoal-900 border-charcoal-900 shadow-brutal-pink-sm'
                    : 'text-cream border-transparent hover:border-pink hover:text-pink'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Dashboard Siswa
              </Link>
            )}
          </nav>

          {/* Right Area: Hanya Tombol Login jika belum login; Tulisan Role & Tombol Logout jika sudah login */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Badge Role Siswa atau Guru */}
                <div className="bg-cream text-charcoal-900 border-2 border-charcoal-900 px-3 py-1 font-mono text-xs font-bold flex items-center gap-1.5 shadow-brutal-pink-sm">
                  <span className="text-[10px] text-teal-dark font-extrabold uppercase">
                    Role: {isTeacher ? 'Guru 👩‍🏫' : 'Siswa 👨‍🎓'}
                  </span>
                  <span className="hidden sm:inline text-charcoal-400">|</span>
                  <span className="hidden sm:inline font-extrabold truncate max-w-[120px]">
                    {user.name}
                  </span>
                </div>

                {/* Tombol Logout */}
                <button
                  onClick={logout}
                  title="Logout dari akun"
                  className="bg-teal-dark hover:bg-pink hover:text-charcoal-900 text-cream border-2 border-charcoal-900 px-3 py-1 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-brutal-dark"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              /* User belum login: HANYA tombol Login / Masuk */
              <Link
                href="/login"
                className="bg-pink text-charcoal-900 border-2 border-charcoal-900 px-4 py-1.5 text-xs font-mono font-bold uppercase shadow-brutal-dark hover:bg-cream transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-charcoal-900" />
                <span>Masuk (Login)</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
