import { createRoot } from 'react-dom/client';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
