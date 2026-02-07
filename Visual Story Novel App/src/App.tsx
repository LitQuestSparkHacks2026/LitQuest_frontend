import { useState } from 'react';
import { GameReader } from './components/GameReader';
import { GameMenu } from './components/GameMenu';
import { ReadingLevelSelector } from './components/ReadingLevelSelector';
import { Library } from './components/Library';
import { ChapterSelect } from './components/ChapterSelect';

export type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';

type AppView = 'library' | 'chapterSelect' | 'game';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('library');
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('intermediate');
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [sceneKey, setSceneKey] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  const handleSelectBook = (bookId: string) => {
    setCurrentBook(bookId);
    setShowLevelSelector(true);
  };

  const handleLevelSelected = (level: ReadingLevel) => {
    setReadingLevel(level);
  };

  const handleLevelConfirmed = () => {
    setShowLevelSelector(false);
    setCurrentView('chapterSelect');
  };

  const handleSelectChapter = (index: number) => {
    setCurrentChapter(index);
    setCurrentView('game');
  };

  const handleRestartChapter = () => {
    setSceneKey(sceneKey + 1);
    setShowGameMenu(false);
  };

  const handleChangeLevel = () => {
    setShowGameMenu(false);
    setShowLevelSelector(true);
  };

  const handleNextChapter = () => {
    const nextChapter = Math.min(currentChapter + 1, 4);
    setCurrentChapter(nextChapter);
    // Update progress if we've completed this chapter
    if (nextChapter > chapterProgress) {
      setChapterProgress(nextChapter);
    }
  };

  const handleChapterSelect = () => {
    setShowGameMenu(false);
    setCurrentView('chapterSelect');
  };

  const handleReturnToLibrary = () => {
    setShowGameMenu(false);
    setCurrentView('library');
    setCurrentBook(null);
    setCurrentChapter(0);
  };

  const CHAPTER_TO_SCENE_ID: Record<number, string> = {
    0: "01-sidewalk-complete",
    1: "04-OldWomanHouse-complete",
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Library View */}
      {currentView === 'library' && (
        <Library onSelectBook={handleSelectBook} />
      )}

      {/* Chapter Select View */}
      {currentView === 'chapterSelect' && (
        <ChapterSelect
          onSelectChapter={handleSelectChapter}
          onBack={handleReturnToLibrary}
          currentProgress={chapterProgress}
        />
      )}

      {/* Game View */}
      {currentView === 'game' && !showLevelSelector && !showGameMenu && (
        <GameReader
          key={sceneKey}
          currentChapter={currentChapter}
          onNextChapter={handleNextChapter}
          onPrevChapter={() => setCurrentChapter(Math.max(currentChapter - 1, 0))}
          readingLevel={readingLevel}
          onOpenMenu={() => setShowGameMenu(true)}
        />
      )}

      {/* Reading Level Selector Modal */}
      {showLevelSelector && (
        <ReadingLevelSelector
          currentLevel={readingLevel}
          onSelectLevel={handleLevelSelected}
          onClose={() => {
            setShowLevelSelector(false);
            if (currentView === 'library') {
              // If closing from library without selecting, stay at library
              setCurrentBook(null);
            }
          }}
          onConfirm={handleLevelConfirmed}
        />
      )}

      {/* Game Menu */}
      {showGameMenu && currentView === 'game' && (
        <GameMenu
          onClose={() => setShowGameMenu(false)}
          onChangeLevel={handleChangeLevel}
          onChapterSelect={handleChapterSelect}
          onLibrary={handleReturnToLibrary}
          currentLevel={readingLevel}
          totalPoints={totalPoints}
          achievements={achievements.length}
          currentChapter={currentChapter}
          onRestartChapter={handleRestartChapter}
        />
      )}
    </div>
  );
}