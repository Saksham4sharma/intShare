'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

export default function CreateExperience() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [ctc, setCtc] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchSuggestions = useDebouncedCallback(async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`/api/companies?query=${query}`);
        setSuggestions(response.data.data);
      } catch (err) { console.error(err); }
    } else {
      setSuggestions([]);
    }
  }, 300);

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (name) => {
    setCompanyName(name);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName) {
      setError('Company name is required.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = { companyName, role, experience };
      if (ctc) payload.ctc = parseFloat(ctc);
      await axios.post('/api/experiences', payload);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
          Share Your Interview Experience
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Help others by sharing your real interview experience. Your insights could make the difference in someone's career journey.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800/60 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800/80 to-slate-800/80 px-8 py-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            Tell us about your experience
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Company Name Field */}
          <div className="relative space-y-2">
            <label className="block text-white text-sm font-semibold mb-3" htmlFor="companyName">
              Company Name *
            </label>
            <div className="relative">
              <input
                className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-xl py-4 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400"
                id="companyName" 
                type="text" 
                value={companyName} 
                onChange={handleCompanyChange} 
                required 
                autoComplete="off"
                placeholder="e.g., Google, Microsoft, Amazon"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-gray-800 border-2 border-gray-600 rounded-xl mt-2 max-h-60 overflow-auto shadow-2xl">
                  {suggestions.map((s) => (
                    <li 
                      key={s._id} 
                      onClick={() => handleSuggestionClick(s.name)} 
                      className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors duration-150 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="font-medium text-white">{s.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold mb-3" htmlFor="role">
              Role / Position *
            </label>
            <input
              className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-xl py-4 px-4 text-white leading-tight focus:outline-none focus:bg-gray-900/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400"
              id="role" 
              type="text" 
              required 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
            />
          </div>

          {/* CTC Field */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold mb-3" htmlFor="ctc">
              CTC / Package 
              <span className="text-gray-400 font-normal ml-2">(in LPA, optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-xl py-4 pl-8 pr-4 text-white leading-tight focus:outline-none focus:bg-gray-900/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400"
                id="ctc" 
                type="number" 
                step="0.1" 
                placeholder="15.5" 
                value={ctc} 
                onChange={(e) => setCtc(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">LPA</span>
            </div>
          </div>

          {/* Experience Field */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-semibold mb-3" htmlFor="experience">
              Your Interview Experience *
            </label>
            <div className="relative">
              <textarea
                className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-xl py-4 px-4 text-white leading-relaxed focus:outline-none focus:bg-gray-900/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400 resize-none"
                id="experience" 
                required 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)}
                rows="8"
                placeholder="Share your complete interview experience including:
• Application process
• Interview rounds (technical, HR, etc.)
• Questions asked
• Tips for future candidates
• Overall experience and feedback"
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                {experience.length}/2000
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md"
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Experience...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Share My Experience
                </span>
              )}
            </button>
            <Link 
              href="/"
              className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] border border-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Browse
            </Link>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tips for a great experience share
        </h3>
        <ul className="space-y-2 text-blue-200">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Be detailed about the interview process and rounds</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Include specific questions or topics covered</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Share preparation tips and resources you used</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Mention the interview atmosphere and interviewer behavior</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
