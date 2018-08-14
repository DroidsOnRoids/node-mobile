// @flow
import { has } from 'lodash';

import uuid4 from '../shared/helpers/uuid4';

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

type Coords = {
  lat: string,
  lon: string
};

export const createCheckInMsg: (
  device_type: DeviceOS,
  wallet: string,
  coords: Coords
) => CheckIn = (device_type, wallet, coords) => {
  if (has(coords, 'lat') && has(coords, 'lon')) {
    return {
      type: MINER_CHECK_IN,
      id: uuid4(),
      lat: coords.lat,
      lon: coords.lon,
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
