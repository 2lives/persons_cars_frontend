import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store'
import { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
// import { getPersons } from './store/actions/personsActions';

// store.dispatch(getPersons() as any)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
