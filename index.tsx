import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SLIDES } from './constants';
import { SENIOR_SLIDES } from './constants-senior';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const isSenior = window.location.pathname === '/senior';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App slides={isSenior ? SENIOR_SLIDES : SLIDES} />
  </React.StrictMode>
);