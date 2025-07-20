'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="w-full bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="IntShare Logo"
                width={60}
                height={60}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                IntShare
              </span>
              <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                Interview Experiences
              </span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-2">
            <button 
              onClick={scrollToSearch}
              className="group flex items-center gap-2 text-gray-300 hover:text-blue-400 font-semibold transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gray-800/80 border border-transparent hover:border-gray-700 cursor-pointer"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse
            </button>
            <Link href="/create"
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/10"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Share Experience
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}