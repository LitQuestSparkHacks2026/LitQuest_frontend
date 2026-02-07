# Chat Log & Database Integration Guide

## Overview
The Dialogue History (Chat Log) feature tracks all dialogue as users read through the story, allowing them to review past conversations and jump back to specific moments. This document explains how to connect it to MongoDB.

---

## 📋 Features

- **Automatic tracking** - Every dialogue line is automatically added to history
- **Visual history** - Scrollable list of all past dialogue entries
- **Character identification** - Shows who spoke and their emotions
- **Thought distinction** - Differentiates between spoken dialogue and character thoughts
- **Current marker** - Highlights the current dialogue entry
- **Jump navigation** - Click any entry to jump back to that moment
- **Previous button** - Navigate backwards one dialogue at a time
- **Scene aware** - Tracks which scene each dialogue belongs to

---

## 🗃️ Data Structure

### DialogueEntry Interface
```typescript
export interface DialogueEntry {
  character?: string;           // Name of character speaking
  text: {                       // Multi-level text
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  emotion?: string;             // Emotional state (e.g., "angry", "happy")
  thought?: boolean;            // Is this a thought vs spoken dialogue?
  sceneNumber: number;          // Which scene (0-indexed)
  dialogueNumber: number;       // Which line within scene (0-indexed)
  timestamp: Date;              // When user read this
}
```

### Example Entry
```json
{
  "character": "Guy Montag",
  "text": {
    "beginner": "Books are important to understand the world.",
    "intermediate": "Books contain knowledge that helps us understand society.",
    "advanced": "Literature provides critical insight into the human condition and societal structures."
  },
  "emotion": "determined",
  "thought": false,
  "sceneNumber": 2,
  "dialogueNumber": 5,
  "timestamp": "2026-02-07T14:30:00Z"
}
```

---

## 🔌 MongoDB Integration

### Schema Design

#### 1. **Reading Sessions Collection**
Stores individual reading sessions (one per user per book per sitting)

```javascript
const ReadingSessionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    index: true 
  },
  bookId: { 
    type: String,
    required: true,
    index: true 
  },
  chapterNumber: { 
    type: Number,
    required: true 
  },
  readingLevel: { 
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  startedAt: { 
    type: Date,
    default: Date.now 
  },
  lastActiveAt: { 
    type: Date,
    default: Date.now 
  },
  dialogueHistory: [{
    character: String,
    text: {
      beginner: String,
      intermediate: String,
      advanced: String
    },
    emotion: String,
    thought: Boolean,
    sceneNumber: Number,
    dialogueNumber: Number,
    timestamp: Date
  }],
  totalPoints: { 
    type: Number,
    default: 0 
  },
  achievements: [String],
  completed: { 
    type: Boolean,
    default: false 
  }
});

ReadingSessionSchema.index({ userId: 1, bookId: 1, startedAt: -1 });
```

#### 2. **User Progress Collection** (Optional - for analytics)
Aggregate view of user's overall progress

```javascript
const UserProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    unique: true 
  },
  bookProgress: [{
    bookId: String,
    currentChapter: Number,
    readingLevel: String,
    totalSessions: Number,
    totalDialogueRead: Number,
    lastReadAt: Date,
    completedChapters: [Number]
  }],
  totalPoints: Number,
  allAchievements: [String],
  totalReadingTime: Number // in minutes
});
```

---

## 💻 Implementation Steps

### Step 1: Create API Endpoints

Create `/api/reading-sessions.ts` endpoint:

```typescript
import { connectToDatabase } from '@/lib/mongodb';

// POST - Create or update reading session
export async function POST(request: Request) {
  const { userId, bookId, chapterNumber, readingLevel, dialogueHistory } = await request.json();
  
  const { db } = await connectToDatabase();
  
  // Find active session or create new one
  const session = await db.collection('reading_sessions').findOneAndUpdate(
    {
      userId,
      bookId,
      chapterNumber,
      completed: false
    },
    {
      $set: {
        readingLevel,
        lastActiveAt: new Date(),
        dialogueHistory
      },
      $setOnInsert: {
        startedAt: new Date(),
        totalPoints: 0,
        achievements: []
      }
    },
    { upsert: true, returnDocument: 'after' }
  );
  
  return Response.json(session);
}

// GET - Retrieve reading session
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const bookId = searchParams.get('bookId');
  const chapterNumber = searchParams.get('chapterNumber');
  
  const { db } = await connectToDatabase();
  
  const session = await db.collection('reading_sessions').findOne({
    userId,
    bookId,
    chapterNumber: parseInt(chapterNumber || '0'),
    completed: false
  });
  
  return Response.json(session);
}
```

### Step 2: Add Auto-Save Hook

Update `GameReader.tsx` to auto-save dialogue history:

