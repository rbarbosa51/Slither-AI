import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/App.scss';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
  return (
    <>
      <NavBar />
      <Footer />
    </>
  );
}

export default App
