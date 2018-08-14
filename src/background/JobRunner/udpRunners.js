// @flow
import dgram from 'react-native-udp';

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

export const udpRequest = (data: MinerJobRequest) => {
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
  const { payload } = jobData;
  const socket = dgram.createSocket('udp4');

  socket.bind(port);

  socket.once('listening', () => {
    const buffer = toByteArray(payload);
    socket.send(buffer, 0, buffer.length, port, address, err => {
      if (err) dispatch(jobResultFailure({ job_uuid: jobData.job_uuid }));

      const response_time = Date.now() - timeStamp;
      const status = getStatus(response_time, jobData);

      const result = {
        job_uuid: jobData.job_uuid,
        status,
        response_time
      };

      dispatch(jobResultSuccess(result));
    });
  });

  // socket.on('message', (msg, rinfo) => {
  //   console.log('message was received', msg);
  // });
};
