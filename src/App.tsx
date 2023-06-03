import UsersList from './components/UsersList';
import { ReactElement } from 'react';
import './App.css';

function App(): ReactElement {
  return (
    <div className="container mx-auto">
      <UsersList />
    </div>
  );
}

export default App;
