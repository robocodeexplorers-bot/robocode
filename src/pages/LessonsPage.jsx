import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Video, FileText, Home } from 'lucide-react';

const LessonsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
   <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
          <Code className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-[#2364aa]">
          RoboCode
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6">
        <Link to="/challenges" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
          All Challenges
        </Link>
        <Link to="/lessons" className="text-[#2364aa] font-semibold">
          Lessons
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
          Contact Us
        </Link>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
      </button>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden mt-4 pb-4 space-y-2">
        <Link 
          to="/challenges" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
        >
          All Challenges
        </Link>
        <Link 
          to="/lessons" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-[#2364aa] bg-gray-100 rounded-lg font-semibold"
        >
          Lessons
        </Link>
        <Link 
          to="/contact" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
        >
          Contact Us
        </Link>
      </div>
    )}
  </div>
</nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] mb-4 font-semibold">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Coding Lessons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn coding concepts step-by-step with our interactive mini-lessons. Perfect for beginners!
          </p>
        </div>

        {/* Lessons Grid */}
     {/* Lessons Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {lessons.map((lesson) => {
    const isAvailable = lesson.id === 1; // Only first lesson is available
    const Component = isAvailable ? Link : 'div';
    
    return (
      <Component
        key={lesson.id}
        to={isAvailable ? '/lessons/what-is-coding' : undefined}
        className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group ${
          !isAvailable ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <div className={`w-12 h-12 ${lesson.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          {lesson.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{lesson.duration}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lesson.levelColor}`}>
            {lesson.level}
          </span>
        </div>
        <button 
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition-colors ${
            isAvailable 
              ? 'bg-[#2364aa] text-white hover:bg-[#1a4d7f]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Start Lesson' : 'Coming Soon'}
        </button>
      </Component>
    );
  })}
</div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-12">
          <BookOpen className="w-16 h-16 text-[#2364aa] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">More Lessons Coming Soon!</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We're working on more interactive coding lessons. Stay tuned for updates on variables, functions, and advanced programming concepts!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2364aa]">
                RoboCode
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Making coding fun and accessible for kids everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const lessons = [
  {
    id: 1,
    title: "What is Coding?",
    description: "Learn the basics of programming and why it's important.",
    duration: "5 min",
    level: "Beginner",
    levelColor: "bg-[#73bfb8]/20 text-[#73bfb8]",
    icon: <BookOpen className="w-6 h-6 text-[#2364aa]" />,
    iconBg: "bg-[#2364aa]/10"
  },
  {
    id: 2,
    title: "Sequences",
    description: "Understanding the order of instructions in code.",
    duration: "8 min",
    level: "Beginner",
    levelColor: "bg-[#73bfb8]/20 text-[#73bfb8]",
    icon: <FileText className="w-6 h-6 text-[#3da5d9]" />,
    iconBg: "bg-[#3da5d9]/10"
  },
  {
    id: 3,
    title: "Loops & Repetition",
    description: "Learn how to repeat code efficiently using loops.",
    duration: "10 min",
    level: "Easy",
    levelColor: "bg-[#3da5d9]/20 text-[#3da5d9]",
    icon: <Video className="w-6 h-6 text-[#73bfb8]" />,
    iconBg: "bg-[#73bfb8]/10"
  },
  {
    id: 4,
    title: "Conditional Logic",
    description: "Make decisions in your code with if/else statements.",
    duration: "12 min",
    level: "Easy",
    levelColor: "bg-[#3da5d9]/20 text-[#3da5d9]",
    icon: <BookOpen className="w-6 h-6 text-[#fec601]" />,
    iconBg: "bg-[#fec601]/10"
  },
  {
    id: 5,
    title: "Debugging",
    description: "Find and fix errors in your code like a pro.",
    duration: "10 min",
    level: "Medium",
    levelColor: "bg-[#fec601]/20 text-[#fec601]",
    icon: <Code className="w-6 h-6 text-[#ea7317]" />,
    iconBg: "bg-[#ea7317]/10"
  },
  {
    id: 6,
    title: "Problem Solving",
    description: "Break down complex problems into simple steps.",
    duration: "15 min",
    level: "Medium",
    levelColor: "bg-[#ea7317]/20 text-[#ea7317]",
    icon: <FileText className="w-6 h-6 text-[#2364aa]" />,
    iconBg: "bg-[#2364aa]/10"
  },
];

export default LessonsPage;