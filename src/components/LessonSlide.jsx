import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Code } from 'lucide-react';

const LessonSlide = ({ lesson }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const slide = lesson.slides[currentSlide];
  const isLastSlide = currentSlide === lesson.slides.length - 1;
  const progress = ((currentSlide + 1) / lesson.slides.length) * 100;

  const handleNext = () => {
    if (isLastSlide) {
      // Lesson complete!
      navigate('/lessons');
    } else {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizAnswer = (answer) => {
    setAnswers({ ...answers, [currentSlide]: answer });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/lessons" className="flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Lessons</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2364aa]">RoboCode</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-600">{lesson.title}</h2>
            <span className="text-sm font-semibold text-[#2364aa]">
              {currentSlide + 1} / {lesson.slides.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#2364aa] to-[#3da5d9] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 min-h-[500px] flex flex-col">
          {/* Slide Type: Text */}
          {slide.type === 'text' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {slide.emoji && (
                <div className="text-7xl mb-6 animate-bounce">
                  {slide.emoji}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {slide.content}
              </p>
            </div>
          )}

          {/* Slide Type: Image */}
          {slide.type === 'image' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                {slide.content}
              </p>
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 w-full max-w-md">
                  <div className="text-6xl text-center mb-4">{slide.visual}</div>
                  {slide.caption && (
                    <p className="text-center text-gray-600 font-semibold">{slide.caption}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Slide Type: Quiz */}
          {slide.type === 'quiz' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
                {slide.question}
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">Pick the best answer!</p>
              <div className="space-y-4 max-w-2xl mx-auto w-full">
                {slide.options.map((option, index) => {
                  const isSelected = answers[currentSlide] === index;
                  const isCorrect = index === slide.correctAnswer;
                  const showResult = isSelected;

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={answers[currentSlide] !== undefined}
                      className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                        showResult && isCorrect
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : showResult && !isCorrect
                          ? 'bg-red-100 border-2 border-red-500 text-red-700'
                          : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrect && <Check className="w-6 h-6 text-green-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {answers[currentSlide] !== undefined && (
                <div className="mt-6 text-center">
                  <p className="text-lg font-semibold text-[#2364aa]">
                    {answers[currentSlide] === slide.correctAnswer ? '🎉 Correct!' : '💪 Good try!'}
                  </p>
                  <p className="text-gray-600 mt-2">{slide.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Slide Type: Interactive */}
          {slide.type === 'interactive' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                {slide.content}
              </p>
              <div className="flex-1 flex items-center justify-center">
                {slide.component}
              </div>
            </div>
          )}

          {/* Slide Type: Celebration */}
          {slide.type === 'celebration' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-8xl mb-6 animate-bounce">
                🎉
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
                {slide.content}
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/lessons"
                  className="bg-[#2364aa] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1a4d7f] transition-all"
                >
                  More Lessons
                </Link>
                <Link 
                  to="/challenges"
                  className="bg-[#73bfb8] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#5a9a93] transition-all"
                >
                  Try Challenges
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={slide.type === 'quiz' && answers[currentSlide] === undefined}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#2364aa] text-white hover:bg-[#1a4d7f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastSlide ? 'Finish' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSlide;