import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateContextProvider } from './Contexts/index.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContextProvider>
    <App />
  </StateContextProvider>
);
