// Initialize the global store
import { createStore, applyMiddleware } from 'redux'

// Middlewares
import promiseMiddleware from 'redux-promise-middleware';

// Reducers
import Reducer from '../reducers/reducer';

// Return the store
export default createStore(
  Reducer,
  applyMiddleware(promiseMiddleware())
);
