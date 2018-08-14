// @flow
import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_SET_MINER_ID,
  SOCKET_CHECK_IN,
  SOCKET_RECEIVE_JOB,
  SOCKET_JOB_RESULTS,
  SOCKET_SERVER_ERROR
} from './constants';

import type { Dispatch } from 'redux';
import type { State } from '../types/storage.types';

export type Action =
  | {|
      type: typeof SOCKET_CONNECTED
    |}
  | {|
      type: typeof SOCKET_DISCONNECTED
    |}
  | {|
      type: typeof SOCKET_SET_MINER_ID
    |}
  | {|
      type: typeof SOCKET_CHECK_IN
    |}
  | {|
      type: typeof SOCKET_RECEIVE_JOB
    |}
  | {|
      type: typeof SOCKET_JOB_RESULTS
    |}
  | {|
      type: typeof SOCKET_SERVER_ERROR
    |};

export type Thunk = (dispatch: Dispatch<Action>, getState: () => State) => any;
