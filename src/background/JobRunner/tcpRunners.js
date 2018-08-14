// @flow
import net from 'react-native-tcp';

import type { MinerJobRequest, Status } from '../shared/types/job.types';
import type { Action, Thunk } from '../shared/types/action.types';

import { jobResultSuccess, jobResultFailure } from '../shared/actions/job';

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

export const tcpRequest = (data: MinerJobRequest) => {
  const { endpoint_address, endpoint_port } = data;

  return dispatch =>
    handleRequest(endpoint_port, endpoint_address, data, Date.now(), dispatch);
};

const handleRequest: (
  port: number | string,
  address: string,
  jobData: MinerJobRequest,
  timeStamp: number,
  dispatch: Function
) => any = (port, address, jobData, timeStamp, dispatch) => {
  const request = new net.Socket();

  request.connect(port, address, () => {
    const payload = { jobData };
    request.write(payload);
    request.end();
  });

  request.on('data', data => {
    const response_body = data.toString('utf8');
    const response_time = Date.now() - timeStamp;
    const status = getStatus(response_time, jobData);

    const result = {
      job_uuid: jobData.job_uuid,
      status,
      response_time,
      response_body
    };

    dispatch(jobResultSuccess(result));
  });

  request.on('error', err => {
    console.error('err', err);
    dispatch(jobResultFailure({ job_uuid: jobData.job_uuid }));
  });
};
