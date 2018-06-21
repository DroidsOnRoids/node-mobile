// @flow
import { combineReducers } from 'redux';

import { DEVICE_INFO_SUCCESS, DEVICE_INFO_FAILURE } from '../actions/constants';

const initialInfo = {
  miner_id: '',
  cidr: '',
  asn: '',
  lat: '',
  lon: ''
};

const info = (state: any = initialInfo, action: any) => {
  switch (action.type) {
    case DEVICE_INFO_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const errorMessage = (state: string = '', action: any) => {
  switch (action.type) {
    case DEVICE_INFO_FAILURE:
      return action.message;
    case DEVICE_INFO_SUCCESS:
      return '';
    default:
      return state;
  }
};

const device = combineReducers({
  info,
  errorMessage
});

export default device;

export const getInfo = (state: any) => state.info;
export const getErrorMessage = (state: any) => state.errorMessage;
