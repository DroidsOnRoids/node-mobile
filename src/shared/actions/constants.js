// @flow
// Action constants

// device related
export const DEVICE_INFO_SUCCESS = 'DEVICE_INFO_SUCCESS';
export const DEVICE_INFO_FAILURE = 'DEVICE_INFO_FAILURE';

// job related actions
export const JOB_PENDING = 'JOB_PENDING';
export const JOB_SUCCESS = 'JOB_SUCCESS';
export const JOB_FAILURE = 'JOB_FAILURE';

// options
export const OPTIONS_SUCCESS = 'OPTIONS_SUCCESS';
export const OPTIONS_FAILURE = 'OPTIONS_FAILURE';

// socket client state
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED';

// messages via socket client
export const SOCKET_SET_MINER_ID = 'SOCKET_SET_MINER_ID';
export const SOCKET_CHECK_IN = 'SOCKET_CHECK_IN';
export const SOCKET_RECEIVE_JOB = 'SOCKET_RECEIVE_JOB';
export const SOCKET_JOB_RESULTS = 'SOCKET_JOB_RESULTS';
export const SOCKET_SERVER_ERROR = 'SOCKET_SERVER_ERROR';
export const SOCKET_PING = 'SOCKET_PING';
export const SOCKET_PONG = 'SOCKET_PONG';

// options
export const STATS_SET_JOB_COUNT = 'STATS_SET_JOB_COUNT';
export const STATS_INCREMENT_JOB_COUNT = 'STATS_INCREMENT_JOB_COUNT';

// socket api dictionary
export const MINER_CHECK_IN = 'check-in';
export const RECEIVE_JOB = 'job-request';
export const SUBMIT_JOB = 'job-result';
export const SERVER_ACK = 'ack';
export const SERVER_PONG = 'pong';
export const SERVER_ERROR = 'error';
