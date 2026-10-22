'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Atom,
  BookOpen,
  FlaskConical,
  BarChart3,
  Shield,
  LogIn,
  LogOut,
  HelpCircle,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sembunyikan navbar khusus di halaman login
  if (pathname === '/login') {
    return null;
  }

  const isTeacher = user?.role === 'TEACHER';
  const isStudent = user?.role === 'STUDENT';

  return (
    <header className="sticky top-0 z-50 bg-teal border-b-3 border-teal-deep text-cream kinetix-shadow">
      {/* Top micro-ticker for chemical kinetics */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-0.5 bg-teal-deep text-[10px] font-mono border-b border-teal/40">
        <div className="flex items-center gap-3 text-cream/80">
          <span className="flex items-center gap-1 font-bold text-pink">
            <Sparkles className="w-3 h-3 text-pink" /> KINETIX CORE:
          </span>
          <span>v = k[A]ᵐ[B]ⁿ</span>
          <span>•</span>
          <span>k = A·e^(-Ea/RT)</span>
          <span>•</span>
          <span>Teori Tumbukan Efektif</span>
        </div>
        <div className="text-teal-light font-bold">
          Fase F (SMA/MA) • Problem-Based Learning
        </div>
      </div>

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
                Platform Pembelajaran Kinetika Kimia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs uppercase font-bold tracking-wider">
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
              Lab Virtual
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
                Panel Guru
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
                Progres Siswa
              </Link>
            )}
          </nav>

          {/* Right Area: Auth & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Badge Role Siswa atau Guru */}
                <div className="bg-cream text-charcoal-900 border-2 border-charcoal-900 px-3 py-1 font-mono text-xs font-bold flex items-center gap-1.5 shadow-brutal-pink-sm">
                  <span className="text-[10px] text-teal-dark font-extrabold uppercase">
                    {isTeacher ? 'Guru 👩‍🏫' : 'Siswa 👨‍🎓'}
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
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              /* User belum login: HANYA tombol Login / Masuk */
              <Link
                href="/login"
                className="bg-pink text-charcoal-900 border-2 border-charcoal-900 px-4 py-1.5 text-xs font-mono font-bold uppercase shadow-brutal-dark hover:bg-cream transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-charcoal-900" />
                <span>Masuk Akun</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-teal-dark border-2 border-charcoal-900 text-cream hover:bg-pink hover:text-charcoal-900 transition-colors"
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-teal-deep border-t-2 border-charcoal-900 px-4 py-3 space-y-2 font-mono text-xs uppercase font-bold">
          <Link
            href="/modules"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 border border-teal-light text-cream hover:bg-pink hover:text-charcoal-900"
          >
            Kegiatan Belajar (KB 1 - 5)
          </Link>
          <Link
            href="/experiments"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 border border-teal-light text-cream hover:bg-pink hover:text-charcoal-900"
          >
            Laboratorium Virtual
          </Link>
          <Link
            href="/guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 border border-teal-light text-cream hover:bg-pink hover:text-charcoal-900"
          >
            Panduan Pembelajaran
          </Link>
          {isTeacher && (
            <Link
              href="/teacher/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 border border-pink text-pink hover:bg-pink hover:text-charcoal-900"
            >
              Panel Rekap Nilai Guru
            </Link>
          )}
          {isStudent && (
            <Link
              href="/student/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 border border-pink text-pink hover:bg-pink hover:text-charcoal-900"
            >
              Status Progres Siswa
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

