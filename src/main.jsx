import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoginProvider } from './context/LoginContext'; // ✅ Use this
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
