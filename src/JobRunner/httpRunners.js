// @flow
import type { MinerJobRequest, Status } from '../shared/types/job.types';
import type { Action, Thunk } from '../shared/types/action.types';

import { jobResultSuccess, jobResultFailure } from '../shared/actions/job';

import axios from 'axios';

const generateEndpoint: (data: MinerJobRequest) => string = data => {
  const {
    endpoint_address,
    endpoint_port = '80',
    endpoint_additional_params = ''
  } = data;

  return `${endpoint_address}:${endpoint_port}/${endpoint_additional_params}`;
};

const getStatus: (responseTime: number, jobData: MinerJobRequest) => Status = (
  responseTime,
  jobData
) => {
  if (responseTime >= jobData.critical_after) {
    return 'critical';
  } else if (responseTime >= jobData.degraded_after) {
    return 'degraded';
  } else {
    return 'ok';
  }
};

const handleRequest: (
  request: Promise<any>,
  jobData: MinerJobRequest,
  timeStamp: number,
  dispatch: Function
) => any = (request, jobData, timeStamp, dispatch) => {
  console.log(jobData);
  request
    .then(data => {
      const response_time = Date.now() - timeStamp;
      const status = getStatus(response_time, jobData);

      const result = {
        job_uuid: jobData.job_uuid,
        status,
        response_time
      };

      console.log(result);
      // critical_responses ?
      dispatch(jobResultSuccess(result));
    })
    .catch(error => {
      console.log(error);
      const result = {
        job_uuid: jobData.job_uuid
      };
      // critical_responses ?
      dispatch(jobResultFailure(result));
    });
};

export const httpGet: (data: MinerJobRequest) => any = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.get(uri), data, Date.now(), dispatch);
  };
};

export const httpPost: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);
  console.log('here POST');
  return dispatch => {
    handleRequest(axios.post(uri), data, Date.now(), dispatch);
  };
};

export const httpPut: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.put(uri), data, Date.now(), dispatch);
  };
};

export const httpPatch: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.patch(uri), data, Date.now(), dispatch);
  };
};

export const httpHead: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.head(uri), data, Date.now(), dispatch);
  };
};

export const httpDelete: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.delete(uri), data, Date.now(), dispatch);
  };
};

export const httpOptions: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  return dispatch => {
    handleRequest(axios.options(uri), data, Date.now(), dispatch);
  };
};

// ===========================================
// non-default axios methods

export const httpConnect: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  const request = {
    method: 'CONNECT',
    url: uri
  };

  return dispatch => {
    handleRequest(axios(request), data, Date.now(), dispatch);
  };
};

export const httpTrace: (data: MinerJobRequest) => Thunk = data => {
  const uri = generateEndpoint(data);

  const request = {
    method: 'TRACE',
    url: uri
  };

  return dispatch => {
    handleRequest(axios(request), data, Date.now(), dispatch);
  };
};
