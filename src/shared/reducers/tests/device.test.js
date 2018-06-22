import reducers from '../../reducers';
import * as actions from '../../actions/constants';
import expect from 'expect';
import defaultState from './defaultState';

describe('device reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      ...defaultState
    };

    expect(reducers(undefined, {})).toEqual(initialState);
  });

  it('should handle DEVICE_SET_LOCATION', () => {
    const deviceData = {
      device_type: '',
      miner_id: '',
      lat: '-37.0',
      lng: '37.0'
    };

    const expectedState = {
      ...defaultState,
      device: {
        info: deviceData
      }
    };

    const successAction = {
      type: actions.DEVICE_SET_LOCATION,
      data: deviceData
    };
    expect(reducers({}, successAction)).toEqual(expectedState);
  });

  it('should handle DEVICE_SET_MINER_ID', () => {
    const expectedState = {
      ...defaultState,
      device: {
        info: {
          miner_id: 'miner-id-testing',
          device_type: ''
        }
      }
    };

    const successAction = {
      type: actions.DEVICE_SET_MINER_ID,
      miner_id: 'miner-id-testing'
    };
    expect(reducers({}, successAction)).toEqual(expectedState);
  });

  it('should handle DEVICE_SET_DEVICE_TYPE', () => {
    const expectedState = {
      ...defaultState,
      device: {
        info: {
          miner_id: '',
          device_type: 'ios'
        }
      }
    };

    const successAction = {
      type: actions.DEVICE_SET_DEVICE_TYPE,
      device_type: 'ios'
    };
    expect(reducers({}, successAction)).toEqual(expectedState);
  });
});
