import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigation';
import placesReducer from './store/places-reducer';

import { init } from './helpers/db'

init()
  .then(() => {
    console.log('db init')
  }).catch(err => {
    console.log('db init fail')
    console.log(err)
  });

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

