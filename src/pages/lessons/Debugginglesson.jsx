import React from 'react';
import LessonSlide from '../../components/LessonSlide';
import { CodeSequencer, BugSpotter, CodeFixer } from '../../components/InteractiveDebugComponents';

const DebuggingLesson = () => {
  const lesson = {
    title: "Debugging",
    slides: [
      {
        type: 'text',
        emoji: '🐛',
        title: 'Welcome to Debugging!',
        content: 'Every coder makes mistakes - that\'s totally normal! Debugging is the superpower of finding and fixing errors in your code. Let\'s learn how to be bug detectives!'
      },
      {
        type: 'image',
        title: 'What is a Bug?',
        content: 'A "bug" is an error or problem in your code that makes it not work correctly. The name comes from the 1940s when a real moth caused a computer to malfunction!',
        visual: '🐛💻❌',
        caption: 'Real bugs broke real computers!'
      },
      {
        type: 'text',
        emoji: '🔍',
        title: 'Detective Mode: ON',
        content: 'Think of debugging like being a detective 🕵️. You have a mystery (the bug), you look for clues (error messages), and you solve the case (fix the code)! Every bug has a story.'
      },
      {
        type: 'interactive',
        title: '🥪 Interactive: Fix the Sequence!',
        content: 'Drag and drop the code blocks to put them in the correct order.',
        component: <CodeSequencer />
      },
      {
        type: 'interactive',
        title: '🔍 Interactive: Spot the Bug!',
        content: 'Click on the line of code that contains the bug.',
        component: <BugSpotter />
      },
      {
        type: 'quiz',
        question: 'What\'s the FIRST thing you should do when you see an error message?',
        options: [
          '😱 Panic and delete everything',
          '📖 Read the error message carefully for clues',
          '💻 Close your computer',
          '🎲 Change random parts of your code'
        ],
        correctAnswer: 1,
        explanation: 'Error messages are your friends! They tell you exactly what went wrong and often where. Always read them carefully first.'
      },
      {
        type: 'interactive',
        title: '🔧 Interactive: Fix the Code!',
        content: 'See the buggy code and reveal the fix to understand what went wrong.',
        component: <CodeFixer />
      },
      {
        type: 'image',
        title: '⚠️ Error Type Recognition',
        content: 'Syntax Error: Typos, missing punctuation ❌\nLogic Error: Code runs but does wrong thing 🤔\nRuntime Error: Code crashes while running 💥\n\nKnowing the type helps you fix faster!',
        visual: '❌🤔💥',
        caption: 'Three main error types'
      },
      {
        type: 'text',
        emoji: '🎮',
        title: 'Real Bug Story: Video Game',
        content: 'Bug: Player jumps through the ceiling and falls forever! Cause: Jump code didn\'t check for ceiling. Fix: Add "IF below ceiling, THEN jump." Always test edge cases!'
      },
      {
        type: 'quiz',
        question: 'Your loop runs 11 times instead of 10. What kind of error is this?',
        options: [
          '🔢 Off-by-one error (counting mistake)',
          '⌨️ Syntax error (typo)',
          '💥 Runtime error (crash)',
          '🎯 This is perfect code'
        ],
        correctAnswer: 0,
        explanation: 'Off-by-one errors happen when counting is wrong - like starting at 1 instead of 0. Very common and tricky to spot!'
      },
      {
        type: 'image',
        title: '🔍 Debugging Techniques: Print Debugging',
        content: 'Add print statements to see what your code is doing:\n\nPrint "Starting..."\n[Your code here]\nPrint "Step 1 done"\n[More code]\nPrint "Finished!"\n\nThis shows where problems happen!',
        visual: '📝➡️👀➡️🐛',
        caption: 'Leaving breadcrumbs to find bugs'
      },
      {
        type: 'text',
        emoji: '🎯',
        title: 'The Rubber Duck Method',
        content: 'Explain your code line-by-line to a rubber duck 🦆 (or any object)! Sounds silly, but it works! When you explain OUT LOUD, you often spot the bug yourself. Try it!'
      },
      {
        type: 'image',
        title: '🧪 Test Before & After',
        content: 'BEFORE Fix: "Add 2 + 2" → Shows 5 ❌\nAFTER Fix: "Add 2 + 2" → Shows 4 ✓\n\nAlways test your fix! Sometimes a fix breaks something else or doesn\'t fully work.',
        visual: '❌➡️🔧➡️✅',
        caption: 'Test, fix, test again!'
      },
      {
        type: 'quiz',
        question: 'Code works fine with small numbers but breaks with big numbers. What do you do?',
        options: [
          '🙈 Ignore it and hope nobody notices',
          '🧪 Test with different sizes to find the breaking point',
          '📏 Only use small numbers forever',
          '❌ Give up coding'
        ],
        correctAnswer: 1,
        explanation: 'Test edge cases! Try the smallest input, biggest input, and in-between. This helps you understand the limits and fix the real problem.'
      },
      {
        type: 'image',
        title: '📋 The Debug Checklist',
        content: '1. Read error message 📖\n2. Find WHERE it breaks 📍\n3. Understand WHY it breaks 🤔\n4. Make ONE change 🔧\n5. Test the change ✅\n6. Repeat if needed 🔄',
        visual: '✓✓✓✓✓✓',
        caption: 'Your systematic approach'
      },
      {
        type: 'text',
        emoji: '🌟',
        title: 'Debugging Mindset',
        content: 'Bugs are NOT failures - they\'re puzzles to solve! Every bug you fix teaches you something new. Even professional coders debug every single day. It\'s a normal, important part of coding!'
      },
      {
        type: 'image',
        title: '💪 Pro Tips',
        content: '• Change ONE thing at a time\n• Save working code before experimenting\n• Take breaks if frustrated\n• Ask for help - two brains > one!\n• Keep a bug journal to learn patterns',
        visual: '🧠💡🤝',
        caption: 'Level up your debugging game!'
      },
      {
        type: 'celebration',
        title: 'You\'re a Bug Detective!',
        content: 'Awesome work! You now have the skills to hunt down and fix bugs like a pro. Remember: bugs are just puzzles waiting to be solved. Keep debugging, keep learning! 🔍🐛✨'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default DebuggingLesson;