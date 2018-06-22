// @flow
import type { JobRequest } from '../../types';
import type { Action, Thunk } from './types';

import axios from 'axios';

export const get = (data: JobRequest): Thunk => {
  const {
    endpoint_address,
    endpoint_port = '8080',
    endpoint_additional_params
  } = data;
  const uri = `${endpoint_address}:${endpoint_port}/${endpoint_additional_params}`;
  axios
    .get(uri)
    .then(console.info)
    .catch(console.error);
};

export const post = (data: JobRequest): Thunk => {};

export const traceroute = (data: JobRequest): Thunk => {};

export const ping = (data: JobRequest): Thunk => {};
