import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import GlobalMap from './pages/GlobalMap';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-text-main">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classify" element={<Upload />} />
            <Route path="/map" element={<GlobalMap />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
