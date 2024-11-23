import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import AuthProvider from './contexts/AuthContext';
import { PatientsProvider } from './contexts/PatientsContext';
import awsconfig from './aws-exports'; // Amplify configuration file
import { AmplifyConfig } from '@aws-amplify/core';

// Ensure awsconfig has the right type
const amplifyConfig: AmplifyConfig = awsconfig;

// Configure Amplify
Amplify.configure(amplifyConfig);

// Ensure `document.getElementById('root')` is not null
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <AuthProvider>
            <PatientsProvider>
                <App />
            </PatientsProvider>
        </AuthProvider>
    </React.StrictMode>
);
