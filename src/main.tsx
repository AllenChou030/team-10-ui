// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import AuthProvider from './contexts/AuthContext';
import { PatientsProvider } from './contexts/PatientsContext';
import awsconfig from './aws-exports'; // Should be the Amplify configuration file

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <PatientsProvider>
        <App />
      </PatientsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
