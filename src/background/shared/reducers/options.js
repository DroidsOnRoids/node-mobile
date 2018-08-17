// @flow
import { combineReducers } from 'redux';

import { OPTIONS_UPDATE_WALLET, OPTIONS_FAILURE } from '../actions/constants';

const wallet = (state: string = '', action: any) => {
  switch (action.type) {
    case OPTIONS_UPDATE_WALLET:
      return action.wallet;
    default:
      return state;
  }
};

const errorMessage = (state: string = '', action: any) => {
  switch (action.type) {
    case OPTIONS_FAILURE:
      return action.message;
    case OPTIONS_UPDATE_WALLET:
      return '';
    default:
      return state;
  }
};

const options = combineReducers({
  wallet,
  errorMessage
});

export default options;

export const getOptions = (state: any) => state.options;
export const getErrorMessage = (state: any) => state.errorMessage;
