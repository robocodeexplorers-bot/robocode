import React from 'react';
import LessonSlide from '../../components/LessonSlide';

const WhatIsCodingLesson = () => {
  const lesson = {
    title: "What is Coding?",
    slides: [
      {
        type: 'text',
        emoji: '👋',
        title: 'Welcome, Future Coder!',
        content: 'Get ready to discover the secret power that makes computers, phones, and robots work!'
      },
      {
        type: 'image',
        title: 'Imagine This...',
        content: 'You want to make a peanut butter and jelly sandwich. How would you tell a robot to do it?',
        visual: '🤖🥪',
        caption: 'Robots need VERY specific instructions!'
      },
      {
        type: 'text',
        emoji: '🗣️',
        title: 'Coding is Like Giving Instructions',
        content: 'Just like you tell a friend how to play a game, coding is telling a computer exactly what to do, step by step!'
      },
      {
        type: 'image',
        title: 'But Computers Speak Differently',
        content: 'Computers don\'t understand English. They need special languages called "programming languages" - like Python, JavaScript, or blocks!',
        visual: '💻✨',
        caption: 'Code = Computer Language'
      },
      {
        type: 'quiz',
        question: 'What is coding?',
        options: [
          '🎮 Playing video games',
          '💬 Giving computers step-by-step instructions',
          '📱 Using a phone',
          '🎨 Drawing pictures'
        ],
        correctAnswer: 1,
        explanation: 'Exactly! Coding is writing instructions that computers can understand and follow.'
      },
      {
        type: 'text',
        emoji: '🌟',
        title: 'Why is Coding Cool?',
        content: 'With coding, YOU become the boss! You can create games, apps, websites, robots, and bring your wildest ideas to life!'
      },
      {
        type: 'image',
        title: 'Coders Built Everything!',
        content: 'Your favorite games, YouTube, TikTok, even the calculator on your phone - all made by coders just like you!',
        visual: '🎮📱🎬🎵',
        caption: 'Every app started as code!'
      },
      {
        type: 'celebration',
        title: 'You\'re Ready to Code!',
        content: 'Now you know what coding is! Next, let\'s learn how to actually write code and make cool things happen. Ready for more?'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default WhatIsCodingLesson;