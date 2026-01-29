import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChallengePage from './pages/ChallengePage';
import AllChallengesPage from './pages/AllChallengesPage';
import LessonsPage from './pages/LessonsPage';
import ContactPage from './pages/ContactPage';
import WhatIsCodingLesson from './pages/lessons/WhatIsCodingLesson';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
        <Route path="/challenges" element={<AllChallengesPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/what-is-coding" element={<WhatIsCodingLesson />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;