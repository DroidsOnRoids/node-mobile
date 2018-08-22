// @flow
import watch from 'redux-watch';
import { has } from 'lodash';

import { incrementStorageJobCount } from '../../shared/persistentStorage';

import FGServiceBridge from '../../../FGServiceBridgeNativeModule';

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

import {
  createCheckInMsg,
  createAckMsg,
  createJobResultMsg,
  refreshWalletAddress
} from './helpers';

export default class SocketClient {
  socketUrl: string;
  checkInIntervalId: any;
  allowCheckIn: boolean = false;
  store: any;
  socket: any;

  constructor(store: any) {
    this.socketUrl = 'ws://jobs-api.path.network/ws';
    this.store = store;
    this.setupNewConnection();
    this.setupStoreListeners();

    const state = this.store.getState();

    if (has(state.device, 'info') && !this.allowCheckIn) {
      this.allowCheckIn = true;
      this.sendCheckin();
    }
  }

  setupStoreListeners = () => {
    let deviceInfoWatcher = watch(this.store.getState, 'device');
    let jobWatcher = watch(this.store.getState, 'job');

    this.store.subscribe(
      deviceInfoWatcher((newVal, oldVal) => {
        console.log('device watcher', newVal);
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
            incrementStorageJobCount();
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
            incrementStorageJobCount();
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
        // do nothing
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
    FGServiceBridge.startService().then(function(value) {
      console.log('startService return:', value);
    });

    if (this.allowCheckIn) {
      // send off wallet address update
      refreshWalletAddress(this.store.dispatch);

      console.log('sending checkin msg');
      const state = this.store.getState();
      const { device_type, lat, lng } = state.device.info;
      const { wallet } = state.options;
      console.log('BACKGROUND WALLET:', wallet);
      const checkInMsg = createCheckInMsg(device_type, wallet, {
        lon: lng,
        lat
      });
      this.socket.send(JSON.stringify(checkInMsg));
    }
  };

  sendAck = (msg_id: string) => {
    const ackMsg = createAckMsg(msg_id);
    this.socket.send(JSON.stringify(ackMsg));
  };
}
