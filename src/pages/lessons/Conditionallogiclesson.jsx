import React from 'react';
import LessonSlide from '../../components/LessonSlide';

const ConditionalLogicLesson = () => {
  const lesson = {
    title: "Conditional Logic",
    slides: [
      {
        type: 'text',
        emoji: '🤔',
        title: 'Welcome to Conditional Logic!',
        content: 'Today you\'ll learn how to make your code THINK and make decisions! Get ready to add "if this, then that" logic to your programs!'
      },
      {
        type: 'image',
        title: 'What are Conditionals?',
        content: 'Conditionals let your code make choices based on different situations. Like a choose-your-own-adventure book, your code can do different things depending on what happens!',
        visual: '❓➡️✅ or ❌',
        caption: 'Ask a question, get different answers!'
      },
      {
        type: 'text',
        emoji: '🌧️',
        title: 'Real Life Example: Weather',
        content: 'Every morning you make a decision: IF it\'s raining ☔, THEN bring an umbrella. ELSE (if not raining) ☀️, THEN wear sunglasses. That\'s conditional logic!'
      },
      {
        type: 'quiz',
        question: 'Which of these is a conditional statement?',
        options: [
          '🚪 If the door is locked, use a key',
          '🚶 Walk forward 10 steps',
          '🔁 Repeat jumping 5 times',
          '👋 Wave hello'
        ],
        correctAnswer: 0,
        explanation: 'Conditionals check a condition (is the door locked?) and do something based on the answer. The others are just regular instructions!'
      },
      {
        type: 'image',
        title: 'Decision Tree: Morning Routine',
        content: 'IF hungry? ➡️ YES: Eat breakfast 🍳 | NO: Skip to getting dressed 👕. Your code can follow different paths just like this!',
        visual: '🤔➡️🍳 / 👕',
        caption: 'Different conditions = Different actions'
      },
      {
        type: 'text',
        emoji: '🎮',
        title: 'Gaming Example',
        content: 'In a game: IF player has key 🔑, THEN open door 🚪. ELSE, show message "You need a key!" That\'s how games make smart decisions!'
      },
      {
        type: 'quiz',
        question: 'You\'re coding a traffic light. What should happen?',
        options: [
          '🚦 Always show green',
          '🚥 IF light is red, THEN stop. IF light is green, THEN go',
          '🔁 Keep changing colors forever',
          '❌ Turn off the light'
        ],
        correctAnswer: 1,
        explanation: 'Traffic lights use conditionals to check the color and tell cars what to do based on that condition!'
      },
      {
        type: 'image',
        title: 'The IF Statement',
        content: 'IF (condition is true) ➡️ DO THIS. It\'s like asking a yes/no question. If the answer is YES, the code inside runs. If NO, it gets skipped!',
        visual: '❓➡️✅➡️▶️',
        caption: 'Ask, check, then act!'
      },
      {
        type: 'text',
        emoji: '↔️',
        title: 'IF...ELSE: Two Choices',
        content: 'Sometimes you want to do something when the answer is NO. That\'s where ELSE comes in! IF sunny ☀️, go to beach. ELSE (if not sunny) 🌧️, stay home and play games.'
      },
      {
        type: 'quiz',
        question: 'Complete this: IF age >= 13, THEN ___. ELSE, ___',
        options: [
          '🎮 Play game, Play game',
          '🔓 Allow access, Show "Too young" message',
          '🎂 Eat cake, Eat cake',
          '❌ Do nothing, Do nothing'
        ],
        correctAnswer: 1,
        explanation: 'Conditionals let you do different things for different situations. If old enough, allow access. If not, show a different message!'
      },
      {
        type: 'image',
        title: 'Multiple Conditions: ELSE IF',
        content: 'What if you have MORE than 2 choices? Use ELSE IF! Like grades: IF score >= 90: A, ELSE IF score >= 80: B, ELSE IF score >= 70: C, ELSE: Try harder!',
        visual: '🅰️ 🅱️ ©️ or 📚',
        caption: 'Many conditions, many paths!'
      },
      {
        type: 'text',
        emoji: '🎯',
        title: 'Choose Your Adventure!',
        content: 'You find a treasure chest 💎. IF you have a key 🔑, open it and get treasure! ELSE IF you have a sword ⚔️, break it open! ELSE, walk away empty-handed. Each choice = different outcome!'
      },
      {
        type: 'quiz',
        question: 'What happens if NONE of the conditions are true?',
        options: [
          '💥 Your program crashes',
          '🔁 It loops forever',
          '🤷 The ELSE block runs (or nothing happens if no ELSE)',
          '🎉 You automatically win'
        ],
        correctAnswer: 2,
        explanation: 'If none of the IF or ELSE IF conditions are true, the ELSE block runs. If there\'s no ELSE, the code just continues!'
      },
      {
        type: 'image',
        title: 'Comparison Operators',
        content: 'To check conditions, we use: == (equals), != (not equals), > (greater than), < (less than), >= (greater or equal), <= (less or equal). These help us compare things!',
        visual: '🔢 > < = ≠',
        caption: 'Tools for checking conditions'
      },
      {
        type: 'text',
        emoji: '🤖',
        title: 'Robot Battle Example',
        content: 'IF robot health > 50: Keep fighting! 💪 ELSE IF robot health > 20: Use shield! 🛡️ ELSE: Run away! 🏃 The robot makes smart decisions based on its health!'
      },
      {
        type: 'quiz',
        question: 'A vending machine: IF money >= price, ___. What should happen?',
        options: [
          '💸 Take the money and do nothing',
          '💰 Give snack and return change',
          '🎰 Start a game',
          '❌ Keep all the money'
        ],
        correctAnswer: 1,
        explanation: 'If you inserted enough money, the machine should give you the snack and return any extra change. That\'s conditional logic in action!'
      },
      {
        type: 'image',
        title: 'Nested Conditionals',
        content: 'You can put IF statements INSIDE other IF statements! Like: IF it\'s weekend, THEN (IF it\'s sunny, THEN go to beach, ELSE watch movies). Conditionals inside conditionals!',
        visual: '🔲➡️🔲➡️✅',
        caption: 'Conditions within conditions!'
      },
      {
        type: 'text',
        emoji: '🎨',
        title: 'Real Coding Example',
        content: 'Drawing app: IF mouse clicked, THEN (IF color is red, draw red line 🔴, ELSE IF color is blue, draw blue line 🔵). Every click makes a decision!'
      },
      {
        type: 'quiz',
        question: 'Why are conditionals important in coding?',
        options: [
          '🎨 They make code look pretty',
          '🧠 They let programs make decisions and respond to different situations',
          '⚡ They make code run faster',
          '📝 They make code shorter'
        ],
        correctAnswer: 1,
        explanation: 'Conditionals give your programs intelligence! They can react differently to different situations, making your code smart and flexible!'
      },
      {
        type: 'image',
        title: 'Logic Flowchart',
        content: 'Coders often draw flowcharts with diamonds 💎 for decisions. Each diamond asks a yes/no question, and arrows show which path to take. It helps plan conditionals!',
        visual: '▶️➡️💎➡️✅/❌',
        caption: 'Visualize your decisions!'
      },
      {
        type: 'celebration',
        title: 'You\'re a Logic Master!',
        content: 'Amazing! You now know how to make your code think and make decisions! Conditionals are everywhere in programming - you\'ll use them in almost every program you write! 🚀'
      }
    ]
  };

  return <LessonSlide lesson={lesson} />;
};

export default ConditionalLogicLesson;