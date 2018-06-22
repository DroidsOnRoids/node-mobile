// @flow
import { combineReducers } from 'redux';

import {
  DEVICE_SET_LOCATION,
  DEVICE_SET_MINER_ID,
  DEVICE_SET_DEVICE_TYPE
} from '../actions/constants';

const initialInfo = {
  miner_id: '',
  device_type: ''
};

const info = (state: any = initialInfo, action: any) => {
  switch (action.type) {
    case DEVICE_SET_LOCATION:
      const { lat, lng } = action.data;
      return {
        ...state,
        lat,
        lng
      };
    case DEVICE_SET_MINER_ID:
      const { miner_id } = action;
      return {
        ...state,
        miner_id
      };
    case DEVICE_SET_DEVICE_TYPE:
      const { device_type } = action;
      return {
        ...state,
        device_type
      };
    default:
      return state;
  }
};

const device = combineReducers({
  info
});

export default device;

export const getInfo = (state: any) => state.info;
