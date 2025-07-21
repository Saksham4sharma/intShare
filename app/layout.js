import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IntShare - Interview Experiences Platform',
  description: 'Share and discover real interview experiences from top companies. Get insights, tips, and prepare better for your next interview.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 antialiased`}>
        <Header />
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}