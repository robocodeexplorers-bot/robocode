import React from 'react';
import LessonSlide from '../../components/LessonSlide';

const LoopsLesson = () => {
  const lesson = {
    title: "Loops & Repetition",
    slides: [
      {
        type: 'text',
        emoji: '🔁',
        title: 'Welcome to Loops!',
        content: 'Get ready to learn one of the most powerful tricks in coding - making your code do the same thing over and over without writing it multiple times!'
      },
      {
        type: 'image',
        title: 'What is a Loop?',
        content: 'A loop is a way to repeat instructions multiple times. Instead of writing the same code 100 times, you write it once and tell the computer "do this 100 times!"',
        visual: '🔄🔄🔄',
        caption: 'Loops = Smart Repetition!'
      },
      {
        type: 'text',
        emoji: '🎵',
        title: 'Think About Your Favorite Song',
        content: 'When you hear a chorus repeat 3 times in a song, the singer doesn\'t write the lyrics 3 times - they just say "repeat chorus x3". That\'s exactly what loops do!'
      },
      {
        type: 'quiz',
        question: 'Why are loops useful in coding?',
        options: [
          '🎨 They make your code colorful',
          '🔄 They help you repeat actions without writing the same code over and over',
          '🎮 They make games more fun',
          '📱 They make your computer faster'
        ],
        correctAnswer: 1,
        explanation: 'Loops let you repeat code efficiently without copying and pasting the same instructions many times!'
      },
      {
        type: 'image',
        title: 'Real Life Example: Brushing Teeth',
        content: 'When you brush your teeth, you don\'t think "move brush left, move brush right" 50 separate times. You think "repeat brushing motion 50 times!" That\'s a loop!',
        visual: '🪥↔️↔️↔️',
        caption: 'Repeat, repeat, repeat!'
      },
      {
        type: 'text',
        emoji: '🤖',
        title: 'Robot Walking Example',
        content: 'Without loops: "Step, step, step, step, step..." you\'d have to write "step" 100 times! With loops: "Repeat: take a step (100 times)" - so much easier!'
      },
      {
        type: 'quiz',
        question: 'You want a robot to clap 10 times. What\'s the best way?',
        options: [
          '👏 Write "clap" one time',
          '🔁 Use a loop to repeat "clap" 10 times',
          '📝 Write "clap" 10 separate times in your code',
          '🎵 Play clapping music'
        ],
        correctAnswer: 1,
        explanation: 'Using a loop is the smart way! You write "clap" once and tell it to repeat 10 times. Much better than writing it 10 times!'
      },
      {
        type: 'image',
        title: 'Types of Loops',
        content: 'There are different types of loops, but they all do the same thing: repeat actions! The most common is "repeat X times" where you decide how many times to loop.',
        visual: '🔢➡️🔁',
        caption: 'Count and repeat!'
      },
      {
        type: 'text',
        emoji: '🎮',
        title: 'Loops in Games',
        content: 'In video games, loops make characters keep running, enemies keep spawning, and music keep playing. Without loops, games would just... stop!'
      },
      {
        type: 'quiz',
        question: 'What happens if you forget to stop a loop?',
        options: [
          '♾️ It keeps going forever (infinite loop!)',
          '💥 Your computer explodes',
          '🎉 You win the game',
          '😴 Nothing happens'
        ],
        correctAnswer: 0,
        explanation: 'An infinite loop keeps running forever because you didn\'t tell it when to stop! This can freeze your program, so always make sure your loops have an end!'
      },
      {
        type: 'image',
        title: 'Building with Blocks',
        content: 'Imagine building a wall with 50 LEGO blocks. Would you rather: write instructions for each block (50 steps) OR write one instruction and repeat it 50 times? Loops make coding easier!',
        visual: '🧱🧱🧱',
        caption: 'One instruction, many repetitions!'
      },
      {
        type: 'text',
        emoji: '🌟',
        title: 'Loops Save Time!',
        content: 'Imagine if you had to write "print a star" 1000 times to draw a starry sky. With loops, you write it ONCE and say "repeat 1000 times!" That\'s the power of loops!'
      },
      {
        type: 'quiz',
        question: 'You want to draw 5 circles. Which is better?',
        options: [
          '⭕ Draw circle, Draw circle, Draw circle, Draw circle, Draw circle',
          '🔁 Repeat 5 times: Draw circle',
          '🎨 Draw one big circle',
          '❌ Don\'t draw any circles'
        ],
        correctAnswer: 1,
        explanation: 'Using a loop (Repeat 5 times: Draw circle) is cleaner, shorter, and easier to change! What if you want 100 circles? Just change the 5 to 100!'
      },
      {
        type: 'image',
        title: 'Nested Loops: Loops Inside Loops!',
        content: 'Sometimes you need a loop inside another loop! Like when you want to print a grid: "For each row, print 5 stars." That\'s a loop inside a loop!',
        visual: '🔁➡️🔁',
        caption: 'Loops can contain other loops!'
      },
      {
        type: 'text',
        emoji: '💡',
        title: 'Pro Tip: Count Your Loops',
        content: 'Always know how many times your loop should run. Too few = task not finished. Too many = wasted time. Just right = perfect code!'
      },
      {
        type: 'quiz',
        question: 'Which of these uses a loop?',
        options: [
          '🔄 Printing "Hello" 10 times',
          '📝 Writing your name once',
          '🎨 Drawing one triangle',
          '🖱️ Clicking a button once'
        ],
        correctAnswer: 0,
        explanation: 'Printing "Hello" 10 times is perfect for a loop! The others are single actions that don\'t need repetition.'
      },
      {
        type: 'celebration',
        title: 'You\'re a Loop Master!',
        content: 'Awesome! You now understand how loops help you repeat code efficiently. Loops are one of the most important tools in programming - you\'ll use them everywhere! 🚀'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default LoopsLesson;