import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import './index.css';
import { AppProvider } from './context/appContext';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
        <App />
        <ToastContainer position='top-right' />
    </AppProvider>
  </React.StrictMode>
);
  