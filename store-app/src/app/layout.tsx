import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: 'Arngren Store',
  description: 'Discover cuuting-edge technology, smart home solutions, and professional equipment all in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen bg-blue-50">
          {children}
        </main>
      </body>
    </html>
  );
}