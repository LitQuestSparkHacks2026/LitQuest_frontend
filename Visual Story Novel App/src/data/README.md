# LitQuest - Book Data Structure for MongoDB

This directory contains all the structured literary content for the LitQuest application, organized for easy MongoDB integration.

## 📁 File Organization

- **bookData.ts** - Main data file containing all book content, vocabulary, and metadata

## 🗄️ MongoDB Collection Structure

### Collections Overview

1. **books** - Top-level book metadata
2. **vocabulary** - Vocabulary entries for each book
3. **chapters** - Chapter information
4. **scenes** - Individual scenes within chapters
5. **achievements** - Achievement definitions

---

## 📚 Data Schema

### 1. Books Collection

```typescript
{
  _id: ObjectId,
  id: string,                    // Unique book identifier (e.g., "fahrenheit-451")
  title: string,                 // Book title
  author: string,                // Author name
  coverSearch: string,           // Search term for cover image
  available: boolean,            // Whether book is playable
  description: string,           // Short description
  difficulty: string,            // "Beginner" | "Intermediate" | "Advanced"
  totalChapters: number,         // Total number of chapters
  color: string,                 // Hex color for UI theming
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": "fahrenheit-451",
  "title": "Fahrenheit 451",
  "author": "Ray Bradbury",
  "coverSearch": "fahrenheit 451 book cover fire",
  "available": true,
  "description": "A dystopian novel about a future society where books are banned.",
  "difficulty": "Intermediate",
  "totalChapters": 5,
  "color": "#FF6B35",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

---

### 2. Vocabulary Collection

```typescript
{
  _id: ObjectId,
  bookId: string,               // Reference to book.id
  word: string,                 // The vocabulary word
  definition: string,           // Full definition
  simplified: string,           // Simplified version for younger readers
  createdAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "bookId": "fahrenheit-451",
  "word": "dystopian",
  "definition": "An imagined bad future society",
  "simplified": "bad future world",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

**Indexes:**
- `{ bookId: 1, word: 1 }` - Unique compound index
- `{ word: 1 }` - For quick word lookups

---

### 3. Chapters Collection

```typescript
{
  _id: ObjectId,
  bookId: string,               // Reference to book.id
  chapterNumber: number,        // Sequential chapter number (1, 2, 3...)
  title: string,                // Chapter title
  emoji: string,                // Emoji representation
  description: string,          // Chapter description
  color: string,                // Hex color for UI
  sceneCount: number,           // Total scenes in chapter
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "bookId": "fahrenheit-451",
  "chapterNumber": 1,
  "title": "The Burning Beginning",
  "emoji": "🔥",
  "description": "Meet Guy Montag, a fireman who burns books. His encounter with Clarisse changes everything.",
  "color": "#FF6B35",
  "sceneCount": 4,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

**Indexes:**
- `{ bookId: 1, chapterNumber: 1 }` - Unique compound index

---

### 4. Scenes Collection

```typescript
{
  _id: ObjectId,
  bookId: string,               // Reference to book.id
  chapterNumber: number,        // Reference to chapter
  sceneNumber: number,          // Sequential scene number within chapter
  id: string,                   // Unique scene identifier (e.g., "ch1_scene1")
  background: string,           // Background image description
  dialogue: [                   // Array of dialogue lines
    {
      character: string,        // Character name or "Narrator"
      text: {
        beginner: string,       // Text for middle school level
        intermediate: string,   // Text for high school level
        advanced: string        // Text for adult level
      },
      sprite: string,           // Character sprite identifier (optional)
      spritePosition: string,   // "left" | "center" | "right" (optional)
      emotion: string,          // "neutral" | "happy" | "sad" | "angry" | "thoughtful" (optional)
      thought: boolean          // Is this a thought vs. spoken dialogue? (optional)
    }
  ],
  choice: {                     // Interactive choice (optional)
    prompt: {
      beginner: string,
      intermediate: string,
      advanced: string
    },
    options: [
      {
        text: string,           // Choice text (same for all levels)
        feedback: {
          beginner: string,
          intermediate: string,
          advanced: string
        },
        points: number          // Points awarded
      }
    ]
  },
  achievementId: string,        // Reference to achievement (optional)
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "bookId": "fahrenheit-451",
  "chapterNumber": 1,
  "sceneNumber": 1,
  "id": "ch1_scene1",
  "background": "dark city night fire burning",
  "dialogue": [
    {
      "character": "Narrator",
      "text": {
        "beginner": "In a world where books are not allowed...",
        "intermediate": "In a world where books are forbidden...",
        "advanced": "In a dystopian world where literature is forbidden..."
      },
      "thought": true
    }
  ],
  "choice": null,
  "achievementId": "chapter1_start",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

**Indexes:**
- `{ bookId: 1, chapterNumber: 1, sceneNumber: 1 }` - Unique compound index
- `{ id: 1 }` - For direct scene lookups

---

### 5. Achievements Collection

```typescript
{
  _id: ObjectId,
  id: string,                   // Unique achievement identifier
  bookId: string,               // Reference to book.id
  title: string,                // Achievement title
  description: string,          // Achievement description
  createdAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "id": "chapter1_start",
  "bookId": "fahrenheit-451",
  "title": "The Journey Begins",
  "description": "Started your journey into Fahrenheit 451",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

**Indexes:**
- `{ id: 1 }` - Unique index
- `{ bookId: 1 }` - For fetching all achievements for a book

---

## 🔄 Data Migration from TypeScript to MongoDB

### Step 1: Import the data

```javascript
// migration-script.js
const { fahrenheit451, libraryBooks } = require('./bookData.ts');
const { MongoClient } = require('mongodb');

async function migrateData() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('litquest');

  // 1. Insert book metadata
  const book = {
    id: fahrenheit451.id,
    title: fahrenheit451.title,
    author: fahrenheit451.author,
    coverSearch: fahrenheit451.coverSearch,
    available: fahrenheit451.available,
    description: fahrenheit451.description,
    difficulty: fahrenheit451.difficulty,
    totalChapters: fahrenheit451.totalChapters,
    color: fahrenheit451.color,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await db.collection('books').insertOne(book);

  // 2. Insert vocabulary
  const vocabDocs = fahrenheit451.vocabulary.map(v => ({
    bookId: fahrenheit451.id,
    word: v.word,
    definition: v.definition,
    simplified: v.simplified,
    createdAt: new Date()
  }));
  await db.collection('vocabulary').insertMany(vocabDocs);

  // 3. Insert chapters
  for (const chapter of fahrenheit451.chapters) {
    const chapterDoc = {
      bookId: fahrenheit451.id,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      emoji: chapter.emoji,
      description: chapter.description,
      color: chapter.color,
      sceneCount: chapter.scenes.length,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await db.collection('chapters').insertOne(chapterDoc);

    // 4. Insert scenes
    for (const scene of chapter.scenes) {
      const sceneDoc = {
        bookId: fahrenheit451.id,
        chapterNumber: chapter.chapterNumber,
        sceneNumber: scene.sceneNumber,
        id: scene.id,
        background: scene.background,
        dialogue: scene.dialogue,
        choice: scene.choice || null,
        achievementId: scene.achievement?.id || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection('scenes').insertOne(sceneDoc);

      // 5. Insert achievement if exists
      if (scene.achievement) {
        const achievementDoc = {
          id: scene.achievement.id,
          bookId: fahrenheit451.id,
          title: scene.achievement.title,
          description: scene.achievement.description,
          createdAt: new Date()
        };
        await db.collection('achievements').insertOne(achievementDoc);
      }
    }
  }

  await client.close();
  console.log('Migration complete!');
}

migrateData();
```

---

## 📊 Query Examples

### Fetch all available books
```javascript
db.books.find({ available: true });
```

### Get a specific book with all its chapters
```javascript
const book = await db.books.findOne({ id: "fahrenheit-451" });
const chapters = await db.chapters.find({ bookId: book.id }).sort({ chapterNumber: 1 }).toArray();
```

### Get all scenes for a specific chapter
```javascript
const scenes = await db.scenes.find({ 
  bookId: "fahrenheit-451", 
  chapterNumber: 1 
}).sort({ sceneNumber: 1 }).toArray();
```

### Get vocabulary for a book
```javascript
const vocabulary = await db.vocabulary.find({ bookId: "fahrenheit-451" }).toArray();
```

### Get all achievements for a book
```javascript
const achievements = await db.achievements.find({ bookId: "fahrenheit-451" }).toArray();
```

---

## 🎯 Best Practices

1. **Indexing**: Always create indexes on frequently queried fields
2. **Caching**: Cache book metadata and vocabulary in Redis for faster access
3. **Pagination**: Use pagination when fetching large dialogue arrays
4. **Versioning**: Add version fields to track content updates
5. **Validation**: Use MongoDB schema validation for data integrity

---

## 🚀 Future Enhancements

- Add user progress tracking (separate collection)
- Store user choices and paths taken
- Add tags/themes for better book discovery
- Include reading time estimates per scene/chapter
- Add audio file references for text-to-speech
- Character sprite asset references

---

## 📝 Content Guidelines

### Writing Dialogue

- **Beginner**: Simple vocabulary, shorter sentences, clear explanations
- **Intermediate**: Original or slightly simplified text, moderate complexity
- **Advanced**: Complex vocabulary, original literary language, nuanced concepts

### Creating Choices

- Always provide 3 options
- Award points (10 for correct, 5 for partial, 0 for incorrect)
- Feedback should explain why the answer is correct/incorrect at appropriate reading level

### Achievements

- Award achievements at key story moments
- Titles should be exciting and memorable
- Descriptions should explain what was accomplished

---

For questions or contributions, please contact the LitQuest development team.
