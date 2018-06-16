// @flow
// Actions

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

// connections via socket client
export const SOCKET_INIT_SUCCESS = 'SOCKET_INIT_SUCCESS';
export const SOCKET_INIT_FAILURE = 'SOCKET_INIT_FAILURE';

// update miner details via socket client
export const SOCKET_UPDATE_LOCATION_SUCCESS = 'SOCKET_UPDATE_LOCATION_SUCCESS';
export const SOCKET_UPDATE_LOCATION_FAILURE = 'SOCKET_UPDATE_LOCATION_FAILURE';

// receive job via socket client
export const SOCKET_RECEIVE_JOB_SUCCESS = 'SOCKET_RECEIVE_JOB_SUCCESS';
export const SOCKET_RECEIVE_JOB_FAILURE = 'SOCKET_RECEIVE_JOB_FAILURE';

// submit job result via socket client
export const SOCKET_SUBMIT_JOB_SUCCESS = 'SOCKET_SUBMIT_JOB_SUCCESS';
export const SOCKET_SUBMIT_JOB_FAILURE = 'SOCKET_SUBMIT_JOB_FAILURE';

// options
export const STATS_SET_JOB_COUNT = 'STATS_SET_JOB_COUNT';
export const STATS_INCREMENT_JOB_COUNT = 'STATS_INCREMENT_JOB_COUNT';
export const STATS_SET_TOKEN_COUNT = 'STATS_SET_TOKEN_COUNT';
export const STATS_INCREMENT_TOKEN_COUNT = 'STATS_INCREMENT_TOKEN_COUNT';
