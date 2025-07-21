import Link from 'next/link';
import Search from '@/components/Search';
import ScrollToSearchButton from '@/components/ScrollToSearchButton';
import ReadMore from '@/components/ReadMore';
import dbConnect from '@/lib/dbConnect';
import Experience from '@/models/Experience';
import Company from '@/models/Company';
import { toTitleCase } from '@/lib/formatters';

async function getExperiences(searchQuery) {
  await dbConnect();
  try {
    let query = {};
    if (searchQuery) {
      const matchingCompanies = await Company.find({ name: new RegExp(searchQuery, 'i') }).select('_id');
      query.company = { $in: matchingCompanies.map(c => c._id) };
    }
    const experiences = await Experience.find(query).sort({ createdAt: -1 }).populate('company');
    return JSON.parse(JSON.stringify(experiences));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch experiences.');
  }
}

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || '';
  const experiences = await getExperiences(query);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Enhanced Dark Background */}
      <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-12">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
                Real Interview
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Discover authentic insights from candidates who&apos;ve been there. Get real stories, 
                <span className="font-medium text-blue-300"> salary data</span>, and 
                <span className="font-medium text-purple-300"> preparation tips</span> from your dream companies.
              </p>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <div className="group flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">Verified Experiences</span>
                  <span className="block text-xs text-gray-400">Real candidate stories</span>
                </div>
              </div>
              
              <div className="group flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">Salary Insights</span>
                  <span className="block text-xs text-gray-400">Transparent compensation</span>
                </div>
              </div>
              
              <div className="group flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">Career Growth</span>
                  <span className="block text-xs text-gray-400">Expert preparation tips</span>
                </div>
              </div>
            </div>

            {/* Anonymous Sharing Highlight */}
            <div className="mt-12 relative">
              <div className="bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-300">100% Anonymous</h3>
                  </div>
                  <p className="text-lg text-emerald-200 mb-6 max-w-2xl mx-auto">
                    <span className="font-semibold text-white">No login required!</span> Share your interview experience completely anonymously. 
                    No registration, no personal details, just pure knowledge sharing.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 text-sm">
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/30">
                      ✓ No Email Required
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/30">
                      ✓ No Account Creation
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/30">
                      ✓ Completely Private
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div id="search-section" className="relative bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Find Your Company</h2>
            <p className="text-gray-400">Search through real interview experiences</p>
          </div>
          <Search placeholder="Search companies like Google, Microsoft, Amazon, Meta..." />
        </div>
      </div>

      {/* Experiences Section */}
      <div id="results-section" className="bg-gray-900/50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {experiences.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {query ? `Results for "${query}"` : 'Latest Interview Experiences'}
                  </h2>
                  <p className="text-gray-400">
                    {experiences.length} experience{experiences.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                {query && (
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear search
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {experiences.map((exp, index) => (
                  <article 
                    key={exp._id} 
                    className="group bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Company Header */}
                    <div className="bg-gradient-to-r from-gray-800/80 to-slate-800/80 px-6 py-4 border-b border-gray-700">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-base">
                                {toTitleCase(exp.company.name).charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {toTitleCase(exp.company.name)}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                                  {exp.role}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {new Date(exp.createdAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {exp.ctc > 0 && (
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-4 text-center shadow-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              <span className="text-xs font-medium text-green-300">Package Offered</span>
                            </div>
                            <p className="text-2xl font-black text-green-300">₹{exp.ctc}</p>
                            <p className="text-xs text-green-400 font-medium">LPA</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Experience Content */}
                    <div className="p-5">
                      <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 rounded-xl p-4 border border-gray-700">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-base">
                          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          Interview Experience & Tips
                        </h4>
                        <div className="prose prose-gray max-w-none">
                          <ReadMore text={exp.experience} maxLength={400} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <div className="max-w-md mx-auto space-y-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-gray-700 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">
                    {query ? `No experiences found for "${query}"` : "Start Your Journey"}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {query 
                      ? "Sorry, we could not find any interview experiences for this company yet. You could be the first to share your experience and help others prepare for their interviews!"
                      : "Be the first to share your interview experience and help thousands of job seekers in their career journey."
                    }
                  </p>
                  {query && (
                    <div className="mt-6">
                      <ScrollToSearchButton />
                    </div>
                  )}
                </div>
                
                <Link 
                  href="/create" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mt-8"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Share Your Experience
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}