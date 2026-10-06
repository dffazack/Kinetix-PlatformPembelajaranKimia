import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
            <Footer />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
