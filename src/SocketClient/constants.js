// socket message types
const MINER_CHECK_IN = 'check-in';
const RECEIVE_JOB = 'job-request';
const SUBMIT_JOB = 'job-result';
const SERVER_ACK = 'ack';
const SERVER_ERROR = 'error';

const messageTypes = {
  MINER_CHECK_IN,
  RECEIVE_JOB,
  SUBMIT_JOB,
  SERVER_ACK,
  SERVER_ERROR
};

export default messageTypes;
