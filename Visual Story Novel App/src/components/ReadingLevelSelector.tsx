import { GraduationCap, BookOpen, Brain } from 'lucide-react';
import { ReadingLevel } from '../App';

interface ReadingLevelSelectorProps {
  currentLevel: ReadingLevel;
  onSelectLevel: (level: ReadingLevel) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const levels = [
  {
    id: 'beginner' as ReadingLevel,
    name: 'Middle School',
    description: 'Simple words and lots of help!',
    icon: BookOpen,
    emoji: '📚',
    color: 'bg-green-400',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-100',
    features: ['Easy words', 'Extra help', 'Fun quizzes']
  },
  {
    id: 'intermediate' as ReadingLevel,
    name: 'High School',
    description: 'Original text with some help',
    icon: GraduationCap,
    emoji: '📖',
    color: 'bg-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-100',
    features: ['Normal reading', 'Some help', 'Good challenge']
  },
  {
    id: 'advanced' as ReadingLevel,
    name: 'Adult',
    description: 'Complex text with deeper ideas',
    icon: Brain,
    emoji: '🎓',
    color: 'bg-purple-400',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-100',
    features: ['Advanced words', 'Deep ideas', 'Full challenge']
  }
];

export function ReadingLevelSelector({ currentLevel, onSelectLevel, onClose, onConfirm }: ReadingLevelSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border-4 border-gray-900">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Pick Your Level! 🎯</h2>
          <p className="text-gray-700 text-lg mb-8">
            Choose how you want to read the story. You can change it anytime!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {levels.map((level) => {
              const Icon = level.icon;
              const isSelected = currentLevel === level.id;
              
              return (
                <button
                  key={level.id}
                  onClick={() => onSelectLevel(level.id)}
                  className={`p-6 rounded-3xl border-4 transition-all ${
                    isSelected
                      ? `${level.borderColor} ${level.bgColor} scale-105 shadow-xl`
                      : 'border-gray-300 bg-white hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{level.emoji}</div>
                    <div className={`inline-block px-4 py-2 ${level.color} rounded-2xl border-3 border-gray-900`}>
                      <Icon className="w-8 h-8 text-gray-900 mx-auto" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-2xl mb-3 text-center">
                    {level.name}
                  </h3>
                  <p className="text-gray-700 mb-4 text-center">
                    {level.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {level.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 justify-center">
                        <span className="text-2xl">✓</span>
                        <span className="font-semibold text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="mt-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-full text-center border-3 border-gray-900">
                      ⭐ Selected!
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 text-gray-900 rounded-2xl hover:bg-gray-300 transition-colors font-bold text-lg border-3 border-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-colors font-bold text-lg border-3 border-gray-900 shadow-lg"
            >
              Start Reading! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}