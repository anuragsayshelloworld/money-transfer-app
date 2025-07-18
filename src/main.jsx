import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/LoginContext';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <App/>
    </GoogleOAuthProvider> 
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
