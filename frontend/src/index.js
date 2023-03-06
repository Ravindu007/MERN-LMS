import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LmsUserContextProvider } from './context/LmsUSerContext';
import { SubjectContextProvider } from './context/SubjectContext';
import { AuthContextProvider } from './context/AuthContext';
import { LessonContextProvider } from './context/LessonContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
  <LessonContextProvider>
  <SubjectContextProvider>
    <LmsUserContextProvider>
      <App />
    </LmsUserContextProvider>
  </SubjectContextProvider>
  </LessonContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);