```typescript
// Add this useEffect to GameReader component
useEffect(() => {
  const saveDialogueHistory = async () => {
    if (dialogueHistory.length === 0) return;
    
    try {
      await fetch('/api/reading-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId, // Get from auth context
          bookId: 'fahrenheit-451',
          chapterNumber: currentChapter,
          readingLevel,
          dialogueHistory
        })
      });
    } catch (error) {
      console.error('Failed to save dialogue history:', error);
    }
  };
  
  // Debounce auto-save (save every 5 dialogue entries or 30 seconds)
  const timer = setTimeout(saveDialogueHistory, 30000);
  
  if (dialogueHistory.length % 5 === 0) {
    saveDialogueHistory();
  }
  
  return () => clearTimeout(timer);
}, [dialogueHistory]);
```

### Step 3: Load Previous Session

Add session restoration on component mount:

```typescript
// Add this useEffect to GameReader component
useEffect(() => {
  const loadPreviousSession = async () => {
    try {
      const response = await fetch(
        `/api/reading-sessions?userId=${currentUserId}&bookId=fahrenheit-451&chapterNumber=${currentChapter}`
      );
      const session = await response.json();
      
      if (session && session.dialogueHistory) {
        setDialogueHistory(session.dialogueHistory);
        setTotalPoints(session.totalPoints || 0);
        setAchievements(session.achievements || []);
        
        // Ask user if they want to resume
        const shouldResume = confirm('Resume from where you left off?');
        if (shouldResume && session.dialogueHistory.length > 0) {
          const lastEntry = session.dialogueHistory[session.dialogueHistory.length - 1];
          setCurrentScene(lastEntry.sceneNumber);
          setCurrentDialogue(lastEntry.dialogueNumber);
        }
      }
    } catch (error) {
      console.error('Failed to load previous session:', error);
    }
  };
  
  loadPreviousSession();
}, [currentChapter]);
```

---

## 🎯 Advanced Features

### 1. **Search Dialogue**
Add search functionality to find specific dialogue:

```typescript
const [searchQuery, setSearchQuery] = useState('');

const filteredHistory = dialogueHistory.filter(entry => 
  entry.text[readingLevel].toLowerCase().includes(searchQuery.toLowerCase()) ||
  entry.character?.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### 2. **Export Dialogue**
Allow users to export their reading history:

```typescript
const exportDialogue = () => {
  const content = dialogueHistory.map((entry, i) => 
    `[${i + 1}] ${entry.character || 'Narrator'}: ${entry.text[readingLevel]}`
  ).join('\n\n');
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fahrenheit-451-chapter-${currentChapter + 1}.txt`;
  a.click();
};
```

### 3. **Dialogue Analytics**
Track reading patterns:

```typescript
const getReadingStats = () => {
  return {
    totalDialogue: dialogueHistory.length,
    charactersEncountered: [...new Set(dialogueHistory.map(e => e.character))].length,
    thoughtsRead: dialogueHistory.filter(e => e.thought).length,
    averageReadingSpeed: dialogueHistory.length / ((Date.now() - startTime) / 60000), // per minute
    mostActiveCharacter: getMostFrequentCharacter(dialogueHistory)
  };
};
```

### 4. **Bookmarks**
Let users bookmark important dialogue:

```typescript
interface BookmarkedEntry extends DialogueEntry {
  bookmarked: boolean;
  bookmarkNote?: string;
}

const toggleBookmark = (sceneNum: number, dialogueNum: number) => {
  // Add bookmark flag to entry
  // Save to database
};
```

---

## 🔒 Security Considerations

### 1. **User Authentication**
- Always verify userId matches authenticated user
- Use server-side session validation

### 2. **Data Privacy**
- Only allow users to access their own dialogue history
- Implement proper authorization checks

### 3. **Rate Limiting**
- Limit auto-save frequency to prevent spam
- Use debouncing for save operations

### 4. **Data Validation**
- Validate all incoming data structure
- Sanitize user input for search queries
- Limit dialogue history size (e.g., max 1000 entries)

---

## 📊 Analytics & Insights

### Potential Metrics to Track

1. **Reading Engagement**
   - Average session duration
   - Dialogue read per session
   - Completion rate

2. **Learning Patterns**
   - Reading level preferences
   - Back navigation frequency (how often users use Previous button)
   - Most reviewed dialogue (jump-back patterns)

3. **Content Performance**
   - Which scenes have highest engagement
   - Which characters are most popular
   - Where users drop off

---

## 🚀 Next Steps

1. **Set up MongoDB connection** - Configure connection string in environment variables
2. **Create database collections** - Set up schemas in MongoDB
3. **Implement API routes** - Create endpoints for save/load operations
4. **Add authentication** - Integrate user authentication system
5. **Test auto-save** - Verify dialogue history persists correctly
6. **Add session recovery** - Implement "Resume Reading" feature
7. **Build admin dashboard** - View user reading analytics

---

## 📚 Additional Resources

- [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Mongoose ODM](https://mongoosejs.com/docs/guide.html)

---

## 💡 Tips

- **Batch saves**: Save dialogue history in batches to reduce database writes
- **Local first**: Keep dialogue in local state, sync to DB periodically
- **Optimize queries**: Use indexes on userId and bookId fields
- **Compress data**: Consider compressing large dialogue histories
- **Archive old sessions**: Move completed sessions to archive collection
