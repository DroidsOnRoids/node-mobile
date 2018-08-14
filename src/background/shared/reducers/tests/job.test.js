import reducers from '../../reducers';
import * as actions from '../../actions/constants';
import expect from 'expect';
import defaultState from './defaultState';

describe('job reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      ...defaultState
    };

    expect(reducers(undefined, {})).toEqual(initialState);
  });

  it('should handle JOB_PENDING', () => {
    const jobData = {
      jobFailure: {
        message: ''
      },
      jobPending: true,
      jobSuccess: {
        job_uuid: '',
        status: '',
        response_time: -1
      }
    };

    const expectedState = {
      ...defaultState,
      job: jobData
    };

    const pendingAction = {
      type: actions.JOB_PENDING
    };
    expect(reducers({}, pendingAction)).toEqual(expectedState);
  });

  it('should handle JOB_SUCCESS', () => {
    const jobData = {
      jobFailure: {
        message: ''
      },
      jobPending: false,
      jobSuccess: {
        job_uuid: '123234234235235',
        status: 'critical',
        response_time: 5000
      }
    };

    const expectedState = {
      ...defaultState,
      job: jobData
    };

    const successAction = {
      type: actions.JOB_SUCCESS,
      job_result: {
        job_uuid: '123234234235235',
        status: 'critical',
        response_time: 5000
      }
    };

    expect(reducers({}, successAction)).toEqual(expectedState);
  });

  it('should handle JOB_FAILURE', () => {
    const jobData = {
      jobFailure: {
        job_uuid: '1234567890',
        message: 'job test fail message'
      },
      jobPending: false,
      jobSuccess: {
        job_uuid: '',
        status: '',
        response_time: -1
      }
    };

    const expectedState = {
      ...defaultState,
      job: jobData
    };

    const failAction = {
      type: actions.JOB_FAILURE,
      job_uuid: '1234567890',
      message: 'job test fail message'
    };
    expect(reducers({}, failAction)).toEqual(expectedState);
  });
});
