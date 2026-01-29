import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowRight, Home } from 'lucide-react';

const AllChallengesPage = () => {
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
              <Link to="/challenges" className="text-[#2364aa] font-semibold">
                All Challenges
              </Link>
              <Link to="/lessons" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
                Lessons
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
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
            All Challenges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a challenge and start coding! Each challenge teaches new concepts and builds on what you've learned.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allChallenges.map((challenge) => (
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

const allChallenges = [
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

export default AllChallengesPage;