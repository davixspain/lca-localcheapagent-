import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { jsx } from 'react/jsx-runtime';
import App from './App.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(jsx(StrictMode, { children: jsx(App, {}) }));
