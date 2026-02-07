import { useState } from 'react';
import { BookMarked, Sparkles } from 'lucide-react';
import { ReadingLevel } from '../App';

interface VocabularyCardProps {
  word: string;
  definition: string;
  example?: string;
  readingLevel: ReadingLevel;
}

export function VocabularyCard({ word, definition, example, readingLevel }: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);

  if (readingLevel === 'beginner') {
    return (
      <div
        className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
          isFlipped ? 'ring-2 ring-orange-300' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {!isFlipped ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-bold text-orange-600">{word}</span>
              </div>
              <Sparkles className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Click to see definition</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookMarked className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-bold text-orange-600">{word}</span>
            </div>
            <p className="text-gray-700 mb-3">{definition}</p>
            {example && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExample(!showExample);
                  }}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  {showExample ? 'Hide' : 'Show'} example
                </button>
                {showExample && (
                  <p className="text-sm text-gray-600 mt-2 italic bg-orange-50 p-3 rounded-lg">
                    "{example}"
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start gap-3">
        <BookMarked className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <span className="font-semibold text-orange-600 text-lg">{word}</span>
          <p className="text-gray-700 mt-1 leading-relaxed">{definition}</p>
          {example && readingLevel !== 'advanced' && (
            <p className="text-sm text-gray-600 mt-2 italic">
              Example: "{example}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
