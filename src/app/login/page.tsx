'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, User, Lock, Mail, School, ArrowRight, CheckCircle2, AlertCircle, GraduationCap, BookOpen, UserCheck, HelpCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginTeacher, registerStudent, switchDemoRole } = useAuth();

  const [activeRoleTab, setActiveRoleTab] = useState<'student' | 'teacher'>('student');
  const [studentMode, setStudentMode] = useState<'login' | 'register'>('login');

  // Student form state
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');

  // Teacher form state
  const [teacherPassword, setTeacherPassword] = useState('');

  // Status/Error
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!studentEmail.trim()) {
      setErrorMsg('Harap masukkan alamat email Anda.');
      return;
    }

    const ok = await login(studentEmail, 'STUDENT');
    if (ok) {
      router.push('/student/dashboard');
    } else {
      setErrorMsg('Email siswa tidak ditemukan. Silakan daftar akun baru atau gunakan email demo.');
    }
  };

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!studentName.trim() || !studentEmail.trim()) {
      setErrorMsg('Nama lengkap dan email wajib diisi.');
      return;
    }

    const ok = await registerStudent(studentName, studentEmail, studentSchool);
    if (ok) {
      setSuccessMsg('Registrasi berhasil! Mengalihkan ke dashboard...');
      setTimeout(() => router.push('/student/dashboard'), 1000);
    } else {
      setErrorMsg('Email tersebut sudah terdaftar di sistem. Silakan langsung login.');
    }
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!teacherPassword.trim()) {
      setErrorMsg('Harap masukkan kata sandi guru.');
      return;
    }

    const ok = await loginTeacher(teacherPassword);
    if (ok) {
      router.push('/teacher/dashboard');
    } else {
      setErrorMsg('Kata sandi guru salah. (Gunakan kata sandi: guru123)');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-cream-card border-3 border-teal-dark kinetix-shadow-dark overflow-hidden">
        {/* Top Header */}
        <div className="bg-teal text-white p-6 border-b-2 border-teal-deep text-center">
          <span className="text-[10px] font-mono uppercase bg-pink text-charcoal-900 px-2 py-0.5 font-bold tracking-wider inline-block mb-1">
            Autentikasi Portal Kinetix
          </span>
          <h2 className="text-2xl font-extrabold uppercase tracking-wide">
            Masuk ke Platform Pembelajaran
          </h2>
          <p className="text-xs text-cream/90 font-mono mt-1">
            Pilih peran Anda untuk mengakses materi atau monitoring rekap nilai.
          </p>
        </div>

        {/* Role Tabs: Siswa vs Guru */}
        <div className="grid grid-cols-2 border-b-2 border-teal-dark font-mono text-xs font-bold uppercase">
          <button
            onClick={() => {
              setActiveRoleTab('student');
              setErrorMsg('');
            }}
            className={`py-3 flex items-center justify-center gap-2 transition-all ${activeRoleTab === 'student'
              ? 'bg-cream text-charcoal-900 border-b-4 border-teal font-extrabold'
              : 'bg-cream-dark text-charcoal-600 hover:text-charcoal-900'
              }`}
          >
            <User className="w-4 h-4 text-teal" />
            Portal Siswa
          </button>

          <button
            onClick={() => {
              setActiveRoleTab('teacher');
              setErrorMsg('');
            }}
            className={`py-3 flex items-center justify-center gap-2 transition-all ${activeRoleTab === 'teacher'
              ? 'bg-cream text-charcoal-900 border-b-4 border-pink font-extrabold'
              : 'bg-cream-dark text-charcoal-600 hover:text-charcoal-900'
              }`}
          >
            <Shield className="w-4 h-4 text-pink-hover" />
            Portal Guru Pengampu
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Error / Success message */}
          {errorMsg && (
            <div className="bg-pink/20 border-2 border-pink p-3 text-xs font-mono font-bold text-charcoal-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-pink-hover" /> {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-teal/20 border-2 border-teal p-3 text-xs font-mono font-bold text-teal-deep flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal" /> {successMsg}
            </div>
          )}

          {activeRoleTab === 'student' ? (
            /* ================= STUDENT AUTH ================= */
            <div className="space-y-5">
              {/* Login vs Register Subtabs */}
              <div className="flex justify-center gap-2 border-b border-charcoal-300 pb-3">
                <button
                  type="button"
                  onClick={() => setStudentMode('login')}
                  className={`px-4 py-1.5 text-xs font-mono font-bold border-2 transition-all ${studentMode === 'login'
                    ? 'bg-teal text-white border-teal-dark'
                    : 'bg-cream text-charcoal-700 border-charcoal-300'
                    }`}
                >
                  Masuk (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setStudentMode('register')}
                  className={`px-4 py-1.5 text-xs font-mono font-bold border-2 transition-all ${studentMode === 'register'
                    ? 'bg-teal text-white border-teal-dark'
                    : 'bg-cream text-charcoal-700 border-charcoal-300'
                    }`}
                >
                  Daftar Akun Baru
                </button>
              </div>

              {studentMode === 'login' ? (
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-700 mb-1">
                      Alamat Email Siswa:
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="contoh: budi@siswa.kinetix.id"
                        value={studentEmail}
                        onChange={e => setStudentEmail(e.target.value)}
                        className="w-full bg-cream border-2 border-teal-dark pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-pink font-medium"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full kinetix-btn-primary py-2.5 text-xs">
                    MASUK KE KELAS SAYA <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleStudentRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-700 mb-1">
                      Nama Lengkap Siswa:
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: Siti Nurhaliza"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      className="w-full bg-cream border-2 border-teal-dark px-3 py-2 text-xs font-mono focus:outline-none focus:border-pink font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-700 mb-1">
                      Alamat Email Siswa:
                    </label>
                    <input
                      type="email"
                      placeholder="contoh: siti@sekolah.id"
                      value={studentEmail}
                      onChange={e => setStudentEmail(e.target.value)}
                      className="w-full bg-cream border-2 border-teal-dark px-3 py-2 text-xs font-mono focus:outline-none focus:border-pink font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-charcoal-700 mb-1">
                      Asal Sekolah / Kelas:
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: SMAN 1 Jakarta - XI MIPA"
                      value={studentSchool}
                      onChange={e => setStudentSchool(e.target.value)}
                      className="w-full bg-cream border-2 border-teal-dark px-3 py-2 text-xs font-mono focus:outline-none focus:border-pink font-medium"
                    />
                  </div>

                  <button type="submit" className="w-full kinetix-btn-primary py-2.5 text-xs">
                    DAFTAR SEBAGAI SISWA BARU <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Quick Demo Student Button */}
              <div className="pt-3 border-t border-dashed border-charcoal-300">
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('STUDENT');
                    router.push('/student/dashboard');
                  }}
                  className="w-full bg-cream border border-teal text-teal-dark p-2 text-xs font-mono font-bold hover:bg-teal hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  ⚡ Akses Instan Akun Siswa Demo (Budi Pratama)
                </button>
              </div>
            </div>
          ) : (
            /* ================= TEACHER AUTH ================= */
            <div className="space-y-5">
              <div className="bg-teal/10 border-l-4 border-teal p-3 text-xs font-mono text-charcoal-800">
                <strong>Akses Khusus Guru:</strong> Portal guru tidak membuka registrasi publik. Masukkan kata sandi khusus otorisasi guru pengampu.
              </div>

              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-charcoal-700 mb-1">
                    Kata Sandi Guru Pengampu:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="Masukkan kata sandi khusus (guru123)..."
                      value={teacherPassword}
                      onChange={e => setTeacherPassword(e.target.value)}
                      className="w-full bg-cream border-2 border-teal-dark pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-pink font-medium"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-500 mt-1 block">
                    *Kata sandi bawaan sistem: <code className="bg-cream px-1 border font-bold">guru123</code>
                  </span>
                </div>

                <button type="submit" className="w-full kinetix-btn-pink py-2.5 text-xs">
                  MASUK KE PANEL KONTROL GURU <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Demo Teacher Button */}
              <div className="pt-3 border-t border-dashed border-charcoal-300">
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('TEACHER');
                    router.push('/teacher/dashboard');
                  }}
                  className="w-full bg-cream border border-charcoal-900 text-charcoal-900 p-2 text-xs font-mono font-bold hover:bg-pink hover:text-charcoal-900 transition-colors flex items-center justify-center gap-1.5"
                >
                  ⚡ Akses Instan Guru Demo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tombol Panduan Siswa, Panduan Guru, & Profil Pengajar */}
        <div className="bg-cream border-t-2 border-teal-dark p-4">
          <div className="text-center mb-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-600">
              📖 Buku Petunjuk & Panduan Platform:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-[11px] sm:text-xs">
            <Link
              href="/guide?role=student"
              className="bg-cream-card border-2 border-teal text-teal-dark hover:bg-teal hover:text-white p-2.5 text-center font-bold transition-all shadow-brutal-dark flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-teal shrink-0" />
              <span>Panduan Siswa</span>
            </Link>

            <Link
              href="/guide?role=teacher"
              className="bg-cream-card border-2 border-charcoal-900 text-charcoal-900 hover:bg-pink hover:text-charcoal-900 p-2.5 text-center font-bold transition-all shadow-brutal-dark flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-charcoal-900 shrink-0" />
              <span>Panduan Guru</span>
            </Link>

            <Link
              href="/guide?role=profile"
              className="bg-cream-card border-2 border-teal-deep text-charcoal-900 hover:bg-charcoal-900 hover:text-cream p-2.5 text-center font-bold transition-all shadow-brutal-dark flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Profil Pengajar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
