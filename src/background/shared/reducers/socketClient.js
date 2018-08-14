// @flow
import { combineReducers } from 'redux';

import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_SET_MINER_ID,
  SOCKET_CHECK_IN,
  SOCKET_RECEIVE_JOB,
  SOCKET_JOB_RESULTS,
  SOCKET_SERVER_ERROR
} from '../actions/constants';

// ------------------------------------
// Socket connection
//
const socketConnected = (state: boolean = false, action: any) => {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return true;
    case SOCKET_DISCONNECTED:
      return false;
    default:
      return state;
  }
};

const socketErrorMessage = (state: string = '', action: any) => {
  switch (action.type) {
    case SOCKET_SERVER_ERROR:
      return action.description;
    case SOCKET_CHECK_IN:
    case SOCKET_RECEIVE_JOB:
    case SOCKET_SET_MINER_ID:
    case SOCKET_CONNECTED:
    case SOCKET_DISCONNECTED:
      return '';
    default:
      return state;
  }
};

// ------------------------------------
// Socket init
//
const initialSocketCheckIn = {
  id: '',
  wallet: '',
  device_type: ''
};

const socketCheckIn = (state: any = initialSocketCheckIn, action: any) => {
  switch (action.type) {
    case SOCKET_CHECK_IN:
      return action.device;
    case SOCKET_SET_MINER_ID:
      return {
        ...state,
        miner_id: action.minerId
      };
    default:
      return state;
  }
};

// ------------------------------------
// Socket receive job
//
const initialSocketReceiveJob = {
  id: '',
  type: '',
  job_type: '',
  protocol: '',
  method: '',
  headers: {},
  payload: '',
  endpoint_address: '',
  endpoint_port: '',
  endpoint_additional_params: '',
  polling_interval: 0,
  degraded_after: 0,
  critical_after: 0,
  critical_responses: {},
  job_uuid: ''
};

const socketReceiveJob = (
  state: any = initialSocketReceiveJob,
  action: any
) => {
  switch (action.type) {
    case SOCKET_RECEIVE_JOB:
      return action.jobData;
    default:
      return state;
  }
};

// ------------------------------------
// Socket submit job
//
const initialSocketSubmitJobResults = {
  id: '',
  job_uuid: '',
  status: '',
  response_time: -1
};

const socketSubmitJobResults = (
  state: any = initialSocketSubmitJobResults,
  action: any
) => {
  switch (action.type) {
    case SOCKET_JOB_RESULTS:
      return action.results;
    default:
      return state;
  }
};

const socketClient = combineReducers({
  socketConnected,
  socketCheckIn,
  socketErrorMessage,
  socketReceiveJob,
  socketSubmitJobResults
});

export default socketClient;

export const getSocketConnected = (state: any) => state.socketConnected;
export const getSocketCheckIn = (state: any) => state.socketCheckIn;
export const getSocketErrorMessage = (state: any) => state.socketErrorMessage;
export const getSocketReceiveJob = (state: any) => state.socketReceiveJob;
export const getSocketSubmitJobResults = (state: any) =>
  state.socketSubmitJobResults;
