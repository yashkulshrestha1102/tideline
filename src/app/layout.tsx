import type { Metadata, Viewport } from 'next';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

// Fonts load straight from Google Fonts in the browser (no build-time download),
// so Vercel builds never fail on font fetching.
const FONTS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=DM+Serif+Display:ital@0;1' +
  '&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500' +
  '&family=DM+Sans:wght@400;500;600;700' +
  '&display=swap';

export const metadata: Metadata = {
  title: {
    default: 'Tideline — Capital finds its direction',
    template: '%s · Tideline',
  },
  description:
    'Tideline connects ambitious founders with aligned investors through the power of AI.',
};

export const viewport: Viewport = {
  themeColor: '#03524D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
