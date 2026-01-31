import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChallengePage from './pages/ChallengePage';
import AllChallengesPage from './pages/AllChallengesPage';
import LessonsPage from './pages/LessonsPage';
import ContactPage from './pages/ContactPage';
import WhatIsCodingLesson from './pages/lessons/WhatIsCodingLesson';
import SequencesLesson from './pages/lessons/SequencesLesson';
import LoopsLesson from './pages/lessons/LoopsLesson';
import ConditionalLogicLesson from './pages/lessons/Conditionallogiclesson';
import DebuggingLesson from './pages/lessons/Debugginglesson';
import ProblemSolvingLesson from './pages/lessons/Problemsolvinglesson';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
        <Route path="/challenges" element={<AllChallengesPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/what-is-coding" element={<WhatIsCodingLesson />} />
        <Route path="/lessons/sequences" element={<SequencesLesson />} /> 
        <Route path="/lessons/loops" element={<LoopsLesson />} />
        <Route path="/lessons/conditional-logic" element={<ConditionalLogicLesson />} />
        <Route path="/lessons/debugging" element={<DebuggingLesson />} />
        <Route path="/lessons/problem-solving" element={<ProblemSolvingLesson />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;