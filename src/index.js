import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/css/index.css';

import App from './App';

import Web3Provider from './components/Web3Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
