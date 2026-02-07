import { User } from 'lucide-react';
import { ReadingLevel } from '../App';

const characters = [
  {
    name: 'Guy Montag',
    role: 'Protagonist',
    description: {
      beginner: 'The main character! A firefighter who burns books but starts to wonder if that\'s wrong. He learns to think for himself.',
      intermediate: 'A fireman who burns books but begins to question his society and seeks knowledge.',
      advanced: 'The protagonist whose intellectual awakening from conformist book-burner to enlightened rebel embodies the novel\'s critique of censorship and anti-intellectualism.'
    },
    traits: ['Curious', 'Conflicted', 'Brave'],
    color: 'orange'
  },
  {
    name: 'Clarisse McClellan',
    role: 'Catalyst',
    description: {
      beginner: 'A 17-year-old girl who loves nature and asks lots of questions. She helps Montag see the world differently.',
      intermediate: 'A 17-year-old girl who asks questions and makes Montag think about life differently.',
      advanced: 'A free-spirited adolescent who serves as the catalyst for Montag\'s transformation, representing innocence, curiosity, and the human connection absent from dystopian society.'
    },
    traits: ['Thoughtful', 'Free-spirited', 'Observant'],
    color: 'blue'
  },
  {
    name: 'Mildred Montag',
    role: 'Montag\'s Wife',
    description: {
      beginner: 'Montag\'s wife who spends all day watching TV and doesn\'t like to think or talk about serious things.',
      intermediate: 'Represents the conformist society, obsessed with TV and afraid of books.',
      advanced: 'Montag\'s wife who epitomizes the spiritually vacant masses, narcotized by technology and entertainment, incapable of genuine human connection.'
    },
    traits: ['Distant', 'Conformist', 'Fearful'],
    color: 'gray'
  },
  {
    name: 'Captain Beatty',
    role: 'Antagonist',
    description: {
      beginner: 'Montag\'s boss who knows a lot about books but thinks they should all be burned. He\'s the villain of the story.',
      intermediate: 'Montag\'s fire chief who is well-read but uses his knowledge to defend censorship.',
      advanced: 'The fire captain whose encyclopedic literary knowledge paradoxically fuels his defense of censorship, representing the self-aware oppressor who chooses totalitarianism over truth.'
    },
    traits: ['Intelligent', 'Manipulative', 'Cynical'],
    color: 'red'
  },
  {
    name: 'Professor Faber',
    role: 'Mentor',
    description: {
      beginner: 'A kind old man who used to be a teacher. He helps Montag understand why books and ideas are important.',
      intermediate: 'A former English professor who helps Montag understand the value of books.',
      advanced: 'A retired English professor who represents the intellectual class\'s complicity through cowardice, later becoming Montag\'s guide to understanding literature\'s social function.'
    },
    traits: ['Wise', 'Cautious', 'Regretful'],
    color: 'green'
  },
  {
    name: 'Granger',
    role: 'Guide',
    description: {
      beginner: 'The leader of a group of people who memorize books to save them. He gives Montag hope for the future.',
      intermediate: 'Leader of the "book people" who memorize literature to preserve it.',
      advanced: 'Leader of the intellectual exiles who preserve literature through memorization, embodying hope for cultural rebirth and the resilience of human knowledge.'
    },
    traits: ['Hopeful', 'Patient', 'Visionary'],
    color: 'purple'
  }
];

const colorClasses = {
  orange: 'bg-orange-100 text-orange-700 border-orange-300',
  blue: 'bg-blue-100 text-blue-700 border-blue-300',
  gray: 'bg-gray-100 text-gray-700 border-gray-300',
  red: 'bg-red-100 text-red-700 border-red-300',
  green: 'bg-green-100 text-green-700 border-green-300',
  purple: 'bg-purple-100 text-purple-700 border-purple-300'
};

export function CharacterGuide({ readingLevel }: { readingLevel: ReadingLevel }) {
  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-4">Character Guide</h2>
      <div className="space-y-4">
        {characters.map((character, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-full ${colorClasses[character.color as keyof typeof colorClasses]}`}>
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{character.name}</h3>
                <p className="text-sm text-gray-600">{character.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {character.description[readingLevel]}
            </p>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((trait, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full border ${colorClasses[character.color as keyof typeof colorClasses]}`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}