import { ChevronLeft, ChevronRight, Lightbulb, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { ReadingLevel } from '../App';
import { InteractiveQuiz } from './InteractiveQuiz';
import { VocabularyCard } from './VocabularyCard';

interface StoryReaderProps {
  currentChapter: number;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  readingLevel: ReadingLevel;
}

const chapters = [
  {
    title: 'Part One: The Hearth and the Salamander',
    sections: [
      {
        text: 'It was a pleasure to burn. It was a special pleasure to see things eaten, to see things blackened and changed.',
        image: 'firefighter burning books night',
        context: {
          beginner: 'Guy Montag is a firefighter, but in his world, firefighters don\'t put out fires - they START them! His job is to burn books because the government says books are dangerous.',
          intermediate: 'We meet Guy Montag, a fireman whose job is to burn books in a future society where reading is forbidden. He takes pride in his destructive work.',
          advanced: 'The opening establishes Montag\'s role in a dystopian society where firemen serve as censors, destroying literature. The sensory language reveals his initial satisfaction with destruction, foreshadowing his transformation.'
        },
        vocabulary: [
          { word: 'hearth', definition: 'The floor of a fireplace, symbolizing home and warmth', example: 'The family gathered around the hearth on cold nights.' },
          { word: 'salamander', definition: 'A mythical creature believed to live in fire, symbol of the firemen', example: 'The salamander logo was painted on all fire trucks.' }
        ],
        interactiveElements: [
          { type: 'clickable', word: 'pleasure', hint: 'Why would burning books be pleasurable? Click to explore!' },
          { type: 'clickable', word: 'blackened', hint: 'What happens when things burn?' }
        ]
      },
      {
        text: 'With the brass nozzle in his fists, with this great python spitting its venomous kerosene upon the world, the blood pounded in his head.',
        image: 'flame thrower fire night city',
        context: {
          beginner: 'Montag uses a flame-thrower (like a big hose that shoots fire) to burn books. He feels powerful and excited when he does this.',
          intermediate: 'Montag takes pride in his work, viewing the flamethrower as a powerful tool of destruction. The metaphor compares it to a snake.',
          advanced: 'Bradbury employs vivid metaphorical language: the "python" imagery suggests both power and danger. The physiological response ("blood pounded") indicates Montag\'s visceral connection to destruction.'
        },
        vocabulary: [
          { word: 'python', definition: 'Here, a metaphor for the fire hose - comparing it to a large snake', example: 'The python wrapped around its prey.' },
          { word: 'venomous', definition: 'Poisonous; deadly; harmful', example: 'The snake\'s venomous bite was dangerous.' }
        ],
        interactiveElements: []
      },
      {
        text: '"Do you ever read any of the books you burn?" she asked. Montag laughed. "That\'s against the law!"',
        image: 'young woman questioning man moonlight',
        context: {
          beginner: 'Montag meets a teenage girl named Clarisse who asks him interesting questions. She makes him think about things he never thought about before.',
          intermediate: 'Montag meets Clarisse, a curious 17-year-old who asks him questions that make him think differently about his life and his job.',
          advanced: 'Clarisse\'s Socratic questioning disrupts Montag\'s complacency. Her innocent inquiry exposes the absurdity of destroying something without understanding it, catalyzing his intellectual awakening.'
        },
        vocabulary: [],
        interactiveElements: [
          { type: 'clickable', word: 'law', hint: 'Who makes laws? Why would reading be against the law?' }
        ]
      }
    ],
    questions: {
      beginner: [
        { question: 'What is Montag\'s job?', options: ['Put out fires', 'Burn books', 'Read books', 'Write books'], correct: 1 },
        { question: 'Who asks Montag if he reads the books he burns?', options: ['His boss', 'Clarisse', 'His wife', 'A stranger'], correct: 1 }
      ],
      intermediate: [
        'Why do you think books are burned in this society?',
        'How does meeting Clarisse change Montag\'s perspective?',
        'What do the symbols of fire and the salamander represent?'
      ],
      advanced: [
        'Analyze the significance of the opening line "It was a pleasure to burn" in establishing tone and foreshadowing Montag\'s arc.',
        'How does Bradbury use sensory imagery to critique censorship and conformity?',
        'What role does Clarisse serve as a catalyst for Montag\'s transformation?'
      ]
    }
  },
  {
    title: 'The Meeting with Clarisse',
    sections: [
      {
        text: '"Are you happy?" she said. Montag felt his body divide itself into two parts, one that wanted to laugh and one that wanted to cry.',
        image: 'contemplative man face close up portrait',
        context: {
          beginner: 'Clarisse asks Montag a simple question: "Are you happy?" He realizes he doesn\'t know the answer! This makes him feel confused and sad.',
          intermediate: 'Clarisse\'s simple question forces Montag to examine his life and happiness for the first time. He\'s never thought about whether he\'s truly happy.',
          advanced: 'This pivotal moment represents Montag\'s cognitive dissonance. The physical metaphor of division illustrates his fractured consciousness as he confronts existential questions he\'s long suppressed.'
        },
        vocabulary: [
          { word: 'contemplative', definition: 'Thoughtful; reflective; deeply considering something', example: 'She sat in a contemplative silence, thinking about her future.' }
        ],
        interactiveElements: [
          { type: 'clickable', word: 'happy', hint: 'What does it mean to be truly happy?' }
        ]
      },
      {
        text: 'She walked away slowly, and he stood there watching her go, feeling suddenly empty.',
        image: 'woman walking away suburban street evening',
        context: {
          beginner: 'After talking to Clarisse, Montag feels different. He feels empty inside, like something is missing from his life.',
          intermediate: 'Montag realizes that his conversation with Clarisse has awakened something in him - a sense that his life lacks meaning.',
          advanced: 'The emptiness Montag experiences signifies the void left by years of intellectual starvation. Clarisse\'s departure creates a literal and metaphorical absence.'
        },
        vocabulary: [],
        interactiveElements: []
      }
    ],
    questions: {
      beginner: [
        { question: 'What question does Clarisse ask Montag?', options: ['Are you hungry?', 'Are you happy?', 'Are you tired?', 'Are you scared?'], correct: 1 },
        { question: 'How does Montag feel after talking to Clarisse?', options: ['Excited', 'Empty', 'Angry', 'Sleepy'], correct: 1 }
      ],
      intermediate: [
        'Why is Clarisse\'s question so powerful?',
        'What does it mean to truly be happy?',
        'How does this encounter change Montag?'
      ],
      advanced: [
        'Examine the existential implications of Clarisse\'s question within the context of a conformist society.',
        'How does Bradbury use the motif of emptiness to represent spiritual and intellectual deprivation?'
      ]
    }
  },
  {
    title: 'Part Two: The Sieve and the Sand',
    sections: [
      {
        text: 'The old man\'s hands were trembling. "I\'ve been afraid for so long. Afraid of my own conscience."',
        image: 'elderly man trembling hands books',
        context: {
          beginner: 'Montag meets an old man named Faber who used to be a teacher. Faber has been hiding because he loves books and that\'s dangerous.',
          intermediate: 'Montag meets Faber, a former English professor who has been hiding his love of books out of fear.',
          advanced: 'Faber represents the intellectual class\'s complicity in societal decline. His trembling and fear illustrate how totalitarian regimes succeed through intimidation of the educated.'
        },
        vocabulary: [
          { word: 'conscience', definition: 'Inner sense of what is right or wrong; your moral compass', example: 'His conscience told him to tell the truth.' }
        ],
        interactiveElements: [
          { type: 'clickable', word: 'afraid', hint: 'What could Faber be afraid of?' }
        ]
      },
      {
        text: '"It\'s not books you need, it\'s some of the things that once were in books."',
        image: 'old books wisdom knowledge light',
        context: {
          beginner: 'Faber explains that books aren\'t special by themselves. What\'s important is the IDEAS and KNOWLEDGE inside them - the truth and wisdom they contain.',
          intermediate: 'Faber explains that books represent ideas, quality of information, and the freedom to think critically.',
          advanced: 'Faber articulates Bradbury\'s central thesis: books are vessels for truth, quality information, and the leisure to digest ideas - all necessary for an enlightened democracy.'
        },
        vocabulary: [],
        interactiveElements: [
          { type: 'clickable', word: 'things that once were in books', hint: 'What makes books valuable?' }
        ]
      }
    ],
    questions: {
      beginner: [
        { question: 'Who is Faber?', options: ['A firefighter', 'A teacher', 'A doctor', 'A policeman'], correct: 1 },
        { question: 'According to Faber, what matters most?', options: ['The paper', 'The ideas inside', 'The covers', 'The pictures'], correct: 1 }
      ],
      intermediate: [
        'What does Faber mean by "things that once were in books"?',
        'Why is the section titled "The Sieve and the Sand"?',
        'What three things does Faber say are missing from society?'
      ],
      advanced: [
        'Analyze Faber\'s three requirements for a literate society: quality information, leisure to digest it, and the right to act on what we learn.',
        'How does the sieve and sand metaphor represent the difficulty of retaining knowledge in a hostile environment?'
      ]
    }
  },
  {
    title: 'Part Three: Burning Bright',
    sections: [
      {
        text: 'He burnt the bedroom walls and the cosmetics chest because he wanted to change everything.',
        image: 'man burning house fire destruction',
        context: {
          beginner: 'Montag burns down his own house! He\'s destroying his old life because he wants to become a new person.',
          intermediate: 'Montag burns his own house, destroying his old life and beginning his transformation into a free thinker.',
          advanced: 'The act of burning his home represents Montag\'s complete rejection of his former life. Fire, once a tool of oppression, becomes an instrument of personal liberation.'
        },
        vocabulary: [],
        interactiveElements: [
          { type: 'clickable', word: 'change everything', hint: 'Sometimes we have to destroy the old to create something new' }
        ]
      },
      {
        text: 'He felt his body fall into the river, the cold water shocking his system, washing away the old Guy Montag.',
        image: 'man river water escape night',
        context: {
          beginner: 'Montag jumps into a river to escape. The water is like a bath that washes away who he used to be, and he becomes a new person.',
          intermediate: 'Montag escapes the city by crossing a river, symbolizing rebirth and cleansing from his old life.',
          advanced: 'The river serves as a baptismal symbol of death and rebirth. The contrast between fire (destruction) and water (renewal) marks Montag\'s metamorphosis.'
        },
        vocabulary: [
          { word: 'rebirth', definition: 'Starting life anew; being born again; transformation', example: 'Spring is a time of rebirth for nature.' }
        ],
        interactiveElements: []
      }
    ],
    questions: {
      beginner: [
        { question: 'What does Montag burn?', options: ['A school', 'His house', 'A library', 'A car'], correct: 1 },
        { question: 'What does the river symbolize?', options: ['Danger', 'Sadness', 'A new beginning', 'The end'], correct: 2 }
      ],
      intermediate: [
        'What does fire symbolize in this final section compared to the beginning?',
        'How has Montag changed from the beginning of the story?',
        'What is the significance of water imagery?'
      ],
      advanced: [
        'Trace the transformation of fire as a symbol throughout the novel from tool of oppression to instrument of liberation.',
        'Analyze how Bradbury employs archetypal symbols (fire, water, phoenix) to structure Montag\'s hero\'s journey.'
      ]
    }
  },
  {
    title: 'The Book People',
    sections: [
      {
        text: '"We\'re book burners too. We read the books and burn them, afraid they\'d be found. But we remembered them."',
        image: 'group people campfire forest night',
        context: {
          beginner: 'Montag finds a group of people who memorized entire books! They read books, then burn them so they won\'t get caught, but they remember every word.',
          intermediate: 'Montag finds a community of people who memorize books to preserve knowledge and keep it safe from the government.',
          advanced: 'The book people represent the preservation of human knowledge through oral tradition, echoing historical periods of intellectual persecution. Each person becomes a living library.'
        },
        vocabulary: [],
        interactiveElements: [
          { type: 'clickable', word: 'remembered', hint: 'Memory is more powerful than any fire!' }
        ]
      },
      {
        text: 'The city behind them exploded into flames. A new world waited to be built from the ashes.',
        image: 'city explosion fire distance phoenix rising',
        context: {
          beginner: 'The city is destroyed by war, but Montag and the book people have hope. Like a phoenix bird that rises from ashes, they will build a better world.',
          intermediate: 'The city is destroyed, but hope remains for rebuilding a better society where books and ideas are valued.',
          advanced: 'The apocalyptic destruction enables societal rebirth. The phoenix metaphor, referenced throughout, culminates here: civilization must be destroyed and rebuilt on foundations of knowledge and truth.'
        },
        vocabulary: [
          { word: 'phoenix', definition: 'A mythical bird that rises from its own ashes, symbolizing renewal and hope', example: 'Like a phoenix, the company rose from bankruptcy to success.' }
        ],
        interactiveElements: [
          { type: 'clickable', word: 'ashes', hint: 'From destruction comes new life' }
        ]
      }
    ],
    questions: {
      beginner: [
        { question: 'What do the book people do?', options: ['Burn all books', 'Memorize books', 'Hide books', 'Sell books'], correct: 1 },
        { question: 'What is a phoenix?', options: ['A type of fire', 'A bird that rises from ashes', 'A city', 'A book'], correct: 1 }
      ],
      intermediate: [
        'Why is memorizing books important?',
        'What does the phoenix symbolize for the future?',
        'What message does the ending give us about hope and renewal?'
      ],
      advanced: [
        'Examine how the novel\'s conclusion balances destruction with hope, and evaluate Bradbury\'s commentary on cyclical history.',
        'How does the concept of humans as living books challenge our understanding of knowledge preservation in the digital age?',
        'Analyze the phoenix as the central organizing metaphor of the novel\'s structure and themes.'
      ]
    }
  }
];

export function StoryReader({ currentChapter, onNextChapter, onPrevChapter, readingLevel }: StoryReaderProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set());
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  const chapter = chapters[currentChapter];
  const section = chapter.sections[currentSection];
  const isLastSection = currentSection === chapter.sections.length - 1;
  const isFirstSection = currentSection === 0;

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSection(currentSection + 1);
      setHighlightedWords(new Set());
    } else if (readingLevel === 'beginner') {
      setShowQuiz(true);
    } else {
      onNextChapter();
      setCurrentSection(0);
      setHighlightedWords(new Set());
    }
  };

  const handlePrev = () => {
    if (!isFirstSection) {
      setCurrentSection(currentSection - 1);
      setHighlightedWords(new Set());
    } else if (currentChapter > 0) {
      onPrevChapter();
      setCurrentSection(0);
      setHighlightedWords(new Set());
    }
  };

  const toggleWordHighlight = (word: string) => {
    const newHighlighted = new Set(highlightedWords);
    if (newHighlighted.has(word)) {
      newHighlighted.delete(word);
    } else {
      newHighlighted.add(word);
    }
    setHighlightedWords(newHighlighted);
  };

  const renderInteractiveText = () => {
    let text = section.text;
    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    section.interactiveElements?.forEach((element, idx) => {
      const wordIndex = text.indexOf(element.word, lastIndex);
      if (wordIndex !== -1) {
        // Add text before the word
        if (wordIndex > lastIndex) {
          elements.push(
            <span key={`text-${idx}`}>{text.substring(lastIndex, wordIndex)}</span>
          );
        }
        
        // Add interactive word
        const isHighlighted = highlightedWords.has(element.word);
        elements.push(
          <button
            key={`word-${idx}`}
            onClick={() => toggleWordHighlight(element.word)}
            className={`relative inline-block transition-all ${
              isHighlighted ? 'text-orange-600 font-semibold' : 'text-current border-b-2 border-dotted border-orange-300 hover:border-orange-500'
            }`}
            title={element.hint}
          >
            {element.word}
            {isHighlighted && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {element.hint}
              </span>
            )}
          </button>
        );
        
        lastIndex = wordIndex + element.word.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return elements.length > 0 ? elements : text;
  };

  if (showQuiz) {
    return (
      <InteractiveQuiz
        questions={chapter.questions.beginner as any}
        onComplete={() => {
          setShowQuiz(false);
          onNextChapter();
          setCurrentSection(0);
        }}
        chapterTitle={chapter.title}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chapter Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>Fahrenheit 451 by Ray Bradbury</span>
          </div>
          
          {readingLevel === 'beginner' && (
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Toggle sound effects"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{chapter.title}</h2>
        <div className="flex gap-2">
          {chapter.sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index === currentSection ? 'bg-orange-500' : 'bg-gray-200'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Visual Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="aspect-video bg-gray-100 relative">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1?q=80&w=1200`}
            alt={section.image}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white text-lg italic leading-relaxed">
              "{renderInteractiveText()}"
            </p>
          </div>
          
          {readingLevel === 'beginner' && section.interactiveElements && section.interactiveElements.length > 0 && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4" />
              Click highlighted words!
            </div>
          )}
        </div>
      </div>

      {/* Context Panel */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">What's Happening Here?</h3>
            <p className="text-blue-800 leading-relaxed">
              {section.context[readingLevel]}
            </p>
          </div>
        </div>
      </div>

      {/* Vocabulary */}
      {section.vocabulary.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {section.vocabulary.map((item, index) => (
            <VocabularyCard
              key={index}
              word={item.word}
              definition={item.definition}
              example={item.example}
              readingLevel={readingLevel}
            />
          ))}
        </div>
      )}

      {/* Discussion Questions (intermediate/advanced - shown at end of chapter) */}
      {isLastSection && readingLevel !== 'beginner' && (
        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-purple-900 mb-4">
            {readingLevel === 'advanced' ? 'Critical Analysis' : 'Think About It'}
          </h3>
          <ul className="space-y-3">
            {(chapter.questions[readingLevel] as string[]).map((question, index) => (
              <li key={index} className="flex gap-3 text-purple-800">
                <span className="text-purple-500 font-semibold">{index + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentChapter === 0 && isFirstSection}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-600">
          Section {currentSection + 1} of {chapter.sections.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentChapter === chapters.length - 1 && isLastSection && readingLevel !== 'beginner'}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isLastSection && readingLevel === 'beginner' ? 'Take Quiz' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
