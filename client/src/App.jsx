// App.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

class App extends React.Component {
  render() {
      return (
          <div>
              <h1>Hello, world!</h1>
              <Navigation />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
              </Routes>
          </div>
      );
  }
}

export default App;
