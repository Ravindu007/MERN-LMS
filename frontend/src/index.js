import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LmsUserContextProvider } from './context/LmsUSerContext';
import { SubjectContextProvider } from './context/SubjectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SubjectContextProvider>
    <LmsUserContextProvider>
      <App />
    </LmsUserContextProvider>
  </SubjectContextProvider>
  </React.StrictMode>
);

