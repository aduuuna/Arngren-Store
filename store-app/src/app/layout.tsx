import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../../components/Navbar';

export const metadata: Metadata = {
  title: 'MediTools Store',
  description: 'Professional medical supplies, tools, and equipment',
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