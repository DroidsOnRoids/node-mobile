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

  it('should handle OPTIONS_SUCCESS', () => {
    const userSettingsData = {
      walletAddress: 'walletAdressdsufgkjsdfbsdkjf',
      wifi_only: true
    };

    const expectedState = {
      ...defaultState,
      options: {
        errorMessage: '',
        userSettings: userSettingsData
      }
    };

    const successAction = {
      type: actions.OPTIONS_SUCCESS,
      data: userSettingsData
    };
    expect(reducers({}, successAction)).toEqual(expectedState);
  });

  it('should handle OPTIONS_FAILURE', () => {
    const expectedState = {
      ...defaultState,
      options: {
        errorMessage: 'testing',
        userSettings: {
          walletAddress: '',
          wifi_only: false
        }
      }
    };

    const failAction = {
      type: actions.OPTIONS_FAILURE,
      message: 'testing'
    };
    expect(reducers({}, failAction)).toEqual(expectedState);
  });
});
