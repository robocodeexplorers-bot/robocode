import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Rocket, Zap, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header/Nav */}
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
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link 
          to="/challenges" 
          className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors"
        >
          All Challenges
        </Link>
        <Link 
          to="/lessons" 
          className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors"
        >
          Lessons
        </Link>
        <Link 
          to="/contact" 
          className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
      </button>
    </div>

    {/* Mobile Menu Dropdown */}
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
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="bg-[#3da5d9]/20 text-[#2364aa] px-4 py-2 rounded-full text-sm font-semibold">
              Perfect for ages 8-14
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Learn to Code by
            <span className="text-[#2364aa]">
              {" "}Programming Robots
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Build your coding skills through fun, interactive robot challenges. 
            Start with visual blocks, then level up to real code when you're ready!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/challenge/1"
              className="w-full sm:w-auto bg-[#2364aa] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1a4d7f] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Start First Challenge
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#challenges"
              className="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-[#3da5d9] hover:shadow-lg transition-all duration-300"
            >
              Browse All Challenges
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 sm:mt-20">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#2364aa]/10 rounded-xl flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-[#2364aa]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Coding</h3>
            <p className="text-gray-600">
              Start with drag-and-drop blocks. No typing required - just focus on learning logic!
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#3da5d9]/10 rounded-xl flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-[#3da5d9]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">See It Run</h3>
            <p className="text-gray-600">
              Watch your robot come to life! Instant feedback shows you exactly what your code does.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#fec601]/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#fec601]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Level Up</h3>
            <p className="text-gray-600">
              Ready for more? Switch to text mode and see the real JavaScript behind your blocks!
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Preview Section */}
      <section id="challenges" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Your Coding Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each challenge teaches new concepts. No login required - jump in and start learning!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Link
              key={challenge.id}
              to={`/challenge/${challenge.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              <div className={`h-2 ${challenge.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-500">
                    Challenge {challenge.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${challenge.difficultyColor}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2364aa] transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {challenge.description}
                </p>
                <div className="flex items-center text-[#2364aa] font-semibold text-sm">
                  Start Challenge
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

// Sample challenge data - using your color scheme
const challenges = [
  {
    id: 1,
    title: "First Steps",
    description: "Make your robot move forward and reach the target!",
    difficulty: "Beginner",
    difficultyColor: "bg-[#73bfb8]/20 text-[#73bfb8]",
    color: "bg-[#73bfb8]"
  },
  {
    id: 2,
    title: "Turn Around",
    description: "Learn to turn your robot left and right to navigate corners.",
    difficulty: "Beginner",
    difficultyColor: "bg-[#73bfb8]/20 text-[#73bfb8]",
    color: "bg-[#73bfb8]"
  },
  {
    id: 3,
    title: "Collect Stars",
    description: "Pick up all the stars scattered around the map!",
    difficulty: "Easy",
    difficultyColor: "bg-[#3da5d9]/20 text-[#3da5d9]",
    color: "bg-[#3da5d9]"
  },
  {
    id: 4,
    title: "Loops Basics",
    description: "Use loops to repeat actions efficiently.",
    difficulty: "Easy",
    difficultyColor: "bg-[#3da5d9]/20 text-[#3da5d9]",
    color: "bg-[#3da5d9]"
  },
  {
    id: 5,
    title: "Obstacle Course",
    description: "Navigate around walls using smart pathfinding.",
    difficulty: "Medium",
    difficultyColor: "bg-[#fec601]/20 text-[#fec601]",
    color: "bg-[#fec601]"
  },
  {
    id: 6,
    title: "Conditional Thinking",
    description: "Make decisions with if/else statements.",
    difficulty: "Medium",
    difficultyColor: "bg-[#ea7317]/20 text-[#ea7317]",
    color: "bg-[#ea7317]"
  }
];

export default HomePage;