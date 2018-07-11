// @flow

import type {
  Ack,
  CheckIn,
  DeviceOS,
  JobResult
} from '../shared/types/messages.types';

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
  device_type: DeviceOS,
  wallet: string,
  lat: string,
  lng: string
) => CheckIn = (device_type, wallet, lat, lng) => {
  if (lat !== '') {
    return {
      type: MINER_CHECK_IN,
      id: uuid4(),
      device_type,
      wallet
    };
  } else {
    return {
      type: MINER_CHECK_IN,
      id: uuid4(),
      device_type,
      wallet
    };
  }
};

export const createAckMsg: (msg_id: string) => Ack = msg_id => {
  // get id from previous message
  return {
    id: msg_id,
    type: SERVER_ACK
  };
};

export const createJobResultMsg: (result: Object) => JobResult = result => {
  return {
    id: uuid4(),
    type: SUBMIT_JOB,
    ...result
  };
};
