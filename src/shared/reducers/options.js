// @flow
import { combineReducers } from 'redux';

import { OPTIONS_SUCCESS, OPTIONS_FAILURE } from '../actions/constants';

const initialOptions = {
  walletAddress: '',
  wifi_only: false
};

const userSettings = (state: any = initialOptions, action: any) => {
  switch (action.type) {
    case OPTIONS_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const errorMessage = (state: string = '', action: any) => {
  switch (action.type) {
    case OPTIONS_FAILURE:
      return action.message;
    case OPTIONS_SUCCESS:
      return '';
    default:
      return state;
  }
};

const options = combineReducers({
  userSettings,
  errorMessage
});

export default options;

export const getOptions = (state: any) => state.options;
export const getErrorMessage = (state: any) => state.errorMessage;
