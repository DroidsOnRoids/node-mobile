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

const errorMessage = (state: string = '', action: any) => {
  switch (action.type) {
    case JOB_FAILURE:
      return action.message;
    case JOB_PENDING:
    case JOB_SUCCESS:
      return '';
    default:
      return state;
  }
};

const job = combineReducers({
  jobSuccess,
  jobPending,
  errorMessage
});

export default job;

export const getJobSuccess = (state: any) => state.jobSuccess;
export const getJobPending = (state: any) => state.jobPending;
export const getErrorMessage = (state: any) => state.errorMessage;
