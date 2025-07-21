'use client';

import { useState } from 'react';

export default function ReadMore({ text, maxLength = 300 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return (
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
        {text}
      </p>
    );
  }

  const truncatedText = text.slice(0, maxLength);
  const remainingText = text.slice(maxLength);

  return (
    <div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
        {truncatedText}
        {!isExpanded && (
          <>
            <span className="text-gray-500">...</span>
            <button
              onClick={() => setIsExpanded(true)}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 underline"
            >
              Read more
            </button>
          </>
        )}
        {isExpanded && (
          <>
            {remainingText}
            <button
              onClick={() => setIsExpanded(false)}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 underline"
            >
              Show less
            </button>
          </>
        )}
      </p>
    </div>
  );
}
