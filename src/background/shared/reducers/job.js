// @flow
import { combineReducers } from 'redux';

import { JOB_PENDING, JOB_SUCCESS, JOB_FAILURE } from '../actions/constants';

const initialResult = {
  job_uuid: '',
  status: '',
  response_time: -1
};

const jobSuccess = (state: any = initialResult, action: any) => {
  switch (action.type) {
    case JOB_SUCCESS:
      const { job_result } = action;
      return {
        ...state,
        ...job_result
      };
    default:
      return state;
  }
};

const jobPending = (state: boolean = false, action: any) => {
  switch (action.type) {
    case JOB_PENDING:
      return true;
    case JOB_SUCCESS:
    case JOB_FAILURE:
      return false;
    default:
      return state;
  }
};

const jobFailure = (state: string = '', action: any) => {
  switch (action.type) {
    case JOB_FAILURE:
      return {
        message: action.message,
        job_uuid: action.job_uuid
      };
    case JOB_PENDING:
    case JOB_SUCCESS:
      return { message: '' };
    default:
      return state;
  }
};

const job = combineReducers({
  jobSuccess,
  jobPending,
  jobFailure
});

export default job;

export const getJobSuccess = (state: any) => state.jobSuccess;
export const getJobPending = (state: any) => state.jobPending;
export const getErrorMessage = (state: any) => state.errorMessage;
