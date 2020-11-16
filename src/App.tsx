import React, { FC } from 'react';
import './App.css';

import PersonsList from './components/personsList'
import AddPerson from './components/addPerson/addPerson'
import AddCar from './components/addCar/addCar'


const App: FC = () => {
  return (
    <div className="App">
      <div className="app-container">
        <h1>People and their Cars</h1>
        <AddPerson />
        <AddCar />
        <PersonsList />
      </div>
    </div>
  )
}
export default App;
