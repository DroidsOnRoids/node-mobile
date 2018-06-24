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
      type: SOCKET_CONNECTED
    |}
  | {|
      type: SOCKET_DISCONNECTED
    |}
  | {|
      type: SOCKET_SET_MINER_ID
    |}
  | {|
      type: SOCKET_CHECK_IN
    |}
  | {|
      type: SOCKET_RECEIVE_JOB
    |}
  | {|
      type: SOCKET_JOB_RESULTS
    |}
  | {|
      type: SOCKET_SERVER_ERROR
    |};

export type Thunk = (dispatch: Dispatch<Action>, getState: () => State) => any;
