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

  it('should handle OPTIONS_UPDATE_WALLET', () => {
    const expectedState = {
      ...defaultState,
      options: {
        errorMessage: '',
        wallet: 'walletAdressdsufgkjsdfbsdkjf'
      }
    };

    const successAction = {
      type: actions.OPTIONS_UPDATE_WALLET,
      wallet: 'walletAdressdsufgkjsdfbsdkjf'
    };
    expect(reducers({}, successAction)).toEqual(expectedState);
  });

  it('should handle OPTIONS_FAILURE', () => {
    const expectedState = {
      ...defaultState,
      options: {
        errorMessage: 'testing',
        wallet: ''
      }
    };

    const failAction = {
      type: actions.OPTIONS_FAILURE,
      message: 'testing'
    };
    expect(reducers({}, failAction)).toEqual(expectedState);
  });
});
