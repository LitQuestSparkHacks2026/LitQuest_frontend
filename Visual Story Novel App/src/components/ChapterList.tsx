import { CheckCircle, Circle } from 'lucide-react';

interface ChapterListProps {
  currentChapter: number;
  onChapterSelect: (index: number) => void;
}

const chapters = [
  {
    title: 'Part One: The Hearth and the Salamander',
    description: 'Meet Guy Montag and begin his journey',
    sections: 3
  },
  {
    title: 'The Meeting with Clarisse',
    description: 'A question that changes everything',
    sections: 2
  },
  {
    title: 'Part Two: The Sieve and the Sand',
    description: 'Montag seeks wisdom from Faber',
    sections: 2
  },
  {
    title: 'Part Three: Burning Bright',
    description: 'Destruction and rebirth',
    sections: 2
  },
  {
    title: 'The Book People',
    description: 'Finding hope in the ashes',
    sections: 2
  }
];

export function ChapterList({ currentChapter, onChapterSelect }: ChapterListProps) {
  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-4">Story Chapters</h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => onChapterSelect(index)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              index === currentChapter
                ? 'bg-orange-100 border-2 border-orange-500'
                : index < currentChapter
                ? 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {index < currentChapter ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : index === currentChapter ? (
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">{chapter.title}</div>
                <div className="text-sm text-gray-600 mb-2">{chapter.description}</div>
                <div className="text-xs text-gray-500">{chapter.sections} sections</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
