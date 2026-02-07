# Chat Log Module Integration Guide

## 📦 Module Contents

This module provides a complete dialogue history tracking system with minimal dependencies. All components are consolidated in one file for easy integration.

**Location:** `/components/chatlog/ChatLogModule.tsx`

---

## 🚀 Quick Integration

### Step 1: Copy the Module

Copy the entire `/components/chatlog/` folder to your repository:

```
your-project/
├── components/
│   └── chatlog/
│       ├── ChatLogModule.tsx          # Main module (all-in-one)
│       ├── INTEGRATION_GUIDE.md       # This file
│       └── DATABASE_GUIDE.md          # MongoDB setup guide
```

### Step 2: Add Required Dependencies

The module only requires these Lucide React icons:
- `X`
- `MessageSquare`
- `User`
- `Sparkles`
- `CornerUpLeft`
- `ChevronLeft` (for the Back button)

These should already be in your project if you're using LitQuest.

---

## 🔧 Integration into GameReader

### Required Changes to Your GameReader Component

#### 1. **Import the Module**

```typescript
import { 
  ChatLog, 
  ChatLogButton, 
  DialogueEntry 
} from './chatlog/ChatLogModule';
import { ChevronLeft } from 'lucide-react'; // for Back button
```

#### 2. **Add State Variables**

Add these two state variables to your GameReader component:

```typescript
const [dialogueHistory, setDialogueHistory] = useState<DialogueEntry[]>([]);
const [showChatLog, setShowChatLog] = useState(false);
```

#### 3. **Track Dialogue History**

Add this useEffect to automatically track dialogue as users read:

```typescript
useEffect(() => {
  if (currentLine) {
    const entry: DialogueEntry = {
      character: currentLine.character,
      text: currentLine.text,
      emotion: currentLine.emotion,
      thought: currentLine.thought,
      sceneNumber: currentScene,
      dialogueNumber: currentDialogue,
      timestamp: new Date()
    };
    
    // Check if this entry already exists (to avoid duplicates)
    const exists = dialogueHistory.some(
      e => e.sceneNumber === currentScene && e.dialogueNumber === currentDialogue
    );
    
    if (!exists) {
      setDialogueHistory([...dialogueHistory, entry]);
    }
  }
}, [currentScene, currentDialogue]);
```

#### 4. **Add Navigation Functions**

Add these two functions for back navigation and jumping:

```typescript
// Check if we're at the first dialogue
const isFirstDialogue = currentDialogue === 0 && currentScene === 0;

// Go back one dialogue
const handleGoBack = () => {
  if (currentDialogue > 0) {
    setCurrentDialogue(currentDialogue - 1);
  } else if (currentScene > 0) {
    // Go to previous scene's last dialogue
    const prevScene = chapter.scenes[currentScene - 1];
    setCurrentScene(currentScene - 1);
    setCurrentDialogue(prevScene.dialogue.length - 1);
  }
};

// Jump to a specific dialogue from history
const handleJumpToDialogue = (sceneIndex: number, dialogueIndex: number) => {
  setCurrentScene(sceneIndex);
  setCurrentDialogue(dialogueIndex);
  setShowChatLog(false);
  setShowChoice(false);
  setChoiceSelected(false);
};
```

#### 5. **Add Buttons to Your Dialogue Box**

Replace or add these buttons in your dialogue box UI:

```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    {/* Previous Button */}
    {!isFirstDialogue && (
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl transition-all border-3 border-gray-900 shadow-lg"
        title="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-semibold text-sm">Back</span>
      </button>
    )}
    
    {/* Chat Log Button */}
    <ChatLogButton 
      onClick={() => setShowChatLog(true)}
      hasHistory={dialogueHistory.length > 0}
    />
    
    {/* Optional: Show dialogue counter */}
    <div className="text-sm text-gray-400 ml-2">
      {currentDialogue + 1} / {scene.dialogue.length}
    </div>
  </div>
  
  {/* Your existing Next/Continue button */}
  <button onClick={handleAdvance} className="...">
    Next
  </button>
</div>
```

#### 6. **Add Chat Log Modal**

Add this at the end of your GameReader return statement (before the closing `</div>`):

```tsx
{/* Chat Log Modal */}
{showChatLog && (
  <ChatLog
    dialogueHistory={dialogueHistory}
    readingLevel={readingLevel}
    currentSceneIndex={currentScene}
    currentDialogueIndex={currentDialogue}
    onClose={() => setShowChatLog(false)}
    onJumpToDialogue={handleJumpToDialogue}
  />
)}
```

---

## 📋 Complete Integration Checklist

- [ ] Copy `/components/chatlog/` folder to your project
- [ ] Import `ChatLog`, `ChatLogButton`, `DialogueEntry` from module
- [ ] Add `dialogueHistory` and `showChatLog` state variables
- [ ] Add `useEffect` to track dialogue history
- [ ] Add `isFirstDialogue` check
- [ ] Add `handleGoBack()` function
- [ ] Add `handleJumpToDialogue()` function
- [ ] Add Previous button to dialogue box
- [ ] Add `ChatLogButton` to dialogue box
- [ ] Add `ChatLog` modal component
- [ ] Test: Verify dialogue tracking works
- [ ] Test: Verify Previous button works
- [ ] Test: Verify chat log opens and closes
- [ ] Test: Verify jumping to past dialogue works

---

## 🎨 Customization

### Colors

The module uses these color schemes that match LitQuest:
- **Primary buttons:** Orange (`bg-orange-500`)
- **Secondary buttons:** Blue (`bg-blue-500`)
- **Back button:** Gray (`bg-gray-700`)
- **Thoughts:** Purple (`bg-purple-50`, `border-purple-300`)
- **Borders:** Bold black borders (`border-3 border-gray-900`)

You can modify these in the `ChatLogModule.tsx` file.

### Icons

The module uses Lucide React icons. You can swap them:
- `MessageSquare` → any chat/message icon
- `CornerUpLeft` → any back arrow icon
- `ChevronLeft` → any left arrow icon
- `User` → any person/character icon
- `Sparkles` → any thought/idea icon

---

## 🔌 Optional: Database Integration

For MongoDB integration (saving/loading dialogue history), see:
- **DATABASE_GUIDE.md** - Complete MongoDB setup instructions

The module is designed to work with or without a database. All data is stored in React state by default.

---

## ⚠️ Troubleshooting

### Issue: "Cannot find module 'lucide-react'"
**Solution:** Install lucide-react: `npm install lucide-react`

### Issue: "Reading level type error"
**Solution:** The module exports its own `ReadingLevel` type. Make sure your existing `ReadingLevel` type matches:
```typescript
type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';
```

### Issue: "Dialogue duplicates in history"
**Solution:** The `useEffect` has duplicate checking built in. Make sure you're not adding entries manually elsewhere.

### Issue: "Back button doesn't appear"
**Solution:** Check that `isFirstDialogue` is properly calculated:
```typescript
const isFirstDialogue = currentDialogue === 0 && currentScene === 0;
```

---

## 📞 Support

If you encounter issues integrating this module:

1. Check that all state variables are added
2. Verify all functions are copied correctly
3. Ensure your dialogue data structure matches the expected format
4. Check the browser console for errors

---

## 🎉 You're Done!

Once integrated, users will be able to:
- ✅ Navigate backwards with the Back button
- ✅ View complete dialogue history
- ✅ Jump back to any previous dialogue moment
- ✅ See timestamps and character information
- ✅ Distinguish between dialogue and thoughts

Happy coding! 🚀
