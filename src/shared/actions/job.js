// @flow
// device actions
import { JOB_SUCCESS, JOB_PENDING, JOB_FAILURE } from './constants';

export const jobResultSuccess: (data: any) => any = data => ({
  type: JOB_SUCCESS,
  job_result: {
    job_uuid: data.job_uuid,
    status: data.status,
    response_time: data.response_time
  }
});

export const jobResultFailure: (data: any) => any = data => ({
  type: JOB_FAILURE,
  message: 'Job result failed',
  job_uuid: data.job_uuid
});
