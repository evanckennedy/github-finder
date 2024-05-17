import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter as Router } from 'react-router-dom';
import './style/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
