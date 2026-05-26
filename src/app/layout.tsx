import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Grihanirman Technologies',
    template: '%s | Grihanirman Technologies',
  },
  description:
    'Professional IoT, STEM, firmware development, and workshop services. Smart systems for education and automation.',
  keywords: ['IoT', 'STEM', 'firmware', 'embedded systems', 'workshops', 'Bengaluru'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
