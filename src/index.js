import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AppDieter from './dieter/AppDieter';
import App from './culinaryMate/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/culinaryMate/*" element={<App />} />
        <Route path="/*" element={<AppDieter />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
