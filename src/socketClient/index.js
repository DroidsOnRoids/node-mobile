// @flow
import type { Store } from 'redux';
import {
  socketConnected,
  socketDisconnected,
  receiveJob,
  submitJobSuccess,
  minerSetId,
  serverError,
  serverPing,
  serverPong
} from '../shared/actions/socketClient';

import {
  MINER_CHECK_IN,
  RECEIVE_JOB,
  SUBMIT_JOB,
  SERVER_ACK,
  SERVER_PONG,
  SERVER_ERROR
} from './constants';

import { getDevice } from '../shared/reducers';

import { has } from 'lodash';

const socketURL =
  'ws://devCluster-default-jobsapi-3bfa-787513993.us-west-2.elb.amazonaws.com/ws';

const handleMessage = (data, dispatch) => {
  const { type } = data;

  // TODO parse data

  switch (type) {
    case RECEIVE_JOB:
      dispatch(receiveJob(data));

      break;
    case SERVER_ACK:
      if (has(data, 'miner_id')) {
        dispatch(minerSetId(data));
      } else {
        dispatch(submitJobSuccess(data));
      }

      break;
    case SERVER_ERROR:
      dispatch(serverError(data));
      break;
  }
};

const socketClient: (store: Store) => void = store => {
  const { dispatch } = store;

  // map websocket 'readyState' to redux somehow?
  const socket = new WebSocket(socketURL);

  socket.onopen = e => {
    console.log('CONNECTED TO ELIXR');
    dispatch(socketConnected());

    // now we're connected, get the device info
    //const deviceData = getDevice();

    // emit initialisation message
    //socket.send('{"nah":"yeah"}');
  };

  socket.onmessage = event => {
    const data = event.data;
    // required for flow
    if (typeof data === 'string') {
      handleMessage(JSON.parse(data), dispatch);
    }
  };

  socket.onerror = event => {
    console.log('SOCKET CONNECTION ERROR');
  };

  socket.onclose = event => {
    console.log('SOCKET CONNECTION CLOSED');
    dispatch(socketDisconnected());
  };
};

export default socketClient;
