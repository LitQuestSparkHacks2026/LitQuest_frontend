import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Award, Menu as MenuIcon, BookMarked, History } from 'lucide-react'; // Added History & ChevronLeft
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReadingLevel } from '../App';
import { InteractiveChoice } from './InteractiveChoice';
import { AchievementNotification } from './AchievementNotification';
import { ChatLog, ChatLogButton, DialogueEntry } from './chatlog/ChatLogModule'; // Added Imports
import { fahrenheit451 } from '../data/bookData';
import { fetchScene } from '../api';

interface GameReaderProps {
  currentChapter: number;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  readingLevel: ReadingLevel;
  onOpenMenu: () => void;
}

const CHAPTER_TO_SCENE_ID: Record<number, string> = {
  0: '01-sidewalk-complete',
  1: '03-firehouse-complete',
  2: "04-OldWomanHouse-complete",
};

// Create vocabulary bank from local data
const vocabularyBank: { [key: string]: { definition: string; simplified: string } } = {};
fahrenheit451.vocabulary.forEach((entry) => {
  vocabularyBank[String(entry.word).toLowerCase()] = {
    definition: entry.definition,
    simplified: entry.simplified,
  };
});

export function GameReader({
  currentChapter,
  onNextChapter,
  onPrevChapter,
  readingLevel,
  onOpenMenu,
}: GameReaderProps) {
  // Backend scene doc
  const [sceneDoc, setSceneDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Cursor into sceneDoc.content[]
  const [contentIndex, setContentIndex] = useState(0);

  // Choice state
  const [showChoice, setShowChoice] = useState(false);
  const [choiceSelected, setChoiceSelected] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);

  // HUD state
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<{ title: string; description: string } | null>(null);

  // Beginner helpers
  const [showVocabBank, setShowVocabBank] = useState(false);

  // --- NEW: History & Chat Log State ---
  const [dialogueHistory, setDialogueHistory] = useState<DialogueEntry[]>([]);
  const [showChatLog, setShowChatLog] = useState(false);

  // Load the scene for the current chapter
  useEffect(() => {
    const sceneId = CHAPTER_TO_SCENE_ID[currentChapter];

    setLoading(true);
    setLoadError(null);
    setSceneDoc(null);
    setContentIndex(0);
    setShowChoice(false);
    setChoiceSelected(false);
    setSelectedChoiceIndex(null);
    // Clear history when changing chapters (optional, remove if you want persistent history)
    setDialogueHistory([]); 

    fetchScene(sceneId)
      .then((doc) => {
        setSceneDoc(doc);
      })
      .catch((err) => {
        setLoadError(err?.message ?? 'Failed to load scene');
      })
      .finally(() => setLoading(false));
  }, [currentChapter]);

  const item = sceneDoc?.content?.[contentIndex] ?? null;
  const isLastItem = sceneDoc ? contentIndex >= sceneDoc.content.length - 1 : false;

  // --- NEW: Record History Effect ---
  // Runs every time 'item' changes to save it to the log
  useEffect(() => {
    if (!sceneDoc || !item) return;
    if (item.type === 'choice_point') return; // Don't log choice points

    // Normalize text so ChatLog doesn't crash if API returns a string
    const normalizedText = typeof item.text === 'string' 
      ? { beginner: item.text, intermediate: item.text, advanced: item.text }
      : item.text;

    const entry: DialogueEntry = {
      character: item.speaker || 'Narrator',
      text: normalizedText,
      sceneNumber: currentChapter,
      dialogueNumber: contentIndex,
      timestamp: new Date(),
      thought: item.type === 'thought' // Assuming you might have thought types
    };
      
    setDialogueHistory(prev => {
      // Prevent duplicates
      const exists = prev.some(e => 
        e.sceneNumber === currentChapter && e.dialogueNumber === contentIndex
      );
      return exists ? prev : [...prev, entry];
    });
  }, [contentIndex, sceneDoc, currentChapter, item]);

  // If the current item is a choice_point, find its choice object
  const activeChoice = useMemo(() => {
    if (!sceneDoc || !item || item.type !== 'choice_point') return null;
    return sceneDoc.choices?.find((c: any) => c.id === item.ref_id) ?? null;
  }, [sceneDoc, item]);

  const chapterTitle = sceneDoc?.title ?? `Chapter ${currentChapter + 1}`;

  const backgroundSrc =
    sceneDoc?.background ||
    fahrenheit451?.chapters?.[currentChapter]?.scenes?.[0]?.background ||
    'https://images.unsplash.com/photo-1520975958225-3f61f3d5b6f3?auto=format&fit=crop&w=2000&q=80';

  const getText = () => {
    if (!item) return '';
    const t = item.text;
    if (typeof t === 'string') return t;
    return t?.[readingLevel] ?? '';
  };

  const renderText = (text: string) => {
    return text;
  };

  // --- NEW: Handlers for Back & Jump ---
  const handleGoBack = () => {
    if (contentIndex > 0) {
      setContentIndex(contentIndex - 1);
    }
  };

  const handleJumpToDialogue = (chapterIndex: number, index: number) => {
    // Only jump if it's in the current chapter
    if (chapterIndex === currentChapter) {
      setContentIndex(index);
      setShowChatLog(false);
      setShowChoice(false);
    }
  };

  // Achievement check
  useEffect(() => {
    if (sceneDoc && isLastItem && !achievements.includes(sceneDoc.scene_id)) {
      const id = sceneDoc.scene_id;
      setAchievements((prev) => [...prev, id]);
      setNewAchievement({
        title: 'Scene Complete!',
        description: `Finished: ${sceneDoc.title ?? id}`,
      });
      setTimeout(() => setNewAchievement(null), 2500);
    }
  }, [sceneDoc, isLastItem]);

  const handleAdvance = () => {
    if (!sceneDoc || !item) return;

    if (contentIndex + 1 < sceneDoc.content.length) {
      const nextIndex = contentIndex + 1;
      setContentIndex(nextIndex);

      if (sceneDoc.content[nextIndex].type === 'choice_point') {
        setShowChoice(true);
      }
    } else {
      onNextChapter();
    }
  };

  const handleChoice = (index: number, points: number) => {
    if (!activeChoice || !sceneDoc) return;

    const opt = activeChoice.options[index];

    setSelectedChoiceIndex(index);
    setTotalPoints((p) => p + (points ?? 0));

    setShowChoice(false);
    setChoiceSelected(false);
    setSelectedChoiceIndex(null);

    const jump = Number(opt.next_index);

    if (!Number.isInteger(jump) || jump < 0 || jump >= sceneDoc.content.length) {
      const fallback = Math.min(contentIndex + 1, sceneDoc.content.length - 1);
      setContentIndex(fallback);
      if (sceneDoc.content[fallback]?.type === "choice_point") {
        setShowChoice(true);
      }
      return;
    }

    setContentIndex(jump);
    if (sceneDoc.content[jump]?.type === "choice_point") {
      setShowChoice(true);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-6">Loading scene…</div>;
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-black text-white p-6 space-y-4">
        <div className="text-xl font-bold">Couldn’t load scene</div>
        <div className="text-red-300">{loadError}</div>
        <button onClick={onPrevChapter} className="px-4 py-2 bg-white text-black rounded">Go Back</button>
      </div>
    );
  }

  if (!sceneDoc || !item) {
    return <div className="min-h-screen bg-black text-white p-6">Scene loaded but has no content.</div>;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundSrc}
          alt={chapterTitle}
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
          <div className="p-4" />
        </div>
      </div>

      {/* Chapter Title */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white px-8 py-3 rounded-2xl border-3 border-gray-900 shadow-lg">
          <h2 className="text-gray-900 font-bold text-xl">{chapterTitle}</h2>
        </div>
      </div>

      {/* Vocabulary Bank Modal */}
      {showVocabBank && readingLevel === 'beginner' && (
        <div className="absolute top-32 right-6 z-50 bg-black/90 backdrop-blur-md rounded-xl p-6 border-2 border-purple-500/50 max-w-sm shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">📚 Vocabulary Helper</h3>
            <button onClick={() => setShowVocabBank(false)} className="text-white hover:text-gray-300 text-2xl">✕</button>
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

      Dialogue Box
      {!showChoice && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-md rounded-2xl p-6 border-2 bg-black/90 border-orange-500/50">
              {item.type === 'dialogue' && item.speaker && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-4 py-1 bg-orange-500 rounded-full">
                    <span className="text-white font-bold">{item.speaker}</span>
                  </div>
                </div>
              )}

              <p className="text-white text-xl leading-relaxed mb-4 reading-text">
                {renderText(getText())}
              </p>

             {/* CONTROLS: Back, History, and Next */}
              <div className="flex items-center justify-between relative z-50">
                
                {/* Left Group: Back & History */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGoBack}
                    disabled={contentIndex === 0}
                    // FIXED: Added 'transform hover:scale-105 active:scale-95' for clicky feel
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all border-2 shadow-lg ${
                      contentIndex === 0 
                        ? 'bg-gray-800 border-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 border-gray-900 text-white transform hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-semibold text-sm hidden sm:inline">Back</span>
                  </button>

                  <ChatLogButton 
                    onClick={() => setShowChatLog(true)}
                    hasHistory={dialogueHistory.length > 0}
                    // count={dialogueHistory.length}
                  />

                  <div className="text-sm text-gray-400 ml-2 hidden sm:block">
                    {contentIndex + 1} / {sceneDoc.content.length}
                  </div>
                </div>

                {/* Right Group: Next Button */}
                <button
                  onClick={handleAdvance}
                  // FIXED: Changed rounded-lg to rounded-xl
                  // FIXED: Added border-2 border-orange-900/50 to match the 'tactile' feel of the Back button
                  // FIXED: Added shadow-lg
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all transform hover:scale-105 active:scale-95 border-2 border-orange-600 shadow-lg shadow-orange-500/20"
                >
                  <span className="font-semibold">
                    {isLastItem ? 'Next Chapter' : 'Next'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Choice */}
      {showChoice && activeChoice && (
        <InteractiveChoice
          choice={{
            prompt: activeChoice.choice_prompt?.[readingLevel] ?? 'Choose:',
            options: activeChoice.options.map((opt: any) => ({
              text: typeof opt.text === 'string' ? opt.text : (opt.text?.[readingLevel] ?? ''),
              feedback: '',
              points: opt.points ?? 0,
            })),
          }}
          onSelect={handleChoice}
          selectedIndex={selectedChoiceIndex}
          choiceSelected={choiceSelected}
          onContinue={() => setShowChoice(false)}
        />
      )}

      {/* Achievement Notification */}
      {newAchievement && (
        <AchievementNotification
          title={newAchievement.title}
          description={newAchievement.description}
        />
      )}

      {/* Reading Level Indicator */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
          <div className="text-white text-sm">
            {readingLevel === 'beginner' ? '📚 Middle School' : readingLevel === 'intermediate' ? '📖 High School' : '🎓 Adult'}
          </div>
        </div>
      </div>

      {/* --- NEW: Chat Log Modal --- */}
      {showChatLog && (
        <ChatLog
          dialogueHistory={dialogueHistory}
          readingLevel={readingLevel}
          currentSceneIndex={currentChapter}
          currentDialogueIndex={contentIndex}
          onClose={() => setShowChatLog(false)}
          onJumpToDialogue={handleJumpToDialogue}
        />
      )}
    </div>
  );
}
