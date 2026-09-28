import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KINETIX — Platform Pembelajaran Kinetika Kimia Interaktif',
  description: 'Web interaktif pembelajaran Kinetika Kimia dengan sistem role Siswa & Guru, modul kegiatan belajar (KB 1-6), dan laboratorium simulasi eksperimen visual.',
  keywords: ['Kinetika Kimia', 'Laju Reaksi', 'Teori Tumbukan', 'Energi Aktivasi', 'Haber-Bosch', 'Simulasi Kimia', 'Kimia SMA'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal-900 bg-graph-pattern font-sans antialiased selection:bg-pink selection:text-charcoal-900">
        <AuthProvider>
          <DataProvider>
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            {/* Geometric Brutalist Footer */}
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
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
