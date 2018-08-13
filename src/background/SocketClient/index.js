// @flow
import Config from 'react-native-config';
import watch from 'redux-watch';
import { has } from 'lodash';

import * as persistentStorage from '../shared/store/persistentStorage';

import {
  MINER_CHECK_IN,
  RECEIVE_JOB,
  SUBMIT_JOB,
  SERVER_ACK,
  SERVER_ERROR
} from './constants';

import {
  socketConnected,
  socketDisconnected,
  receiveJob,
  submitJobSuccess,
  serverError
} from '../shared/actions/socketClient';

import { setDeviceMinerId } from '../shared/actions/device';

import { incrementJobCount } from '../shared/actions/stats';

import { createCheckInMsg, createAckMsg, createJobResultMsg } from './helpers';

export default class SocketClient {
  socketUrl: string;
  checkInIntervalId: any;
  allowCheckIn: boolean = false;
  store: any;
  socket: any;

  constructor(store: any) {
    this.socketUrl = Config.API_URL;
    this.store = store;
    this.setupNewConnection();
    this.setupStoreListeners();
  }

  setupStoreListeners = () => {
    let deviceInfoWatcher = watch(this.store.getState, 'device');
    let jobWatcher = watch(this.store.getState, 'job');

    this.store.subscribe(
      deviceInfoWatcher((newVal, oldVal) => {
        if (has(newVal, 'info') && !this.allowCheckIn) {
          this.allowCheckIn = true;
          this.sendCheckin();
        }
      })
    );

    this.store.subscribe(
      jobWatcher((newJob, oldJob) => {
        console.log(newJob);
        if (newJob !== oldJob) {
          if (newJob.jobPending === false && newJob.jobFailure.message === '') {
            console.log('SENDING JOB RESULT');
            const jobResult = createJobResultMsg(newJob.jobSuccess);
            console.log(jobResult);
            this.socket.send(JSON.stringify(jobResult));
            this.store.dispatch(incrementJobCount());
          } else if (
            newJob.jobPending === false &&
            newJob.jobFailure.message === 'Job result failed'
          ) {
            console.log('SENDING JOB RESULT FAILURE');
            const jobResult = createJobResultMsg({
              job_uuid: newJob.jobFailure.job_uuid,
              status: 'critical',
              response_time: 0
            });

            console.log(jobResult);
            this.socket.send(JSON.stringify(jobResult));
            this.store.dispatch(incrementJobCount());
          }
        }
      })
    );
  };

  // =============================================================
  // Setup Functions
  //
  setupListeners = () => {
    if (this.socket.readyState == 1) {
      // socket already connected
      this.handleConnect();
    } else {
      this.socket.onopen = this.handleConnect;
    }

    this.socket.onmessage = this.handleMessage;
    this.socket.onerror = this.handleError;
    this.socket.onclose = this.handleClose;
  };

  setupCheckInPing = () => {
    if (this.checkInIntervalId !== '') {
      clearInterval(this.checkInIntervalId);
    }
    const checkInIntervalId = setInterval(this.sendCheckin, 30000);
    this.checkInIntervalId = checkInIntervalId;
  };

  setupNewConnection = () => {
    this.socket = new WebSocket(this.socketUrl);
    this.setupListeners();
    this.setupCheckInPing();
  };

  // =============================================================
  // Socket Event Handlers
  //
  handleConnect: () => void = () => {
    console.log('CONNECTED TO ELIXR');

    this.store.dispatch(socketConnected());

    // send first check in message
    this.sendCheckin();

    // 00000000000000000000000000000000000000000000000000000
    // create a dummy job
    // setTimeout(() => {
    //   const data = {
    //     critical_after: 3000,
    //     degraded_after: 2000,
    //     method: 'GET',
    //     protocol: 'HTTP',
    //     endpoint_address: 'http://robert.cavanaugh',
    //     endpoint_port: '80',
    //     id: '4297499f-7067-40e1-af1d-c75f4c2ba1fd',
    //     job_uuid: '687802bf-45bc-4f15-be77-41365ac40a2c',
    //     type: 'job-request'
    //   };
    //
    //   console.log('receiving dummy job');
    //   this.props.receiveJob(data);
    // }, 6000);
  };

  handleMessage: (event: MessageEvent) => void = event => {
    // return if data is unexpected type
    if (typeof event.data !== 'string') return;

    const data = JSON.parse(event.data);
    const { type } = data;

    console.log('RECEIVED MESSAGE', data);

    switch (type) {
      case RECEIVE_JOB:
        // ----------------------------------------
        // respond with ack
        this.sendAck(data.id);

        // set job running
        this.store.dispatch(receiveJob(data));
        break;
      case SERVER_ACK:
        // if it is the first ever check-in message
        if (has(data, 'miner_id')) {
          // store miner_id
          this.store.dispatch(setDeviceMinerId(data.miner_id));
          persistentStorage.setMinerId(data.miner_id);
        }
        break;
      case SERVER_ERROR:
        this.store.dispatch(serverError(data));
        break;
    }
  };

  handleError: (event: Event) => void = event => {
    console.log('SOCKET ERROR');
  };

  handleClose: () => void = () => {
    console.log('SOCKET CONNECTION CLOSED');
    this.store.dispatch(socketDisconnected());
    this.setupNewConnection();
  };

  // =============================================================
  // Socket Message Senders
  //
  sendCheckin = () => {
    if (this.allowCheckIn) {
      console.log('sending checkin msg');
      const state = this.store.getState();

      const { device_type, lat, lng } = state.device.info;
      const { wallet } = state.options.userSettings;
      const checkInMsg = createCheckInMsg(device_type, wallet, lat, lng);
      this.socket.send(JSON.stringify(checkInMsg));
    }
  };

  sendAck = (msg_id: string) => {
    const ackMsg = createAckMsg(msg_id);
    this.socket.send(JSON.stringify(ackMsg));
  };

  render() {
    return null;
  }
}
