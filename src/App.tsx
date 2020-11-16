import React, { FC } from 'react';
import './App.css';

import PersonsList from './components/personsList'
import AddPerson from './components/addPerson/addPerson'


const App: FC = () => {
  return (
    <div className="App">
      <div className="app-container">
        <h1>People and their Cars</h1>
        <AddPerson />
        <PersonsList />
      </div>
    </div>
  )
}
export default App;
