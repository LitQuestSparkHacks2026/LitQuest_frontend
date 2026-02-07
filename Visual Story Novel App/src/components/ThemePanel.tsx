import { Flame, Eye, BookOpen, Users, Lightbulb, Heart } from 'lucide-react';
import { ReadingLevel } from '../App';
import { useState } from 'react';

const themes = [
  {
    title: 'Censorship & Knowledge',
    icon: BookOpen,
    description: {
      beginner: 'When people aren\'t allowed to read or learn, they can\'t think for themselves. Books help us learn and grow!',
      intermediate: 'The danger of limiting access to information and the power of knowledge to transform society.',
      advanced: 'Bradbury critiques totalitarian censorship and anti-intellectualism, arguing that access to diverse ideas is essential for individual autonomy and democratic society.'
    },
    examples: ['Book burning', 'Faber\'s wisdom', 'The memorized books'],
    color: 'text-orange-600 bg-orange-50'
  },
  {
    title: 'Technology vs. Nature',
    icon: Eye,
    description: {
      beginner: 'Too much TV and technology can make us forget about real life, nature, and spending time with people we care about.',
      intermediate: 'The conflict between artificial entertainment and genuine human connection with the natural world.',
      advanced: 'The novel explores how technology, when used as a narcotic rather than a tool, alienates individuals from nature, authentic relationships, and self-awareness.'
    },
    examples: ['TV walls', 'Mechanical hound', 'Clarisse\'s nature walks'],
    color: 'text-blue-600 bg-blue-50'
  },
  {
    title: 'Conformity vs. Individuality',
    icon: Users,
    description: {
      beginner: 'It\'s important to think for yourself, even if everyone else thinks differently. Being unique is okay!',
      intermediate: 'The struggle between fitting in with society and thinking for yourself.',
      advanced: 'Examines the tension between societal pressure to conform and the human need for individual expression, critical thinking, and authentic self-determination.'
    },
    examples: ['Mildred\'s conformity', 'Clarisse\'s uniqueness', 'Montag\'s transformation'],
    color: 'text-purple-600 bg-purple-50'
  },
  {
    title: 'Destruction & Rebirth',
    icon: Flame,
    description: {
      beginner: 'Sometimes things have to be destroyed before something new and better can be built. Like a phoenix rising from ashes!',
      intermediate: 'How destruction can lead to renewal and the phoenix rising from ashes.',
      advanced: 'The paradoxical nature of fire as both destructive and purifying force mirrors the cyclical pattern of societal collapse and reconstruction throughout history.'
    },
    examples: ['Book burning', 'City destruction', 'The book people'],
    color: 'text-red-600 bg-red-50'
  },
  {
    title: 'Happiness vs. Truth',
    icon: Heart,
    description: {
      beginner: 'Is it better to know the truth, even if it\'s hard, or to pretend everything is fine? Real happiness comes from understanding.',
      intermediate: 'Is it better to be ignorantly happy or face uncomfortable truths?',
      advanced: 'Explores the philosophical dilemma between comfortable ignorance and painful enlightenment, questioning whether authentic fulfillment requires confronting difficult realities.'
    },
    examples: ['Clarisse\'s question', 'Mildred\'s escape', 'Montag\'s awakening'],
    color: 'text-pink-600 bg-pink-50'
  },
  {
    title: 'The Power of Questions',
    icon: Lightbulb,
    description: {
      beginner: 'Asking "why?" and "how?" helps us learn and understand the world. Questions are powerful!',
      intermediate: 'How asking questions and thinking critically can change everything.',
      advanced: 'Demonstrates that Socratic inquiry and critical thinking are revolutionary acts in totalitarian societies that depend on unquestioning obedience.'
    },
    examples: ['"Are you happy?"', '"Why do we burn books?"', 'Faber\'s teachings'],
    color: 'text-yellow-600 bg-yellow-50'
  }
];

export function ThemePanel({ readingLevel }: { readingLevel: ReadingLevel }) {
  const [expandedTheme, setExpandedTheme] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-2">Major Themes</h2>
      <p className="text-sm text-gray-600 mb-4">
        {readingLevel === 'beginner' ? 'Big ideas in the story' : 'Important ideas and messages in the story'}
      </p>
      <div className="space-y-4">
        {themes.map((theme, index) => {
          const Icon = theme.icon;
          const isExpanded = expandedTheme === index;
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${theme.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{theme.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {theme.description[readingLevel]}
                  </p>
                </div>
              </div>
              
              {readingLevel === 'beginner' ? (
                <button
                  onClick={() => setExpandedTheme(isExpanded ? null : index)}
                  className="ml-11 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  {isExpanded ? 'Hide' : 'Show'} examples
                </button>
              ) : null}
              
              {(readingLevel !== 'beginner' || isExpanded) && (
                <div className="ml-11 mt-2">
                  <p className="text-xs font-medium text-gray-600 mb-2">Examples in the story:</p>
                  <ul className="space-y-1">
                    {theme.examples.map((example, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}