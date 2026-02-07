import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Award, Volume2, VolumeX, Menu as MenuIcon, BookMarked } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReadingLevel } from '../App';
import { InteractiveChoice } from './InteractiveChoice';
import { AchievementNotification } from './AchievementNotification';
import { VocabularyTooltip } from './VocabularyTooltip';
import { fahrenheit451 } from '../data/bookData';

interface GameReaderProps {
  currentChapter: number;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  readingLevel: ReadingLevel;
  onOpenMenu: () => void;
}

// Create vocabulary bank from data
const vocabularyBank: { [key: string]: { definition: string; simplified: string } } = {};
fahrenheit451.vocabulary.forEach(entry => {
  vocabularyBank[entry.word] = {
    definition: entry.definition,
    simplified: entry.simplified
  };
});

export function GameReader({ currentChapter, onNextChapter, onPrevChapter, readingLevel, onOpenMenu }: GameReaderProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const [choiceSelected, setChoiceSelected] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<{ title: string; description: string } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showVocabBank, setShowVocabBank] = useState(false);

  const chapter = fahrenheit451.chapters[currentChapter];
  const scene = chapter.scenes[currentScene];
  const currentLine = scene.dialogue[currentDialogue];
  const isLastDialogue = currentDialogue === scene.dialogue.length - 1;
  const isLastScene = currentScene === chapter.scenes.length - 1;

  // Get text for current reading level
  const getCurrentText = () => {
    return currentLine?.text[readingLevel] || '';
  };

  // Process text to highlight vocabulary words for beginner level
  const processTextWithVocab = (text: string) => {
    if (readingLevel !== 'beginner') return text;

    let processedText = text;
    const wordsFound: Array<{ word: string; index: number }> = [];

    Object.keys(vocabularyBank).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        wordsFound.push({ word: match[0], index: match.index });
      }
    });

    // Sort by index in reverse to replace from end to beginning
    wordsFound.sort((a, b) => b.index - a.index);

    wordsFound.forEach(({ word, index }) => {
      const lowerWord = word.toLowerCase();
      if (vocabularyBank[lowerWord]) {
        const replacement = vocabularyBank[lowerWord].simplified;
        processedText = 
          processedText.substring(0, index) +
          `<span class="vocab-word" title="${vocabularyBank[lowerWord].definition}">${replacement}</span>` +
          processedText.substring(index + word.length);
      }
    });

    return processedText;
  };

  useEffect(() => {
    // Check for achievements
    if (scene.achievement && !achievements.includes(scene.achievement.id) && currentDialogue === 0) {
      setAchievements([...achievements, scene.achievement.id]);
      setNewAchievement({ title: scene.achievement.title, description: scene.achievement.description });
      setTimeout(() => setNewAchievement(null), 4000);
    }
  }, [scene, currentDialogue]);

  const handleAdvance = () => {
    if (choiceSelected && scene.choice) {
      handleNextScene();
      return;
    }

    if (showChoice) {
      return;
    }

    if (!isLastDialogue) {
      setCurrentDialogue(currentDialogue + 1);
    } else if (scene.choice && !showChoice) {
      setShowChoice(true);
    } else {
      handleNextScene();
    }
  };

  const handleNextScene = () => {
    if (!isLastScene) {
      setCurrentScene(currentScene + 1);
      setCurrentDialogue(0);
      setShowChoice(false);
      setChoiceSelected(false);
      setSelectedChoiceIndex(null);
    } else {
      onNextChapter();
      setCurrentScene(0);
      setCurrentDialogue(0);
      setShowChoice(false);
      setChoiceSelected(false);
      setSelectedChoiceIndex(null);
    }
  };

  const handleChoice = (index: number, points: number) => {
    setSelectedChoiceIndex(index);
    setChoiceSelected(true);
    setTotalPoints(totalPoints + points);
  };

  const getSpriteImage = (sprite?: string) => {
    if (!sprite) return null;
    
    const spriteMap: { [key: string]: string } = {
      'firefighter-man': 'firefighter portrait man',
      'young-woman-happy': 'young woman smiling portrait',
      'old-man-scared': 'elderly man worried portrait',
      'wise-man': 'wise elderly man portrait'
    };

    return spriteMap[sprite] || sprite;
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1?q=80&w=1920`}
          alt={scene.background}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <button
          onClick={onOpenMenu}
          className="p-3 bg-white rounded-2xl hover:bg-gray-100 transition-all text-gray-900 border-3 border-gray-900 shadow-lg"
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border-3 border-gray-900 shadow-lg">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-900 font-bold text-lg">{totalPoints}</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-gray-900 font-bold text-lg">{achievements.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {readingLevel === 'beginner' && (
            <button
              onClick={() => setShowVocabBank(!showVocabBank)}
              className="p-3 bg-white rounded-2xl hover:bg-gray-100 transition-all text-gray-900 border-3 border-gray-900 shadow-lg"
              title="Word Helper"
            >
              <BookMarked className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 bg-white rounded-2xl hover:bg-gray-100 transition-all text-gray-900 border-3 border-gray-900 shadow-lg"
          >
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white px-8 py-3 rounded-2xl border-3 border-gray-900 shadow-lg">
          <h2 className="text-gray-900 font-bold text-xl">{chapter.title}</h2>
        </div>
      </div>

      {/* Vocabulary Bank Modal */}
      {showVocabBank && readingLevel === 'beginner' && (
        <div className="absolute top-32 right-6 z-50 bg-black/90 backdrop-blur-md rounded-xl p-6 border-2 border-purple-500/50 max-w-sm shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">📚 Vocabulary Helper</h3>
            <button
              onClick={() => setShowVocabBank(false)}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Object.entries(vocabularyBank).map(([word, { definition, simplified }]) => (
              <div key={word} className="bg-white/10 rounded-lg p-3 border border-purple-500/30">
                <div className="font-semibold text-orange-400 mb-1">{word}</div>
                <div className="text-sm text-yellow-300 mb-1">= {simplified}</div>
                <div className="text-xs text-gray-300">{definition}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Character Sprites */}
      {currentLine?.sprite && (
        <div className={`absolute bottom-32 z-10 transition-all duration-500 ${
          currentLine.spritePosition === 'left' ? 'left-20' :
          currentLine.spritePosition === 'right' ? 'right-20' :
          'left-1/2 transform -translate-x-1/2'
        }`}>
          <div className="relative">
            <div className="w-64 h-80 bg-gradient-to-b from-transparent to-black/50 rounded-t-full" />
            {/* Character name tag */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 px-4 py-1 rounded-full">
              <span className="text-white font-semibold text-sm">{currentLine.character}</span>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue Box */}
      {!showChoice && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
          <div className="max-w-4xl mx-auto">
            <div className={`backdrop-blur-md rounded-2xl p-6 border-2 ${
              currentLine?.thought 
                ? 'bg-purple-900/90 border-purple-500/50' 
                : 'bg-black/90 border-orange-500/50'
            }`}>
              {currentLine?.character && !currentLine.thought && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-4 py-1 bg-orange-500 rounded-full">
                    <span className="text-white font-bold">{currentLine.character}</span>
                  </div>
                  {currentLine.emotion && (
                    <span className="text-xs text-gray-400 italic">*{currentLine.emotion}*</span>
                  )}
                </div>
              )}

              {currentLine?.thought && (
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-sm italic">Thought</span>
                </div>
              )}

              <p className="text-white text-xl leading-relaxed mb-4 reading-text">
                {getCurrentText()}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {currentDialogue + 1} / {scene.dialogue.length}
                </div>
                
                <button
                  onClick={handleAdvance}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all transform hover:scale-105"
                >
                  <span className="font-semibold">
                    {isLastDialogue && scene.choice ? 'Make a Choice' : isLastDialogue ? 'Continue' : 'Next'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Choice */}
      {showChoice && scene.choice && (
        <InteractiveChoice
          choice={{
            prompt: scene.choice.prompt[readingLevel],
            options: scene.choice.options.map(opt => ({
              text: opt.text,
              feedback: opt.feedback[readingLevel],
              points: opt.points
            }))
          }}
          onSelect={handleChoice}
          selectedIndex={selectedChoiceIndex}
          choiceSelected={choiceSelected}
          onContinue={handleAdvance}
        />
      )}

      {/* Achievement Notification */}
      {newAchievement && (
        <AchievementNotification
          title={newAchievement.title}
          description={newAchievement.description}
        />
      )}

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
          <div className="text-white text-sm">
            Scene {currentScene + 1} / {chapter.scenes.length}
          </div>
        </div>
      </div>

      {/* Reading Level Indicator */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
          <div className="text-white text-sm">
            {readingLevel === 'beginner' ? '📚 Middle School' : readingLevel === 'intermediate' ? '📖 High School' : '🎓 Adult'}
          </div>
        </div>
      </div>
    </div>
  );
}