// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Upload from './components/Upload';
import FileList from './components/FileList';
import FolderList from './components/FolderList';
import UploadPage from './components/UploadPage';

const App = () => {
  return (
    <Router>
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
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
