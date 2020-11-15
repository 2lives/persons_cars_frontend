import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootStore } from './store'
import { getPersons } from './actions/personsAndCarsActions'

function App() {
  const dispatch = useDispatch()
  const personsState = useSelector((state: RootStore) => state.persons)
  // dispatch(getPersons)
  console.log('personsState:', personsState)
  const handleClick = () => dispatch(getPersons)
  return (
    <div className="App">
      <p>hi</p>
      <button onClick={handleClick}>plz</button>
    </div>
  );
}

export default App;
