// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import createInitState from './createInitState';

const reduxStore = async () => {
  const initialState = await createInitState();

  return createStore(reducers, initialState, applyMiddleware(thunk));
};

export default reduxStore;
