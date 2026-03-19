import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';

import Cardiology from './pages/Cardiology';
import Diagnostics from './pages/Diagnostics';
import Dental from './pages/Dental';
import Pulmonary from './pages/Pulmonary';
import Laboratory from './pages/Laboratory';
import Clarify from './components/Clarify';

const App = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/diagnostics" element={<Diagnostics />} />
      <Route path="/cardiology" element={<Cardiology />} />
      <Route path="/dental" element={<Dental />} />
      <Route path="/pulmonary" element={<Pulmonary />} />
      <Route path="/laboratory" element={<Laboratory />} />
      <Route path="/appointment" element={<Clarify />} />

    </Routes>
  );
};

export default App;
