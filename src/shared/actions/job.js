// @flow
// device actions
import { JOB_SUCCESS, JOB_PENDING, JOB_FAILURE } from './constants';

export const jobSuccess: (data: any) => any = data => ({
  type: JOB_SUCCESS
});

export const jobFailure: (data: any) => any = data => ({
  type: JOB_FAILURE,
  message: 'Failure setting user options'
});
