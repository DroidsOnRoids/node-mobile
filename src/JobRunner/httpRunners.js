// @flow
import type { MinerJobRequest } from '../shared/types/job.types';
import type { Action, Thunk } from '../shared/types/action.types';

import axios from 'axios';

export const httpGet: (data: MinerJobRequest) => any = data => {
  const {
    endpoint_address,
    endpoint_port = '80',
    endpoint_additional_params
  } = data;
  const uri = `${endpoint_address}:${endpoint_port}/${endpoint_additional_params}`;

  return dispatch => {
    axios
      .get(uri)
      .then(console.info)
      .catch(console.error);
  };
};

export const httpPost: (data: MinerJobRequest) => Thunk = data => {};

// export const traceroute: (data: MinerJobRequest) => Thunk = data => {};
//
// export const ping: (data: MinerJobRequest) => Thunk = data => {};
