import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import './index.css';

// Set axios Authorization header from storage on app boot
try {
  const bootToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (bootToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${bootToken}`;
    // eslint-disable-next-line no-console
    console.debug('[main] Boot token present, Authorization header set');
  }
} catch {}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
