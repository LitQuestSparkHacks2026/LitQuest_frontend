// MongoDB-ready structure for book content
// This structure can be directly imported into MongoDB collections
// import backgroundImage1 from '../pictures/il_fullxfull.1537622781_49kp.jpg';

export interface VocabularyEntry {
  word: string;
  definition: string;
  simplified: string;
}

export interface DialogueLine {
  character: string;
  text: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  sprite?: string;
  spritePosition?: 'left' | 'center' | 'right';
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'thoughtful';
  thought?: boolean;
}

export interface ChoiceOption {
  text: string;
  feedback: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  points: number;
}

export interface SceneChoice {
  prompt: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  options: ChoiceOption[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface GameScene {
  id: string;
  sceneNumber: number;
  background: string;
  dialogue: DialogueLine[];
  choice?: SceneChoice;
  achievement?: Achievement;
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  emoji: string;
  description: string;
  color: string;
  scenes: GameScene[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverSearch: string;
  available: boolean;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalChapters: number;
  color: string;
  vocabulary: VocabularyEntry[];
  chapters: Chapter[];
}

// Vocabulary Bank for Fahrenheit 451
export const fahrenheit451Vocabulary: VocabularyEntry[] = [
  { word: 'forbidden', definition: 'Not allowed; banned', simplified: 'not allowed' },
  { word: 'pleasure', definition: 'A feeling of happiness or enjoyment', simplified: 'happiness' },
  { word: 'blacken', definition: 'To become dark or black', simplified: 'turn black' },
  { word: 'brass', definition: 'A yellow metal', simplified: 'metal' },
  { word: 'nozzle', definition: 'The end of a hose where liquid comes out', simplified: 'hose end' },
  { word: 'python', definition: 'A large snake; here, a metaphor for the fire hose', simplified: 'big snake' },
  { word: 'venomous', definition: 'Poisonous; deadly', simplified: 'poisonous' },
  { word: 'kerosene', definition: 'A flammable liquid fuel', simplified: 'fuel' },
  { word: 'peculiar', definition: 'Strange; unusual', simplified: 'strange' },
  { word: 'conscience', definition: 'Inner sense of right and wrong', simplified: 'sense of right and wrong' },
  { word: 'wisdom', definition: 'Deep knowledge and good judgment', simplified: 'knowledge' },
  { word: 'trembling', definition: 'Shaking with fear or emotion', simplified: 'shaking' },
  { word: 'transformation', definition: 'A complete change', simplified: 'big change' },
  { word: 'rebirth', definition: 'Being born again; starting fresh', simplified: 'new beginning' },
  { word: 'dystopian', definition: 'An imagined bad future society', simplified: 'bad future world' },
  { word: 'censorship', definition: 'Blocking information or ideas', simplified: 'hiding information' },
  { word: 'conformity', definition: 'Acting like everyone else', simplified: 'being the same' },
  { word: 'totalitarianism', definition: 'Government with total control', simplified: 'total control' },
  { word: 'surveillance', definition: 'Watching and monitoring people', simplified: 'watching people' },
  { word: 'metaphor', definition: 'Comparing two things without using like or as', simplified: 'comparison' },
  { word: 'visceral', definition: 'Deep internal feeling', simplified: 'deep feeling' },
  { word: 'empowerment', definition: 'Feeling of power and control', simplified: 'feeling powerful' },
  { word: 'anomalous', definition: 'Different from normal', simplified: 'different' },
  { word: 'transgressed', definition: 'Broke a rule or law', simplified: 'broke rules' },
  { word: 'introspection', definition: 'Looking inward at your own thoughts', simplified: 'thinking about yourself' },
  { word: 'existential', definition: 'About the meaning of life', simplified: 'about life meaning' },
  { word: 'contemplation', definition: 'Deep thinking', simplified: 'thinking deeply' },
  { word: 'catalyzes', definition: 'Causes something to happen', simplified: 'makes happen' },
  { word: 'obliterated', definition: 'Completely destroyed', simplified: 'destroyed' },
  { word: 'metamorphosed', definition: 'Completely changed form', simplified: 'changed form' },
  { word: 'baptismal', definition: 'Like a religious washing ceremony', simplified: 'like a cleansing' },
  { word: 'heralding', definition: 'Announcing something coming', simplified: 'announcing' },
  { word: 'biblioclasts', definition: 'People who destroy books', simplified: 'book destroyers' },
  { word: 'archive', definition: 'A collection of historical records', simplified: 'collection' },
  { word: 'preservation', definition: 'Keeping something safe', simplified: 'keeping safe' },
  { word: 'apocalyptic', definition: 'End of the world', simplified: 'world ending' },
  { word: 'conflagration', definition: 'A large destructive fire', simplified: 'huge fire' },
  { word: 'mythical', definition: 'From old stories and legends', simplified: 'from legends' },
  { word: 'phoenix', definition: 'A bird that rises from ashes in mythology', simplified: 'magic bird reborn' }
];

// Complete Fahrenheit 451 Book Data
export const fahrenheit451 = {
  id: 'fahrenheit-451',
  title: 'Fahrenheit 451',
  author: 'Ray Bradbury',
  available: true,
  description: 'A dystopian novel about a future society where books are banned.',
  difficulty: 'Intermediate',
  totalChapters: 3,
  color: '#FF6B35',

  // KEEP vocabulary exactly as-is
  vocabulary: fahrenheit451Vocabulary,

  // Chapters are now just scene pointers
  chapters: [
    {
      chapterNumber: 1,
      title: 'Meeting Clarisse McClellan',
      emoji: '🌙',
      description: 'Montag meets Clarisse on a quiet suburban street.',
      color: '#FF6B35',

      scenes: [
        {
          id: '01-sidewalk-complete', // MUST match Mongo
          sceneNumber: 1,
          background: '/src/pictures/scene_1_background.png',
          dialogue: [] // intentionally empty – Mongo drives content
        }
      ]
    },

    {
      chapterNumber: 2,
      title: 'The Workplace',
      emoji: '🔥',
      description: 'Life inside the firehouse.',
      color: '#FF9F1C',

      scenes: [
        {
          id: '03-firehouse-complete',
          sceneNumber: 1,
          background: '/src/pictures/scene02.png',
          dialogue: []
        }
      ]
    },

    {
      chapterNumber: 3,
      title: 'The Old Woman',
      emoji: '🏚️',
      description: 'A fire that changes everything.',
      color: '#E63946',

      scenes: [
        {
          id: '04-OldWomanHouse-complete',
          sceneNumber: 1,
          background: '/src/pictures/scene03.png',
          dialogue: []
        }
      ]
    }
  ]
};


// Library catalog - all available and upcoming books
export const libraryBooks = [
  {
    id: 'fahrenheit-451',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    available: true,
    description: 'A dystopian novel about a future society where books are banned.',
    difficulty: 'Intermediate',
    chapters: 5,
    color: '#FF6B35'
  },
  {
    id: 'to-kill-mockingbird',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    available: false,
    description: 'A classic about racial injustice and childhood innocence.',
    difficulty: 'Intermediate',
    chapters: 8,
    color: '#4ECDC4'
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    available: false,
    description: 'A haunting tale of totalitarianism and surveillance.',
    difficulty: 'Advanced',
    chapters: 7,
    color: '#95A3B3'
  },
  {
    id: 'great-gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    available: false,
    description: 'A story of wealth, love, and the American Dream.',
    difficulty: 'Advanced',
    chapters: 6,
    color: '#FFD93D'
  },
  {
    id: 'animal-farm',
    title: 'Animal Farm',
    author: 'George Orwell',
    available: false,
    description: 'An allegorical novella about farm animals who rebel.',
    difficulty: 'Beginner',
    chapters: 5,
    color: '#6BCF7F'
  },
  {
    id: 'lord-of-flies',
    title: 'Lord of the Flies',
    author: 'William Golding',
    available: false,
    description: 'A tale of survival and civilization on a deserted island.',
    difficulty: 'Intermediate',
    chapters: 6,
    color: '#E63946'
  }
];
