import { X, RotateCcw, Settings, BookOpen, Award, List, Library, Zap } from 'lucide-react';
import { ReadingLevel } from '../App';

interface GameMenuProps {
  onClose: () => void;
  onChangeLevel: () => void;
  onChapterSelect: () => void;
  onLibrary: () => void;
  currentLevel: ReadingLevel;
  totalPoints: number;
  achievements: number;
  currentChapter: number;
  onRestartChapter: () => void;
}

export function GameMenu({ 
  onClose, 
  onChangeLevel,
  onChapterSelect,
  onLibrary,
  currentLevel, 
  totalPoints, 
  achievements,
  currentChapter,
  onRestartChapter 
}: GameMenuProps) {
  const levelNames = {
    beginner: 'Middle School',
    intermediate: 'High School',
    advanced: 'Adult'
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-gray-900">
        {/* Header */}
        <div className="relative p-6 border-b-4 border-gray-900 bg-orange-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-900"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Game Menu</h2>
          <p className="text-gray-700">Fahrenheit 451</p>
        </div>

        {/* Stats */}
        <div className="p-6 border-b-4 border-gray-900 bg-yellow-50">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-300 rounded-2xl p-4 border-3 border-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-gray-900" />
                <span className="text-gray-900 text-sm font-bold">Points</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalPoints}</div>
            </div>

            <div className="bg-purple-300 rounded-2xl p-4 border-3 border-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-gray-900" />
                <span className="text-gray-900 text-sm font-bold">Achievements</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{achievements}</div>
            </div>

            <div className="bg-blue-300 rounded-2xl p-4 border-3 border-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-gray-900" />
                <span className="text-gray-900 text-sm font-bold">Chapter</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{currentChapter + 1}/5</div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="p-6 space-y-3">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-4 p-4 bg-green-100 hover:bg-green-200 rounded-2xl transition-all border-3 border-gray-900"
          >
            <div className="p-3 bg-green-400 rounded-xl border-2 border-gray-900">
              <BookOpen className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-bold text-lg">Resume Story</div>
              <div className="text-gray-700 text-sm">Keep reading!</div>
            </div>
          </button>

          <button
            onClick={onChapterSelect}
            className="w-full flex items-center gap-4 p-4 bg-purple-100 hover:bg-purple-200 rounded-2xl transition-all border-3 border-gray-900"
          >
            <div className="p-3 bg-purple-400 rounded-xl border-2 border-gray-900">
              <List className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-bold text-lg">Chapter Select</div>
              <div className="text-gray-700 text-sm">Jump to another chapter</div>
            </div>
          </button>

          <button
            onClick={onRestartChapter}
            className="w-full flex items-center gap-4 p-4 bg-blue-100 hover:bg-blue-200 rounded-2xl transition-all border-3 border-gray-900"
          >
            <div className="p-3 bg-blue-400 rounded-xl border-2 border-gray-900">
              <RotateCcw className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-bold text-lg">Restart Chapter</div>
              <div className="text-gray-700 text-sm">Start over from the beginning</div>
            </div>
          </button>

          <button
            onClick={onChangeLevel}
            className="w-full flex items-center gap-4 p-4 bg-orange-100 hover:bg-orange-200 rounded-2xl transition-all border-3 border-gray-900"
          >
            <div className="p-3 bg-orange-400 rounded-xl border-2 border-gray-900">
              <Settings className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-bold text-lg">Reading Level</div>
              <div className="text-gray-700 text-sm">
                Currently: {levelNames[currentLevel]}
              </div>
            </div>
          </button>

          <button
            onClick={onLibrary}
            className="w-full flex items-center gap-4 p-4 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-all border-3 border-gray-900"
          >
            <div className="p-3 bg-pink-400 rounded-xl border-2 border-gray-900">
              <Library className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-bold text-lg">Back to Library</div>
              <div className="text-gray-700 text-sm">Choose a different book</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
