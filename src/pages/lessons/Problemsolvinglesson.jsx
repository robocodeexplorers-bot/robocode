import React from 'react';
import LessonSlide from '../../components/LessonSlide';

const ProblemSolvingLesson = () => {
  const lesson = {
    title: "Problem Solving",
    slides: [
      {
        type: 'text',
        emoji: '🧩',
        title: 'Welcome to Problem Solving!',
        content: 'Coding is all about solving problems! The best coders aren\'t just good at writing code - they\'re amazing at breaking big, scary problems into small, easy pieces. Let\'s learn how!'
      },
      {
        type: 'image',
        title: 'What is Problem Solving?',
        content: 'Problem solving is taking a big challenge and figuring out step-by-step how to solve it. It\'s like solving a puzzle 🧩 - you don\'t do it all at once, you do one piece at a time!',
        visual: '🎯➡️📋➡️✅',
        caption: 'Big problem → Small steps → Solution!'
      },
      {
        type: 'text',
        emoji: '🐘',
        title: 'How Do You Eat an Elephant?',
        content: 'There\'s a famous question: "How do you eat an elephant?" Answer: "One bite at a time!" 🍴 That\'s exactly how you solve big coding problems - break them into bite-sized pieces!'
      },
      {
        type: 'quiz',
        question: 'You need to build a calculator app. What\'s the FIRST step?',
        options: [
          '⌨️ Start writing code immediately',
          '🧩 Break it down: What features does it need? (add, subtract, etc.)',
          '🎨 Design the colors',
          '😰 Worry that it\'s too hard'
        ],
        correctAnswer: 1,
        explanation: 'Always start by breaking down the problem! List what your calculator needs to do (add, subtract, multiply, divide) BEFORE you start coding.'
      },
      {
        type: 'image',
        title: 'The Problem-Solving Process',
        content: '1️⃣ Understand the problem, 2️⃣ Break it into smaller parts, 3️⃣ Solve each part, 4️⃣ Put it all together, 5️⃣ Test and improve!',
        visual: '📚➡️📄➡️✅➡️🎉',
        caption: 'Follow these steps every time!'
      },
      {
        type: 'text',
        emoji: '🤔',
        title: 'Step 1: Understand the Problem',
        content: 'Before solving anything, make sure you REALLY understand what you\'re trying to do. Ask: What\'s the goal? What are the rules? What information do I have? What\'s the expected result?'
      },
      {
        type: 'quiz',
        question: 'Problem: "Make a robot reach the goal." What info do you need FIRST?',
        options: [
          '🎨 What color is the robot?',
          '🤖 Where is the robot now? Where is the goal? What\'s in the way?',
          '⚡ How fast can the robot go?',
          '🎵 What music does the robot like?'
        ],
        correctAnswer: 1,
        explanation: 'You need to know the starting point, ending point, and any obstacles! These are essential facts for solving the problem.'
      },
      {
        type: 'image',
        title: 'Step 2: Break It Down',
        content: 'Example: "Make a sandwich" breaks down into → Get bread, get ingredients, spread ingredients, put together, cut in half. Each step is simple!',
        visual: '🥪➡️🍞🥜🍇🔪',
        caption: 'Complex task → Simple steps'
      },
      {
        type: 'text',
        emoji: '🎮',
        title: 'Game Example: Tic-Tac-Toe',
        content: 'Big problem: "Create tic-tac-toe game." Break down: 1) Draw the grid, 2) Let players place X or O, 3) Check for winner after each turn, 4) Declare winner or tie. Much easier!'
      },
      {
        type: 'quiz',
        question: 'You want to sort a list of numbers from smallest to biggest. First step?',
        options: [
          '🎲 Randomly move numbers around',
          '🔀 Compare two numbers and swap if needed, repeat this process',
          '💤 Wait for them to sort themselves',
          '🗑️ Delete all the numbers'
        ],
        correctAnswer: 1,
        explanation: 'Sorting breaks down into comparing pairs and swapping them if they\'re in the wrong order. Repeat until everything is sorted!'
      },
      {
        type: 'image',
        title: 'Pattern Recognition',
        content: 'Look for patterns in problems! If you\'re doing the same thing over and over → use a loop! If you\'re making different choices → use conditionals! Patterns help you know what tools to use.',
        visual: '🔁 🤔 📋',
        caption: 'Spot the pattern, find the solution!'
      },
      {
        type: 'text',
        emoji: '🔍',
        title: 'Pattern Example',
        content: 'Problem: Print numbers 1 to 100. Pattern spotted: Same action (print) repeated 100 times. Solution: Use a loop! Always look for patterns to make coding easier.'
      },
      {
        type: 'quiz',
        question: 'What pattern do you see: "If sunny, beach. If rainy, movies. If snowy, skiing"?',
        options: [
          '🔁 A repeating loop',
          '❓ Conditional logic (if/else decisions)',
          '📊 A math problem',
          '🎨 A drawing program'
        ],
        correctAnswer: 1,
        explanation: 'This is a conditional pattern! Different weather → different activity. Perfect use case for if/else statements!'
      },
      {
        type: 'image',
        title: 'Step 3: Solve Each Part',
        content: 'Once broken down, solve ONE piece at a time. Don\'t try to do everything at once! Finish one step, test it, then move to the next. Build your solution piece by piece.',
        visual: '1️⃣✅ 2️⃣✅ 3️⃣✅',
        caption: 'One step at a time wins the race!'
      },
      {
        type: 'text',
        emoji: '🏗️',
        title: 'Building Block Approach',
        content: 'Think of your solution like LEGO bricks. Each small piece (function/section of code) does ONE thing well. Then you connect the pieces to build something amazing!'
      },
      {
        type: 'quiz',
        question: 'You\'re stuck on step 3 of a 10-step problem. What should you do?',
        options: [
          '😫 Give up on the whole thing',
          '⏭️ Skip it and hope it works out',
          '🎯 Focus on just that step, maybe break it down further, ask for help',
          '🎲 Try random solutions'
        ],
        correctAnswer: 2,
        explanation: 'Being stuck is normal! Focus on just that one step, break it down even smaller if needed, and don\'t be afraid to ask for help.'
      },
      {
        type: 'image',
        title: 'Step 4: Put It Together',
        content: 'After solving each piece, combine them! Like assembling a puzzle - each piece works individually, and together they create the complete picture.',
        visual: '🧩+🧩+🧩=🖼️',
        caption: 'Individual parts → Complete solution'
      },
      {
        type: 'text',
        emoji: '🧪',
        title: 'Step 5: Test Everything!',
        content: 'After putting it together, TEST! Try normal cases, try weird cases, try to break it! Testing helps you find problems before users do. Good coders test A LOT.'
      },
      {
        type: 'quiz',
        question: 'Which is a good test for a "login" feature?',
        options: [
          '🔐 Try correct password, wrong password, empty password, special characters',
          '🎯 Just try it once with your password',
          '😴 Don\'t test it at all',
          '🎨 Test if it looks pretty'
        ],
        correctAnswer: 0,
        explanation: 'Test EVERYTHING! Try the normal case, edge cases, error cases. The more you test, the better your solution works!'
      },
      {
        type: 'image',
        title: 'Problem-Solving Mindset',
        content: 'Be patient 🧘, be curious 🤔, be persistent 💪, and don\'t fear mistakes 🐛. Every problem you solve makes you better at solving the next one!',
        visual: '🧠💡✨',
        caption: 'Your coder mindset!'
      },
      {
        type: 'text',
        emoji: '🎯',
        title: 'Real-World Application',
        content: 'These problem-solving skills aren\'t just for coding! You can use them for math homework, science projects, planning events, and even daily life challenges. You\'re learning to THINK like a problem solver!'
      },
      {
        type: 'quiz',
        question: 'What\'s the most important problem-solving skill?',
        options: [
          '⚡ Coding really fast',
          '🧠 Memorizing all the code',
          '💡 Breaking big problems into smaller, manageable pieces',
          '🎨 Making things look nice'
        ],
        correctAnswer: 2,
        explanation: 'Breaking down problems is THE key skill! Once a big problem is broken into small pieces, each piece is easy to solve. This works for any problem, coding or not!'
      },
      {
        type: 'image',
        title: 'Your Problem-Solving Toolkit',
        content: '🧩 Break it down, 🔍 Look for patterns, 📝 Plan before coding, 🧪 Test often, 🤝 Ask for help when stuck, 🔄 Iterate and improve!',
        visual: '🛠️💼',
        caption: 'Tools every coder needs!'
      },
      {
        type: 'celebration',
        title: 'You\'re a Problem-Solving Pro!',
        content: 'Congratulations! You\'ve completed all the lessons! You now have the foundation to think like a real coder. Remember: every expert was once a beginner. Keep practicing, keep solving, keep creating! 🌟🚀'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default ProblemSolvingLesson;