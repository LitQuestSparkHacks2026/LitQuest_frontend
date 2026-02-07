// MongoDB-ready structure for book content
// This structure can be directly imported into MongoDB collections

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
export const fahrenheit451: Book = {
  id: 'fahrenheit-451',
  title: 'Fahrenheit 451',
  author: 'Ray Bradbury',
  coverSearch: 'fahrenheit 451 book cover fire',
  available: true,
  description: 'A dystopian novel about a future society where books are banned.',
  difficulty: 'Intermediate',
  totalChapters: 5,
  color: '#FF6B35',
  vocabulary: fahrenheit451Vocabulary,
  chapters: [
    {
      chapterNumber: 1,
      title: 'The Burning Beginning',
      emoji: '🔥',
      description: 'Meet Guy Montag, a fireman who burns books. His encounter with Clarisse changes everything.',
      color: '#FF6B35',
      scenes: [
        {
          id: 'ch1_scene1',
          sceneNumber: 1,
          background: 'dark city night fire burning',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'In a world where books are not allowed...',
                intermediate: 'In a world where books are forbidden...',
                advanced: 'In a dystopian world where literature is forbidden...'
              },
              thought: true
            },
            {
              character: 'Montag',
              text: {
                beginner: 'I loved to burn things. It made me feel good.',
                intermediate: 'It was a pleasure to burn.',
                advanced: 'It was a pleasure to burn. A special pleasure to witness destruction.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'neutral'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'I loved watching things turn black and change. Fire is pretty.',
                intermediate: 'I loved watching things blacken and change. Fire is beautiful.',
                advanced: 'I reveled in watching things consumed, blackened, and transformed. Fire possessed an undeniable beauty.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'happy'
            }
          ],
          achievement: {
            id: 'chapter1_start',
            title: 'The Journey Begins',
            description: 'Started your journey into Fahrenheit 451'
          }
        },
        {
          id: 'ch1_scene2',
          sceneNumber: 2,
          background: 'flame thrower fire night',
          dialogue: [
            {
              character: 'Montag',
              text: {
                beginner: 'I held the metal hose that shot fire. It felt powerful in my hands.',
                intermediate: 'The brass nozzle in my fists, the great python spitting its venomous kerosene...',
                advanced: 'The brass nozzle gripped firmly, this great python spitting its venomous kerosene upon the world...'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'neutral'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'My heart beat fast. This feels like power!',
                intermediate: 'My blood pounds in my head. This is power!',
                advanced: 'The blood pounded in my head, a visceral manifestation of power!'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'angry'
            }
          ],
          choice: {
            prompt: {
              beginner: 'How does Montag feel about burning books?',
              intermediate: 'How do you think Montag feels about his job right now?',
              advanced: 'What is Montag\'s emotional and psychological relationship with his occupation?'
            },
            options: [
              { 
                text: 'He loves it and feels powerful', 
                feedback: {
                  beginner: 'Yes! Montag likes his job and feels strong when he burns things.',
                  intermediate: 'Exactly! Montag takes pride in his destructive work at this point.',
                  advanced: 'Correct! Montag derives a sense of empowerment and satisfaction from his role as an instrument of censorship.'
                },
                points: 10 
              },
              { 
                text: 'He feels guilty and sad', 
                feedback: {
                  beginner: 'Not yet. Right now, Montag hasn\'t started feeling bad about his job.',
                  intermediate: 'Not quite yet. At the beginning, Montag hasn\'t started questioning his job.',
                  advanced: 'Premature. His moral crisis and existential doubt have yet to manifest.'
                },
                points: 0 
              },
              { 
                text: 'He doesn\'t care either way', 
                feedback: {
                  beginner: 'Not quite. He has strong feelings - he really enjoys it!',
                  intermediate: 'Actually, he has strong feelings - he enjoys the power and excitement!',
                  advanced: 'Incorrect. He exhibits clear emotional investment in his work, deriving pleasure from destruction.'
                },
                points: 5 
              }
            ]
          }
        },
        {
          id: 'ch1_scene3',
          sceneNumber: 3,
          background: 'suburban street night moonlight young woman',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'Walking home, Montag meets someone different...',
                intermediate: 'Walking home, Montag encounters someone unusual...',
                advanced: 'While returning home, Montag encounters an anomalous individual...'
              },
              thought: true
            },
            {
              character: 'Clarisse',
              text: {
                beginner: 'Hi! Are you our new neighbor?',
                intermediate: 'Hello! You\'re our new neighbor, aren\'t you?',
                advanced: 'Good evening! You\'re our new neighbor, aren\'t you?'
              },
              sprite: 'young-woman-happy',
              spritePosition: 'right',
              emotion: 'happy'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'Yes. I\'m Guy Montag. I\'m a firefighter who burns books.',
                intermediate: 'Yes. Guy Montag. I\'m a fireman.',
                advanced: 'Indeed. Guy Montag. I\'m a fireman.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'left',
              emotion: 'neutral'
            },
            {
              character: 'Clarisse',
              text: {
                beginner: 'Do you ever read the books before you burn them?',
                intermediate: 'Do you ever read any of the books you burn?',
                advanced: 'Do you ever read any of the books before you burn them?'
              },
              sprite: 'young-woman-happy',
              spritePosition: 'right',
              emotion: 'thoughtful'
            }
          ],
          choice: {
            prompt: {
              beginner: 'What would you say if you were Montag?',
              intermediate: 'If you were Montag, how would you respond?',
              advanced: 'How would you respond were you in Montag\'s position?'
            },
            options: [
              { 
                text: '"That\'s against the law!"', 
                feedback: {
                  beginner: 'That\'s what Montag says! He\'s surprised by her question.',
                  intermediate: 'This is what Montag says! He\'s shocked by the question.',
                  advanced: 'Precisely! This reflects Montag\'s conditioned adherence to societal prohibitions.'
                },
                points: 10 
              },
              { 
                text: '"Yes, all the time."', 
                feedback: {
                  beginner: 'No, Montag hasn\'t broken the rules yet. He still follows the law.',
                  intermediate: 'Montag hasn\'t broken the law yet. He\'s still following the rules.',
                  advanced: 'Inaccurate. Montag has not yet transgressed societal norms.'
                },
                points: 0 
              },
              { 
                text: 'Ignore her and walk away', 
                feedback: {
                  beginner: 'Montag is curious about her. He wants to keep talking!',
                  intermediate: 'Montag is curious about this strange girl. He wants to talk to her!',
                  advanced: 'Unlikely. Montag finds her peculiarity intriguing and continues the discourse.'
                },
                points: 5 
              }
            ]
          }
        },
        {
          id: 'ch1_scene4',
          sceneNumber: 4,
          background: 'moonlight suburban peaceful night',
          dialogue: [
            {
              character: 'Clarisse',
              text: {
                beginner: 'I want to ask you something...',
                intermediate: 'I have a question for you...',
                advanced: 'I have a rather important question for you...'
              },
              sprite: 'young-woman-happy',
              spritePosition: 'right',
              emotion: 'thoughtful'
            },
            {
              character: 'Clarisse',
              text: {
                beginner: 'Are you happy?',
                intermediate: 'Are you happy?',
                advanced: 'Are you happy?'
              },
              sprite: 'young-woman-happy',
              spritePosition: 'right',
              emotion: 'thoughtful'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'Of course I am! ...Wait, am I?',
                intermediate: '...Of course I am!',
                advanced: '...Of course I am!'
              },
              sprite: 'firefighter-man',
              spritePosition: 'left',
              emotion: 'neutral',
              thought: true
            },
            {
              character: 'Montag',
              text: {
                beginner: 'I never thought about it before. Maybe I\'m not?',
                intermediate: 'But... am I?',
                advanced: 'But am I truly? Have I ever examined this question?'
              },
              sprite: 'firefighter-man',
              spritePosition: 'left',
              emotion: 'sad',
              thought: true
            }
          ],
          achievement: {
            id: 'big_question',
            title: 'The Big Question',
            description: 'Witnessed the question that changes everything'
          }
        }
      ]
    },
    {
      chapterNumber: 2,
      title: 'Seeds of Doubt',
      emoji: '🤔',
      description: 'A simple question haunts Montag. He begins to question his happiness.',
      color: '#4ECDC4',
      scenes: [
        {
          id: 'ch2_scene1',
          sceneNumber: 1,
          background: 'contemplative man thinking dark room',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'That night, Montag kept thinking...',
                intermediate: 'That night, Montag couldn\'t stop thinking...',
                advanced: 'That evening, Montag found himself consumed by introspection...'
              },
              thought: true
            },
            {
              character: 'Montag',
              text: {
                beginner: 'Am I happy? I never asked myself that before.',
                intermediate: 'Am I happy? I\'ve never even asked myself that before.',
                advanced: 'Am I happy? The question haunts me. I\'ve never interrogated my own contentment.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'sad',
              thought: true
            },
            {
              character: 'Montag',
              text: {
                beginner: 'Clarisse is so different. She really thinks about things.',
                intermediate: 'Clarisse is so different from everyone else. She actually THINKS.',
                advanced: 'Clarisse is anomalous. She engages in genuine intellectual contemplation.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'thoughtful',
              thought: true
            }
          ],
          choice: {
            prompt: {
              beginner: 'Why is Clarisse\'s question important?',
              intermediate: 'Why is Clarisse\'s question so powerful?',
              advanced: 'What makes Clarisse\'s inquiry so profoundly significant?'
            },
            options: [
              { 
                text: 'It makes him think about his life', 
                feedback: {
                  beginner: 'Yes! He never thought about if he\'s really happy before.',
                  intermediate: 'Yes! He\'s never questioned his happiness before.',
                  advanced: 'Correct! It initiates his first genuine self-examination and existential inquiry.'
                },
                points: 10 
              },
              { 
                text: 'It makes him angry at her', 
                feedback: {
                  beginner: 'No, he\'s not angry. He\'s confused and thinking.',
                  intermediate: 'Not quite - he\'s more confused and thoughtful than angry.',
                  advanced: 'Incorrect. His response is contemplative rather than antagonistic.'
                },
                points: 0 
              },
              { 
                text: 'It doesn\'t affect him', 
                feedback: {
                  beginner: 'No! This question changes his whole life!',
                  intermediate: 'Actually, this question changes his entire life!',
                  advanced: 'Quite the opposite. This catalyzes his entire transformation.'
                },
                points: 0 
              }
            ]
          }
        },
        {
          id: 'ch2_scene2',
          sceneNumber: 2,
          background: 'lonely man silhouette dark',
          dialogue: [
            {
              character: 'Montag',
              text: {
                beginner: 'She walked away slowly. I just stood there...',
                intermediate: 'She walked away slowly, and I just stood there...',
                advanced: 'She departed slowly, and I remained stationary...'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'sad'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'Feeling empty inside.',
                intermediate: 'Feeling suddenly empty.',
                advanced: 'Experiencing a profound and sudden emptiness.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'sad',
              thought: true
            }
          ],
          achievement: {
            id: 'awakening',
            title: 'The Awakening',
            description: 'Montag begins to question his world'
          }
        }
      ]
    },
    {
      chapterNumber: 3,
      title: 'The Teacher',
      emoji: '👨‍🏫',
      description: 'Montag seeks wisdom from Professor Faber about books and knowledge.',
      color: '#95A3B3',
      scenes: [
        {
          id: 'ch3_scene1',
          sceneNumber: 1,
          background: 'elderly man books study room',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'Montag finds an old teacher named Faber...',
                intermediate: 'Montag seeks out Professor Faber, a former teacher...',
                advanced: 'Montag approaches Professor Faber, a former academic...'
              },
              thought: true
            },
            {
              character: 'Faber',
              text: {
                beginner: 'I\'ve been scared for a long time. Scared of doing what\'s right.',
                intermediate: 'I\'ve been afraid for so long. Afraid of my own conscience.',
                advanced: 'I\'ve been paralyzed by fear for so long. Afraid of my own moral compass.'
              },
              sprite: 'old-man-scared',
              spritePosition: 'right',
              emotion: 'sad'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'I need to understand. Why do books matter?',
                intermediate: 'I need to understand. Why are books so important?',
                advanced: 'I require comprehension. What makes literature essential?'
              },
              sprite: 'firefighter-man',
              spritePosition: 'left',
              emotion: 'thoughtful'
            },
            {
              character: 'Faber',
              text: {
                beginner: 'Books aren\'t special by themselves. It\'s the ideas inside them that matter.',
                intermediate: 'It\'s not books you need, it\'s some of the things that once were in books.',
                advanced: 'It\'s not books you need, it\'s the knowledge, truth, and quality of thought that once resided within books.'
              },
              sprite: 'old-man-scared',
              spritePosition: 'right',
              emotion: 'thoughtful'
            }
          ],
          choice: {
            prompt: {
              beginner: 'What does Faber mean about books?',
              intermediate: 'What do you think Faber means?',
              advanced: 'What is Faber\'s essential argument about literature?'
            },
            options: [
              { 
                text: 'Books contain important ideas and truth', 
                feedback: {
                  beginner: 'Yes! Books have ideas, knowledge, and truth inside them.',
                  intermediate: 'Exactly! Books are vessels for important ideas.',
                  advanced: 'Precisely! Literature serves as a repository for truth, critical thought, and quality information.'
                },
                points: 10 
              },
              { 
                text: 'Books are made of nice paper', 
                feedback: {
                  beginner: 'No - it\'s not about the paper. It\'s about what\'s written inside!',
                  intermediate: 'Not quite - it\'s what\'s written inside that matters!',
                  advanced: 'Superficial. The physical medium is irrelevant; the content is paramount.'
                },
                points: 0 
              },
              { 
                text: 'Books are just decorations', 
                feedback: {
                  beginner: 'No! Books have wisdom and truth that people need.',
                  intermediate: 'No - books contain wisdom and truth that society needs.',
                  advanced: 'Incorrect. Books are vessels of knowledge essential for an enlightened society.'
                },
                points: 0 
              }
            ]
          },
          achievement: {
            id: 'seek_wisdom',
            title: 'Seeking Wisdom',
            description: 'Found a mentor who values knowledge'
          }
        }
      ]
    },
    {
      chapterNumber: 4,
      title: 'Burning Bright',
      emoji: '💥',
      description: 'Montag makes his choice. He destroys his old life and escapes.',
      color: '#FFD93D',
      scenes: [
        {
          id: 'ch4_scene1',
          sceneNumber: 1,
          background: 'house fire destruction night flames',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'Everything changed. Montag has to make a big choice...',
                intermediate: 'Everything has changed. Montag must make a choice...',
                advanced: 'The moment of decision has arrived. Montag must act...'
              },
              thought: true
            },
            {
              character: 'Montag',
              text: {
                beginner: 'I burned my house because I wanted everything to change.',
                intermediate: 'I burnt the bedroom walls because I wanted to change everything.',
                advanced: 'I incinerated the walls, the possessions, everything - because transformation required destruction.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'angry'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'My old life is gone. I\'m different now.',
                intermediate: 'My old life is gone. I\'m not that man anymore.',
                advanced: 'My former existence has been obliterated. I am fundamentally transformed.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'neutral',
              thought: true
            }
          ],
          choice: {
            prompt: {
              beginner: 'What does fire mean to Montag now?',
              intermediate: 'What does fire symbolize now for Montag?',
              advanced: 'What symbolic transformation has fire undergone for Montag?'
            },
            options: [
              { 
                text: 'Freedom and new beginning', 
                feedback: {
                  beginner: 'Yes! Fire now means freedom and becoming a new person.',
                  intermediate: 'Yes! Fire now represents his liberation from his old life.',
                  advanced: 'Correct! Fire has metamorphosed from an instrument of oppression to a tool of personal liberation.'
                },
                points: 10 
              },
              { 
                text: 'Just destruction', 
                feedback: {
                  beginner: 'It\'s more than that - it also means freedom and change!',
                  intermediate: 'It\'s more than that - it\'s also freeing him to become someone new.',
                  advanced: 'Reductive. The symbolism encompasses both destruction and rebirth.'
                },
                points: 5 
              },
              { 
                text: 'Power over others', 
                feedback: {
                  beginner: 'No, he changed. Now it\'s about becoming a new, better person.',
                  intermediate: 'No, he\'s moved beyond that. Now it\'s about personal transformation.',
                  advanced: 'Incorrect. His relationship with fire has evolved beyond dominance to self-actualization.'
                },
                points: 0 
              }
            ]
          }
        },
        {
          id: 'ch4_scene2',
          sceneNumber: 2,
          background: 'man river water night escape',
          dialogue: [
            {
              character: 'Montag',
              text: {
                beginner: 'The cold water washed away the old me.',
                intermediate: 'The cold water shocked my system, washing away the old Guy Montag.',
                advanced: 'The frigid water shocked my system, a baptismal cleansing that washed away the vestiges of my former self.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'neutral'
            },
            {
              character: 'Narrator',
              text: {
                beginner: 'Montag became a new person...',
                intermediate: 'Like a baptism, Montag is reborn...',
                advanced: 'A symbolic baptism, heralding his metamorphosis...'
              },
              thought: true
            }
          ],
          achievement: {
            id: 'rebirth',
            title: 'Phoenix Rising',
            description: 'Witnessed Montag\'s transformation and rebirth'
          }
        }
      ]
    },
    {
      chapterNumber: 5,
      title: 'Hope in the Ashes',
      emoji: '🌅',
      description: 'Montag finds the book people and discovers hope for a new world.',
      color: '#6BCF7F',
      scenes: [
        {
          id: 'ch5_scene1',
          sceneNumber: 1,
          background: 'campfire forest night group people',
          dialogue: [
            {
              character: 'Granger',
              text: {
                beginner: 'Welcome, friend. We burn books too.',
                intermediate: 'Welcome, friend. We\'re book burners too.',
                advanced: 'Welcome, friend. We too are biblioclasts.'
              },
              sprite: 'wise-man',
              spritePosition: 'right',
              emotion: 'neutral'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'What? I thought you loved books?',
                intermediate: 'What? But I thought...',
                advanced: 'What? But I presumed...'
              },
              sprite: 'firefighter-man',
              spritePosition: 'left',
              emotion: 'neutral'
            },
            {
              character: 'Granger',
              text: {
                beginner: 'We read books, then burn them so we don\'t get caught. But we remember every word.',
                intermediate: 'We read the books and burn them, afraid they\'d be found. But we remembered them.',
                advanced: 'We consume the texts and destroy the evidence, fearing discovery. But we have committed them to memory.'
              },
              sprite: 'wise-man',
              spritePosition: 'right',
              emotion: 'happy'
            },
            {
              character: 'Granger',
              text: {
                beginner: 'Each person IS a book. We are a walking library.',
                intermediate: 'Each of us IS a book. We are the library.',
                advanced: 'Each individual embodies a literary work. We are the living archive of human knowledge.'
              },
              sprite: 'wise-man',
              spritePosition: 'right',
              emotion: 'thoughtful'
            }
          ],
          choice: {
            prompt: {
              beginner: 'Why do they memorize books?',
              intermediate: 'Why is memorizing books important?',
              advanced: 'What is the significance of this oral preservation of literature?'
            },
            options: [
              { 
                text: 'It keeps knowledge safe when books are destroyed', 
                feedback: {
                  beginner: 'Perfect! Memory keeps knowledge alive even without books.',
                  intermediate: 'Perfect! Memory keeps knowledge alive.',
                  advanced: 'Precisely! Oral tradition preserves human knowledge despite systematic destruction of physical texts.'
                },
                points: 10 
              },
              { 
                text: 'It\'s a fun game', 
                feedback: {
                  beginner: 'No, it\'s serious! They\'re saving human knowledge.',
                  intermediate: 'No, it\'s much more serious - it\'s saving human knowledge!',
                  advanced: 'Trivializing. This represents the preservation of civilization itself.'
                },
                points: 0 
              },
              { 
                text: 'It\'s easier than reading', 
                feedback: {
                  beginner: 'No, they do this to save books from being destroyed forever.',
                  intermediate: 'Not quite - they do this to preserve books from destruction.',
                  advanced: 'Incorrect. This is a desperate measure to safeguard literature from obliteration.'
                },
                points: 0 
              }
            ]
          }
        },
        {
          id: 'ch5_scene2',
          sceneNumber: 2,
          background: 'city explosion fire phoenix rising',
          dialogue: [
            {
              character: 'Narrator',
              text: {
                beginner: 'The city exploded and burned...',
                intermediate: 'The city exploded into flames...',
                advanced: 'The city was consumed by apocalyptic conflagration...'
              },
              thought: true
            },
            {
              character: 'Granger',
              text: {
                beginner: 'Like the phoenix bird, we\'ll come back from these ashes and make something better.',
                intermediate: 'Like the phoenix, we\'ll rise from these ashes and build something better.',
                advanced: 'Like the mythical phoenix, we shall rise from these ashes and construct a more enlightened civilization.'
              },
              sprite: 'wise-man',
              spritePosition: 'center',
              emotion: 'happy'
            },
            {
              character: 'Montag',
              text: {
                beginner: 'A new world. Where people can read, think, and be free.',
                intermediate: 'A new world. A world where people can read, think, and be free.',
                advanced: 'A new civilization. One where intellectual freedom, literacy, and autonomous thought flourish.'
              },
              sprite: 'firefighter-man',
              spritePosition: 'center',
              emotion: 'happy',
              thought: true
            }
          ],
          achievement: {
            id: 'complete_journey',
            title: 'Journey Complete',
            description: 'Completed Fahrenheit 451 and witnessed hope for the future'
          }
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
