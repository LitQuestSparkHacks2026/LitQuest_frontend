import { useState } from 'react';

interface VocabularyTooltipProps {
  word: string;
  definition: string;
  simplified: string;
}

export function VocabularyTooltip({ word, definition, simplified }: VocabularyTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-yellow-300 underline decoration-dotted cursor-help">
        {word}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl border border-yellow-500/30 whitespace-nowrap z-50">
          <div className="font-semibold text-yellow-300 mb-1">{word} = {simplified}</div>
          <div className="text-xs text-gray-300">{definition}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </span>
  );
}
