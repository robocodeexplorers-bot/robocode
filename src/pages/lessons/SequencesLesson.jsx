import React from 'react';
import LessonSlide from '../../components/LessonSlide';

const SequencesLesson = () => {
  const lesson = {
    title: "Sequences",
    slides: [
      {
        type: 'text',
        emoji: '🎯',
        title: 'Welcome to Sequences!',
        content: 'Today you\'ll learn why the ORDER of your code instructions really matters. Get ready to think step-by-step!'
      },
      {
        type: 'image',
        title: 'What is a Sequence?',
        content: 'A sequence is a set of instructions that must be followed IN ORDER, one after another. Just like following a recipe!',
        visual: '1️⃣➡️2️⃣➡️3️⃣',
        caption: 'Order matters!'
      },
      {
        type: 'text',
        emoji: '🧁',
        title: 'Think About Baking a Cake',
        content: 'What happens if you put frosting on BEFORE baking the cake? Disaster! The order of steps is super important!'
      },
      {
        type: 'quiz',
        question: 'Which order is correct for making a sandwich?',
        options: [
          '🍞 Eat it → Add peanut butter → Get bread',
          '🥜 Add peanut butter → Get bread → Eat it',
          '✅ Get bread → Add peanut butter → Eat it',
          '🔄 It doesn\'t matter what order!'
        ],
        correctAnswer: 2,
        explanation: 'Perfect! You need to follow the steps in the right sequence, or your sandwich won\'t work!'
      },
      {
        type: 'image',
        title: 'Sequences in Code',
        content: 'When you write code, the computer reads your instructions from top to bottom, one line at a time - just like reading a book!',
        visual: '📖⬇️',
        caption: 'Top to bottom, line by line'
      },
      {
        type: 'text',
        emoji: '🤖',
        title: 'Robot Example',
        content: 'If you tell a robot to: "Walk forward, then turn right, then pick up the ball" - it will do EXACTLY that, in that exact order!'
      },
      {
        type: 'quiz',
        question: 'What will the robot do with these instructions?\n1. Move forward\n2. Turn left\n3. Jump',
        options: [
          '🤸 Jump first, then move',
          '↪️ Turn left, then move forward',
          '✅ Move forward, turn left, then jump',
          '🎲 Do them in any random order'
        ],
        correctAnswer: 2,
        explanation: 'Yes! The robot follows instructions in sequence: forward first, then left, then jump!'
      },
      {
        type: 'image',
        title: 'What If We Mix Up the Order?',
        content: 'If you put "Open the door" AFTER "Walk through the door", the computer will try to walk through a closed door! Ouch!',
        visual: '🚪💥🤕',
        caption: 'Wrong order = Problems!'
      },
      {
        type: 'text',
        emoji: '🎮',
        title: 'Real Code Example',
        content: 'In a game, if you write "Show victory screen" before "Check if player won", everyone would see the victory screen even if they lost!'
      },
      {
        type: 'quiz',
        question: 'You want a character to jump over a wall. What\'s the correct sequence?',
        options: [
          '🧱 Land → Jump → Run to wall',
          '✅ Run to wall → Jump → Land',
          '🦘 Jump → Land → Run to wall',
          '🏃 Run to wall → Land → Jump'
        ],
        correctAnswer: 1,
        explanation: 'Exactly right! First run to the wall, then jump over it, then land safely on the other side!'
      },
      {
        type: 'image',
        title: 'Pro Tip: Plan Before You Code!',
        content: 'Before writing code, write down the steps in order. This helps you catch mistakes before they happen!',
        visual: '📝✅',
        caption: 'Think first, code second'
      },
      {
        type: 'text',
        emoji: '⚡',
        title: 'Quick Challenge!',
        content: 'Imagine telling someone to brush their teeth. What\'s the correct sequence? (Think about it before the next slide!)'
      },
      {
        type: 'quiz',
        question: 'Correct sequence for brushing teeth:',
        options: [
          '🪥 Brush → Get toothbrush → Add toothpaste',
          '💦 Rinse → Brush → Get toothbrush',
          '✅ Get toothbrush → Add toothpaste → Brush → Rinse',
          '🔄 Any order works!'
        ],
        correctAnswer: 2,
        explanation: 'Perfect sequence! Each step must happen in the right order to brush your teeth properly!'
      },
      {
        type: 'image',
        title: 'Sequences Are Everywhere!',
        content: 'Getting dressed, making breakfast, playing a game level - everything in life AND in code follows sequences!',
        visual: '🌍💻🎯',
        caption: 'Life is full of sequences!'
      },
      {
        type: 'text',
        emoji: '🎯',
        title: 'Remember This Rule',
        content: 'In coding: SEQUENCE = ORDER = SUCCESS! Always think about what needs to happen first, second, third, and so on.'
      },
      {
        type: 'celebration',
        title: 'You\'re a Sequence Master!',
        content: 'Amazing work! You now understand that the ORDER of your code matters. Next up: learn how to repeat sequences with loops! 🚀'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default SequencesLesson;