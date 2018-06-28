import reducers from '../../reducers';
import * as actions from '../../actions/constants';
import expect from 'expect';
import defaultState from './defaultState';

describe('socketClient reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      ...defaultState
    };

    expect(reducers(undefined, {})).toEqual(initialState);
  });

  it('should handle SOCKET_CONNECTED', () => {
    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketConnected: true
      }
    };

    const socketAction = {
      type: actions.SOCKET_CONNECTED
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_DISCONNECTED', () => {
    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketConnected: false
      }
    };

    const socketAction = {
      type: actions.SOCKET_DISCONNECTED
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_SERVER_ERROR', () => {
    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketErrorMessage: 'error'
      }
    };

    const socketAction = {
      type: actions.SOCKET_SERVER_ERROR,
      description: 'error'
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_CHECK_IN', () => {
    const device = {
      id: '12334546346',
      miner_id: '16827348791264871246',
      cidr: '1.2.3.0/24',
      asn: '123456',
      lat: '-37.9',
      lon: '37.9',
      wallet: '0xjhsagfjhsdfbjsdhgbfsdjhkgfb',
      device_type: 'ios'
    };

    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketCheckIn: device
      }
    };

    const socketAction = {
      type: actions.SOCKET_CHECK_IN,
      device: device
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_SET_MINER_ID', () => {
    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketCheckIn: {
          ...defaultState.socketClient.socketCheckIn,
          miner_id: 'settingMinerID'
        }
      }
    };

    const socketAction = {
      type: actions.SOCKET_SET_MINER_ID,
      minerId: 'settingMinerID'
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_RECEIVE_JOB', () => {
    const jobData = {
      id: '213124321542354',
      type: 'job-request',
      job_type: 'http-uptime-check',
      protocol: 'http',
      method: 'GET',
      headers: {
        'x-type': 'blablablaba'
      },
      payload: 'asfdbnaksjfbkasjf',
      endpoint_address: 'www.google.com',
      endpoint_port: '80',
      endpoint_additional_params: 'yes=no',
      polling_interval: 50,
      degraded_after: 60,
      critical_after: 70,
      critical_responses: {
        header_status: '500',
        body_contains: 'Nah error'
      },
      job_uuid: '1234436543575468568'
    };

    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketReceiveJob: {
          ...jobData
        }
      }
    };

    const socketAction = {
      type: actions.SOCKET_RECEIVE_JOB,
      jobData
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });

  it('should handle SOCKET_JOB_RESULTS', () => {
    const jobResults = {
      id: '32543456453734573457',
      job_uuid: '234674357435874356853468',
      status: 'critical',
      response_time: 500
    };

    const expectedState = {
      ...defaultState,
      socketClient: {
        ...defaultState.socketClient,
        socketSubmitJobResults: {
          ...jobResults
        }
      }
    };

    const socketAction = {
      type: actions.SOCKET_JOB_RESULTS,
      results: jobResults
    };
    expect(reducers({}, socketAction)).toEqual(expectedState);
  });
});
