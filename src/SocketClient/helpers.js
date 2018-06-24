// @flow

import type { Ack, CheckIn, DeviceOS } from '../shared/types/messages.types';

import {
  receiveJob,
  submitJobSuccess,
  minerSetId,
  serverError
} from '../shared/actions/socketClient';

import {
  MINER_CHECK_IN,
  RECEIVE_JOB,
  SUBMIT_JOB,
  SERVER_ACK,
  SERVER_ERROR
} from './constants';

import uuid4 from '../shared/helpers/uuid4';

export const createCheckInMsg: (
  miner_id: string,
  device_type: DeviceOS,
  wallet: string
) => CheckIn = (miner_id, device_type, wallet) => {
  return {
    type: MINER_CHECK_IN,
    id: uuid4(),
    miner_id,
    wallet,
    device_type
  };
};

export const createAckMsg: (msg_id: string) => Ack = msg_id => {
  // get id from previous message
  return {
    id: msg_id,
    type: SERVER_ACK
  };
};

export const createJobResultMsg = () => {
  return {
    type: SUBMIT_JOB
  };
};
