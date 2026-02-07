import { ArrowLeft, Play, Lock, CheckCircle, Trophy } from 'lucide-react';
import { fahrenheit451 } from '../data/bookData';

interface ChapterSelectProps {
  onSelectChapter: (index: number) => void;
  onBack: () => void;
  currentProgress: number;
}

export function ChapterSelect({ onSelectChapter, onBack, currentProgress }: ChapterSelectProps) {
  const chapters = fahrenheit451.chapters;
  
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors border-2 border-gray-900"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{fahrenheit451.title}</h1>
              <p className="text-gray-600">Pick a chapter to start!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Card */}
        <div className="bg-white rounded-3xl p-8 mb-12 border-4 border-gray-900 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-yellow-400 rounded-2xl border-4 border-gray-900">
              <Trophy className="w-12 h-12 text-gray-900" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-6 border-3 border-gray-900 overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${(currentProgress / chapters.length) * 100}%` }}
                  >
                    {currentProgress > 0 && (
                      <span className="text-white font-bold text-sm px-2">
                        {Math.round((currentProgress / chapters.length) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {currentProgress}/{chapters.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => {
            const isCompleted = index < currentProgress;
            const isUnlocked = index <= currentProgress;
            const isCurrent = index === currentProgress;

            return (
              <div
                key={chapter.chapterNumber}
                className={`bg-white rounded-3xl overflow-hidden border-4 border-gray-900 shadow-lg transition-transform ${
                  isUnlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}
                onClick={() => isUnlocked && onSelectChapter(index)}
              >
                {/* Chapter Header */}
                <div 
                  className="p-8 text-center relative"
                  style={{ backgroundColor: chapter.color }}
                >
                  <div className="text-6xl mb-3">{chapter.emoji}</div>
                  <div className="bg-white rounded-full px-4 py-2 inline-block font-bold text-lg border-3 border-gray-900">
                    Chapter {chapter.chapterNumber}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isCompleted && (
                      <div className="bg-green-500 text-white px-3 py-2 rounded-full font-bold flex items-center gap-2 border-3 border-white shadow-md">
                        <CheckCircle className="w-5 h-5" />
                        Done!
                      </div>
                    )}
                    {isCurrent && !isCompleted && (
                      <div className="bg-orange-500 text-white px-3 py-2 rounded-full font-bold animate-pulse border-3 border-white">
                        ⭐ Current
                      </div>
                    )}
                    {!isUnlocked && (
                      <div className="bg-gray-600 text-white px-3 py-2 rounded-full font-bold flex items-center gap-2 border-3 border-white">
                        <Lock className="w-5 h-5" />
                        Locked
                      </div>
                    )}
                  </div>
                </div>

                {/* Chapter Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{chapter.title}</h3>
                  <p className="text-gray-700 mb-4">{chapter.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="font-bold text-gray-600">
                      📄 {chapter.scenes.length} Scenes
                    </div>
                    {isUnlocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectChapter(index);
                        }}
                        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold flex items-center gap-2 border-3 border-gray-900 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                        {isCompleted ? 'Replay' : isCurrent ? 'Continue' : 'Start'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-12 bg-blue-100 rounded-3xl p-8 border-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Reading Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div key="tip-1" className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <p className="text-gray-700">Replay chapters to earn more points</p>
            </div>
            <div key="tip-2" className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <p className="text-gray-700">Try different reading levels</p>
            </div>
            <div key="tip-3" className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <p className="text-gray-700">Make different choices each time</p>
            </div>
            <div key="tip-4" className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <p className="text-gray-700">Unlock special achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}