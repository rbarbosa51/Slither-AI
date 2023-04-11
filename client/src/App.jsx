import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/App.scss';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
