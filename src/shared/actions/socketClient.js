// @flow
import type { JobRequest } from '../../types';
import type { Action, Thunk } from './types';

import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_SET_MINER_ID,
  SOCKET_CHECK_IN,
  SOCKET_RECEIVE_JOB,
  SOCKET_JOB_RESULTS,
  SOCKET_SERVER_ERROR,
  SOCKET_PING,
  SOCKET_PONG
} from './constants';

export const socketConnected: () => any = () => ({
  type: SOCKET_CONNECTED
});

export const socketDisconnected: () => any = () => ({
  type: SOCKET_DISCONNECTED
});

export const receiveJob = ({ jobData }): Thunk => {
  const { method, protocol } = jobData;
};

export const submitJobSuccess: (data: any) => any = ({ results }) => ({
  type: SOCKET_JOB_RESULTS,
  results
});

export const minerCheckIn: (data: any) => any = ({
  deviceId,
  asn,
  lat,
  lng
}) => ({
  type: SOCKET_CHECK_IN,
  deviceId,
  asn,
  lat,
  lng
});

export const minerSetId: (data: any) => any = ({ deviceId }) => ({
  type: SOCKET_SET_MINER_ID,
  deviceId
});

export const serverError: (data: any) => any = ({ message }) => ({
  type: SOCKET_SERVER_ERROR,
  message
});

export const serverPing: (data: any) => any = data => ({
  type: SOCKET_PING
});

export const serverPong: (data: any) => any = data => ({
  type: SOCKET_PONG
});
