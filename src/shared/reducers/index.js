// @flow
import { combineReducers } from 'redux';
import device, * as fromDevice from './device';
import job, * as fromJob from './job';
import options, * as fromOptions from './options';
import socketClient, * as fromSocketClient from './socketClient';
import stats, * as fromStats from './stats';

const reducers = combineReducers({
  device,
  job,
  options,
  socketClient,
  stats
});

export default reducers;

export const getDevice = (state: any) => fromDevice.getInfo(state.device);

export const getJob = (state: any) => fromJob.getJobSuccess(state.job);
export const getJobErrorMessage = (state: any) =>
  fromJob.getErrorMessage(state.job);

export const getOptions = (state: any) => fromOptions.getOptions(state.options);
export const getOptionsErrorMessage = (state: any) =>
  fromOptions.getErrorMessage(state.options);

export const getSocketConnected = (state: any) =>
  fromSocketClient.getSocketConnected(state.socketClient);
export const getSocketCheckIn = (state: any) =>
  fromSocketClient.getSocketCheckIn(state.socketCheckIn);
export const getSocketReceiveJob = (state: any) =>
  fromSocketClient.getSocketReceiveJob(state.socketClient);
export const getSocketSubmitJobResults = (state: any) =>
  fromSocketClient.getSocketSubmitJobResults(state.socketClient);
export const getSocketErrorMessage = (state: any) =>
  fromSocketClient.getSocketErrorMessage(state.socketClient);

export const getStats = (state: any) => fromStats.getStats(state.stats);
