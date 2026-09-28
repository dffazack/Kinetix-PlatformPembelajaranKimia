'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Atom, BookOpen, FlaskConical, BarChart3, UserCheck, Shield, LogOut, ArrowRightLeft } from 'lucide-react';

export default function Navbar() {
  const { user, switchDemoRole, logout } = useAuth();
  const pathname = usePathname();

  const isTeacher = user?.role === 'TEACHER';

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
                Kinetika Kimia Interaktif
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

            {isTeacher ? (
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
            ) : (
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

          {/* User & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Button for Instant Testing */}
            <button
              onClick={() => switchDemoRole(isTeacher ? 'STUDENT' : 'TEACHER')}
              title="Klik untuk beralih mode cepat antara Siswa & Guru"
              className="bg-cream text-charcoal-900 border-2 border-charcoal-900 px-2.5 py-1 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-brutal-pink-sm hover:bg-pink transition-colors"
            >
              <ArrowRightLeft className="w-3 h-3 text-teal-dark" />
              <span className="hidden sm:inline">Role:</span>
              <span className="uppercase text-teal-dark font-extrabold">
                {isTeacher ? 'Guru 👩‍🏫' : 'Siswa 👨‍🎓'}
              </span>
            </button>

            {/* Profile Dropdown / Actions */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-bold text-cream font-mono truncate max-w-[130px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-pink font-mono tracking-tight">
                    {user.role === 'TEACHER' ? 'Guru Pengampu' : 'Siswa Terdaftar'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 border border-teal-light bg-teal-dark text-cream hover:bg-pink hover:text-charcoal-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-pink text-charcoal-900 border-2 border-charcoal-900 px-3 py-1 text-xs font-mono font-bold uppercase shadow-brutal-dark hover:bg-cream"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
