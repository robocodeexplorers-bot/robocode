import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

// Interactive Component 1: Code Sequencer with Up/Down Buttons (Works on ALL devices)
export const CodeSequencer = () => {
  const correctOrder = ['Get bread', 'Add peanut butter', 'Add jelly', 'Eat sandwich'];
  const [codeBlocks, setCodeBlocks] = useState([
    'Eat sandwich',
    'Get bread',
    'Add jelly',
    'Add peanut butter'
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return; // Already at top
    const newBlocks = [...codeBlocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    setCodeBlocks(newBlocks);
    setIsChecked(false);
  };

  const moveDown = (index) => {
    if (index === codeBlocks.length - 1) return; // Already at bottom
    const newBlocks = [...codeBlocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setCodeBlocks(newBlocks);
    setIsChecked(false);
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(codeBlocks) === JSON.stringify(correctOrder);
    setIsCorrect(correct);
    setIsChecked(true);
  };

  const reset = () => {
    setCodeBlocks(['Eat sandwich', 'Get bread', 'Add jelly', 'Add peanut butter']);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        🥪 Fix the Sequence! Reorder the Steps
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Use the ⬆️ and ⬇️ buttons to put these steps in the correct order
      </p>
      
      <div className="space-y-3 mb-6">
        {codeBlocks.map((block, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border-2 border-gray-300 shadow-sm flex items-center gap-3"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded transition-colors ${
                  index === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#2364aa] hover:bg-[#2364aa] hover:text-white'
                }`}
                aria-label="Move up"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === codeBlocks.length - 1}
                className={`p-1 rounded transition-colors ${
                  index === codeBlocks.length - 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#2364aa] hover:bg-[#2364aa] hover:text-white'
                }`}
                aria-label="Move down"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <span className="font-semibold text-gray-800 flex-1">{index + 1}. {block}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={checkAnswer}
          className="flex-1 bg-[#2364aa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-colors"
        >
          Check Answer
        </button>
        <button
          onClick={reset}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {isChecked && (
        <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <Check className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-700">Perfect! That's the right sequence! 🎉</span>
              </>
            ) : (
              <>
                <X className="w-6 h-6 text-red-600" />
                <span className="font-bold text-red-700">Not quite! Think about the ORDER. Try again!</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Interactive Component 2: Spot the Bug (Clickable Code Lines)
export const BugSpotter = () => {
  const codeLines = [
    { text: 'Repeat 10 times:', hasBug: false },
    { text: '  Move forward', hasBug: false },
    { text: '  Turn left', hasBug: true },
    { text: '  Turn left', hasBug: false },
    { text: '  Move forward', hasBug: false }
  ];

  const [selectedLine, setSelectedLine] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleLineClick = (index) => {
    setSelectedLine(index);
    setShowFeedback(true);
  };

  const reset = () => {
    setSelectedLine(null);
    setShowFeedback(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        🔍 Spot the Bug!
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Goal: Move forward, turn RIGHT, turn LEFT, move forward. Click the buggy line!
      </p>

      <div className="bg-gray-900 p-6 rounded-xl mb-4 font-mono">
        {codeLines.map((line, index) => (
          <div
            key={index}
            onClick={() => !showFeedback && handleLineClick(index)}
            className={`py-2 px-3 rounded cursor-pointer transition-all ${
              selectedLine === index
                ? line.hasBug
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {showFeedback && (
        <>
          {codeLines[selectedLine]?.hasBug ? (
            <div className="p-4 bg-green-100 border-2 border-green-500 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-700">Found it! 🎉</span>
              </div>
              <p className="text-green-700">
                The bug is "Turn left" twice! To turn right, you only turn left ONCE. Two left turns = backwards!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-100 border-2 border-red-500 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <X className="w-6 h-6 text-red-600" />
                <span className="font-bold text-red-700">Not quite!</span>
              </div>
              <p className="text-red-700">
                That line is fine. Look at the turn instructions - we want to turn RIGHT!
              </p>
            </div>
          )}
          <button
            onClick={reset}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

// Interactive Component 3: Code Fixer (Click to Fix)
export const CodeFixer = () => {
  const [isFixed, setIsFixed] = useState(false);

  const buggyCode = `Repeat 5 times:
  Print "Hello"
  Print "Goodbye"`;

  const fixedCode = `Repeat 5 times:
  Print "Hello"
Print "Goodbye"`;

  const handleFix = () => {
    setIsFixed(true);
  };

  const reset = () => {
    setIsFixed(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        🔧 Fix the Code!
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Goal: Print "Hello" 5 times, then "Goodbye" once
      </p>

      <div className="bg-gray-900 p-6 rounded-xl mb-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-red-400 font-bold">❌ BUGGY:</span>
        </div>
        <pre className="text-gray-300 font-mono text-sm whitespace-pre">{buggyCode}</pre>
      </div>

      {!isFixed ? (
        <button
          onClick={handleFix}
          className="w-full bg-[#2364aa] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-colors mb-4"
        >
          Click to See the Fix! 🔧
        </button>
      ) : (
        <>
          <div className="bg-gray-900 p-6 rounded-xl mb-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-green-400 font-bold">✓ FIXED:</span>
            </div>
            <pre className="text-gray-300 font-mono text-sm whitespace-pre">{fixedCode}</pre>
          </div>

          <div className="p-4 bg-green-100 border-2 border-green-500 rounded-xl mb-4">
            <p className="text-green-700 font-semibold mb-2">What Changed?</p>
            <p className="text-green-700">
              The "Goodbye" line was INSIDE the loop (indented). Moving it outside (removing indent) makes it run AFTER the loop finishes, so it only prints once! 🎉
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Hide Solution
          </button>
        </>
      )}
    </div>
  );
};