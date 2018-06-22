// @flow
import { has } from 'lodash';

import {
  receiveJob,
  submitJobSuccess,
  minerSetId,
  serverError
} from '../shared/actions/socketClient';

import { getDevice } from '../shared/reducers/';

import uuid4 from '../shared/helpers/uuid4';

import messageTypes from './constants';

export const createCheckInMsg = () => {
  // get lat long

  // get miner_id

  return {
    type: messageTypes.MINER_CHECK_IN,
    id: uuid4(),
    miner_id: '',
    wallet: '0xsuyadgusaydguasydgasuyd',
    device_type: 'ios'
  };
};

export const handleMessage: (data: any, dispatch: any) => void = (
  data,
  dispatch
) => {
  const { type } = data;

  switch (type) {
    case messageTypes.RECEIVE_JOB:
      dispatch(receiveJob(data));

      // respond with ack
      break;
    case messageTypes.SERVER_ACK:
      // TODO place 'miner_id' in some form of constant?
      if (has(data, 'miner_id')) {
        dispatch(minerSetId(data));
      } else {
        dispatch(submitJobSuccess(data));
      }

      break;
    case messageTypes.SERVER_ERROR:
      dispatch(serverError(data));
      break;
  }
};
