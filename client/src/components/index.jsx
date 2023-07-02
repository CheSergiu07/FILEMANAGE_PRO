import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Configurarea middleware-ului CORS
axios.defaults.baseURL = 'http://localhost:3001'; // Setează baza URL-ului pentru cererile Axios
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; // Setează tipul de conținut pentru cererile POST

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
