// App.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Upload from './components/Upload';
import FileList from './components/FileList';
import FolderList from './components/FolderList';



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
                  <Route path="/Upload" element={<Upload />} />
                  <Route path="/files" element={<FileList />} />
                  <Route path="/folders" element={<FolderList />} />
              </Routes>
          </div>
      );
  }
}

export default App;
