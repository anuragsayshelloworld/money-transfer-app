import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginContext from './context/LoginContext';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainProvider() {
  const [logger, setLogger] = useState('');

  return (
    <LoginContext.Provider value={{ logger, setLogger }}>
      <App />
    </LoginContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainProvider />
  </React.StrictMode>
);
