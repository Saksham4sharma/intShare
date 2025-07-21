import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black border-t border-gray-800">
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
              <Image 
                src="/logo.png" 
                alt="IntShare Logo" 
                width={40} 
                height={40} 
                className="rounded-2xl"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                IntShare
              </h3>
            </div>
          </Link>
          
          {/* Middle - Creator Attribution */}
          <div className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Created with love</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-gray-400">by</span>
            </div>
            <a 
              href="https://www.linkedin.com/in/saksham-sharma-418285216/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>Saksham Sharma</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          
          {/* Right - Contact Us */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <a 
              href="mailto:intshare4u@gmail.com" 
              className="text-white font-semibold hover:text-blue-400 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
