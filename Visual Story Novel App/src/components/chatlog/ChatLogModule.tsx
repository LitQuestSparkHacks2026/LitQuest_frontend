// ============================================
// CHAT LOG MODULE - All Components in One File
// ============================================

import React, { useState } from 'react';
import { X, MessageSquare, User, Sparkles, CornerUpLeft } from 'lucide-react';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface DialogueEntry {
  character?: string;
  text: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  emotion?: string;
  thought?: boolean;
  sceneNumber: number;
  dialogueNumber: number;
  timestamp: Date;
}

export type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';

// ============================================
// CHAT LOG BUTTON COMPONENT
// ============================================

interface ChatLogButtonProps {
  onClick: () => void;
  hasHistory: boolean;
}

// 
export function ChatLogButton({ onClick, hasHistory }: ChatLogButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!hasHistory}
      className={`relative group flex items-center gap-2 px-4 py-3 rounded-xl transition-all border-2 shadow-lg ${
        hasHistory 
          ? 'bg-gray-700 hover:bg-gray-600 border-gray-900 text-white cursor-pointer transform hover:scale-105 active:scale-95' 
          : 'bg-gray-800 border-gray-800 text-gray-500 cursor-not-allowed opacity-60'
      }`}
      title={hasHistory ? "View dialogue history" : "No history yet"}
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5" />
        {/* Count badge is removed */}
      </div>
      
      <span className="font-semibold text-sm hidden sm:inline">
        History
      </span>
    </button>
  );
}

// ============================================
// CHAT LOG MODAL COMPONENT
// ============================================

interface ChatLogProps {
  dialogueHistory: DialogueEntry[];
  readingLevel: ReadingLevel;
  currentSceneIndex: number;
  currentDialogueIndex: number;
  onClose: () => void;
  onJumpToDialogue: (sceneIndex: number, dialogueIndex: number) => void;
}

export function ChatLog({ 
  dialogueHistory, 
  readingLevel, 
  currentSceneIndex, 
  currentDialogueIndex,
  onClose,
  onJumpToDialogue 
}: ChatLogProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] border-4 border-gray-900 flex flex-col overflow-hidden">
        {/* Header */}
        
        <div className="flex items-center justify-between p-6 border-b-5 border-gray-900">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <div className="p-2 bg-orange-500 rounded-xl border-3 border-gray-900">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dialogue History</h2>
              <p className="text-sm text-gray-600">{dialogueHistory.length} entries</p>
            </div>
          </div>
          {/* <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button> */}
        </div>

        {/* Dialogue List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {dialogueHistory.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No dialogue history yet</p>
              <p className="text-gray-400 text-sm">Start reading to see your dialogue log!</p>
            </div>
          ) : (
            dialogueHistory.map((entry, index) => {
              const isCurrent = 
                entry.sceneNumber === currentSceneIndex && 
                entry.dialogueNumber === currentDialogueIndex;

              return (
                <button
                  key={index}
                  onClick={() => onJumpToDialogue(entry.sceneNumber, entry.dialogueNumber)}
                  className={`w-full text-left p-4 rounded-2xl border-3 transition-all hover:scale-[1.02] ${
                    isCurrent
                      ? 'bg-orange-100 border-orange-500 shadow-lg'
                      : entry.thought
                      ? 'bg-purple-50 border-purple-300 hover:border-purple-500'
                      : 'bg-gray-50 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {/* Entry Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {entry.thought ? (
                        <>
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-semibold text-purple-700 italic">
                            Thought
                          </span>
                        </>
                      ) : entry.character ? (
                        <>
                          <User className="w-4 h-4 text-gray-700" />
                          <span className="text-sm font-bold text-gray-900">
                            {entry.character}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Narrator</span>
                      )}
                      {entry.emotion && (
                        <span className="text-xs text-gray-500 italic ml-2">
                          *{entry.emotion}*
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full border-2 border-gray-900">
                          CURRENT
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        Scene {entry.sceneNumber + 1}
                      </span>
                    </div>
                  </div>

                  {/* Dialogue Text */}
                  <p className="text-gray-700 leading-relaxed reading-text">
                    {entry.text[readingLevel]}
                  </p>

                  {/* Timestamp */}
                  <div className="mt-2 text-xs text-gray-400">
                    {entry.timestamp.toLocaleTimeString()}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-gray-900 bg-amber-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-xl">💡</span>
            <p>
              <strong>Tip:</strong> Click any dialogue entry to jump back to that moment!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// UTILITY HOOKS & FUNCTIONS
// ============================================

/**
 * Hook to manage dialogue history state
 * Use this in your GameReader component
 */
export function useDialogueHistory() {
  const [dialogueHistory, setDialogueHistory] = useState<DialogueEntry[]>([]);
  
  const addToHistory = (entry: DialogueEntry) => {
    // Check if entry already exists to avoid duplicates
    const exists = dialogueHistory.some(
      e => e.sceneNumber === entry.sceneNumber && e.dialogueNumber === entry.dialogueNumber
    );
    
    if (!exists) {
      setDialogueHistory([...dialogueHistory, entry]);
    }
  };
  
  const clearHistory = () => {
    setDialogueHistory([]);
  };
  
  return { dialogueHistory, addToHistory, clearHistory };
}

/**
 * Helper function to create a DialogueEntry from your current dialogue data
 */
export function createDialogueEntry(
  currentLine: any,
  sceneNumber: number,
  dialogueNumber: number
): DialogueEntry {
  return {
    character: currentLine.character,
    text: currentLine.text,
    emotion: currentLine.emotion,
    thought: currentLine.thought,
    sceneNumber,
    dialogueNumber,
    timestamp: new Date()
  };
}