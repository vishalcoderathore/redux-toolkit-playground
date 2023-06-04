import { createRoot } from 'react-dom/client';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import React from 'react';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
