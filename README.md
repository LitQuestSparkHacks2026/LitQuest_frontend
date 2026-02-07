# Welcome to the SparkHacks2026 frontend!
# Getting Started Guide

#Outline

    > The application requires npm run dev to run.
    
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

        
        
            




















## Setting up Git

Before we do anything, we need to make sure you have git installed and ready to go. To start, open your **command line**. Then, simply enter:

```git```, so it looks like

```bash
C:\Users\name> git
```

If it prints out a lot of lines detailing the different git commands, then you already have git, and you can move on to cloning the repository.

## Configuring VSCode

If you have your own text editor (VSCode, NotePad++, etc.) and have it properly configured, skip this section.

If you don't have a text editor, we recommend installing VSCode at this [link](https://code.visualstudio.com/download) or through the Microsoft Store.

Once you have it installed, go to the Extensions tab and install [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets) and [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets). Optionally, install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Additionally, if you're working on front-end, install [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). This gives you autocompletion for CSS classes.

Next, click the **File** tab in the top left corner, and click **Open Window**. Navigate to wherever you would like to place the frontend folder, and click **Open Folder**.

Once you've opened the folder, open a new terminal by pressing ```CTRL + SHIFT + ` ```, or by clicking on any available **new terminal** or **terminal** option in the top left menus (this could change).

If you've done this correctly, there should be a terminal open at the bottom of your screen with a path leading to the folder you chose to open.

With that, you're ready to *Clone the Repo*.

## Cloning the Repository

Cloning the repository simply means copying all the files into a local folder of your choosing. To start, copy this repository's link:

```bash
https://github.com/SparkHacks2026/frontend.git
```

And then run the following command in your terminal:

```bash
git clone RepositoryLink
#RepositoryLink should be replaced with the link to whatever repo you're trying to clone
```

If this works, you should see the files for the frontend appear in the left file explorer. If you can, move on to installing dependencies.

## Installing Dependencies

Because we are using building a NextJS app, we need to install NextJS, React, and React-dom. 

To make sure your node installation worked, simply enter ```npm``` into your terminal.

This should bring up a whole list of commands. If it doesn't see the **Common Problems** Section.

From there, run:

```bash
npm install next react react-dom nextjs tailwindcss
```

or these 5 commands (one at a time):

```bash
npm install next
#and
npm install nextjs
#and
npm install react
#and
npm install react-dom
#and
npm install tailwindcss
```

If this works, you are ready to connect to the repository!

## Working with the Repository

### Conventions & Branching Structure Summary

For this repo, we'll be using the Github Flow approach. Essentially, that means we'll be making separate branches for every new feature and pushing to main through a pull request. For more information, look at [Amazon's explanation of Github Flow](https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/branches-in-a-git-hub-flow-strategy.html) or [this YouTube Video](https://www.youtube.com/watch?v=gW6dFpTMk8s&t=385s).

### Making your branch

First, confirm that git works in your code editor's terminal.

Next, go ahead and enter:

```bash
git checkout -b BranchName
#YourBranchName should follow our branch naming conventions, so make sure to ask what they are before making your branch
```

To confirm you made your branch, enter:

```bash
git branch
```

It should show a branch called main, and your branch name, which is highlighted green with an asterisk to the left.

### Adding and Committing Changes

To stage (add) your changes to your next commit, simply enter:

```bash
git add -A
#or
git add .
```

After that, commit your changes by entering:

```bash
git commit -m "Message"
#You can replace message with anything, preferable a short description of what you did
```

### Pushing to main

Now that you've staged and commited your changes, you can push them to main by entering:

```bash
git push origin BranchName
#Again, replace BranchName with whatever your branch name is
```

The terminal should have tell you to create a pull request on Github by visiting a link. Control Left Clicking the link will take you to the page to make a Pull Request.

Pull requests are the main way for you to say, "Hey, I made these changes, go look at them and approve of them!" Once made, the other members will go ahead and look at the changes, and either approve, deny, and/or give feedback.

### Pulling from Main

Pulling is how you retrieve more updated code to your branch. This is also very annoying, especially if there are merge conflicts.

To do this, first run:

```bash
git branch --set-upstream-to=origin/main BranchName
```

This ensures that whenever you pull changes, you're pulling from the main branch.

Next, simply enter:

```bash
git pull
```

And now whenever you run pull, you grab any changes from the main branch and add them your branch!
