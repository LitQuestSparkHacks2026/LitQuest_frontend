# Welcome to the SparkHacks2026 frontend!
# Outline

    > The application requires npm install followed by npm run dev to run while inside the "Visual Novel Story App" directory.
    
    > Components folder
    
        > GameReader.tsx
            The primary game engine and most complex component. It manages the actual reading experience.
            
            Responsibilities:
            
            Fetches scene data (dialogue, narration) via API.
            
            Renders the visual novel interface (backgrounds, character speakers, dialogue text).
            
            Manages the "Game Loop": advancing text, handling choices, and tracking history.
        
            Features: Includes a Heads-Up Display (HUD) for points/achievements, a vocabulary helper for "Beginner" levels, and integration with the ChatLog for dialogue history.
    
        > InteractiveChoice.tsx
          Renders branching decision points within the story.
          
          Usage: Appears when GameReader encounters a choice_point.
          
          Features: Displays options (A, B, C...), handles point scoring, and provides immediate feedback text upon selection.
          
    
        > StoryReader.tsx (Enhanced Book Mode)
        
            Style: Traditional text with interactive enhancements.
            
            Key Features:
            
            Sectioned Reading: Breaks chapters into digestible chunks with accompanying imagery.
            
            Context Panels: A "What's Happening Here?" sidebar that translates complex literary scenes into simple summaries based on the user's readingLevel.
            
            Interactive Text: Users can click specific words (like "pleasure" or "burning") to reveal hidden hints or thematic notes.
            
            Integrated Quizzes: Automatically triggers an InteractiveQuiz at the end of beginner sections.
            
            Audio Toggle: Includes controls for sound effects/narration.

        > ReadingLevelSelector.tsx
          A modal that lets users choose between "Middle School" (Beginner), "High School" (Intermediate), or "Adult" (Advanced) levels. This choice globally changes the text complexity in other components.

        > Library.tsx
          The main dashboard or "landing page" displaying a grid of available books (locked or ready) with their metadata.

    > Data folder

        > bookData.ts
            Contains the chapters, scenes, backgrounds, dialogue of each book in the application.

            Features: Library catalog for each book, vocabulary bank, dialogue for each level (beginner, intermediate, advanced), character sprites.

    > App.tsx
        Utilizes the components from GameReader.tsx, GameMenu.tsx, ReadingLevelSElector.tsx, Library.tsx, and ChapterSelect.tsx.
        
        Features: functions to handle the book, level, and chapter selected. Functions to handle how these components interact with each other.

    > API.ts
    
        Purpose: Manages external data fetching and server communication.

        Key Features:
        
        Environment-Aware Configuration:
        
        It defines the API_BASE URL dynamically. It checks for a Vite environment variable (VITE_API_BASE) first.
        
        Fallback: If no environment variable is found (e.g., during local development), it defaults to http://localhost:5001.
        
        Scene Fetching (fetchScene):
        
        Input: Accepts a unique sceneId (string).
        
        Operation: Sends a standard HTTP GET request to /api/scenes/{sceneId}.
        
        Error Handling: Includes a guard clause that throws an explicit error ("Failed to load...") if the server response is not "OK" (e.g., 404 or 500 errors).
        
        Output: Returns the raw JSON data for the scene (dialogue, choices, backgrounds) to be used by the game engine

    > Main.tsx
        Creates a React root at that DOM element.
        
        Finds the HTML element with id="root"

        Renders the App component into the created root element
