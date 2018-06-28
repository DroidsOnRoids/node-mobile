// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from 'react-native-config';
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
  minerSetId,
  serverError
} from '../shared/actions/socketClient';

import { createCheckInMsg, createAckMsg } from './helpers';

let socket;

type Props = {
  socketConnected: any,
  socketDisconnected: any,
  receiveJob: any,
  submitJobSuccess: any,
  minerSetId: any,
  serverError: any,
  socketUrl: string,

  device: Object,
  options: Object,
  job: Object
};

type State = {
  checkInIntervalId: any,
  allowCheckIn: boolean
};

class SocketClient extends Component<Props, State> {
  state = {
    checkInIntervalId: '',
    allowCheckIn: false
  };

  componentDidMount() {
    socket = new WebSocket(this.props.socketUrl);
    this.setupListeners();
    this.setupCheckInPing();
  }

  componentDidUpdate(prevState) {
    if (has(this.props.device, 'info') && !this.state.allowCheckIn) {
      this.setState({ allowCheckIn: true });
    }

    // also handle job result updates
  }

  componentWillUnmount() {
    clearInterval(this.state.checkInIntervalId);
  }

  // =============================================================
  // Setup Functions
  //
  setupListeners = () => {
    if (socket.readyState == 1) {
      // socket already connected
      this.handleConnect();
    } else {
      socket.onopen = this.handleConnect;
    }

    socket.onmessage = this.handleMessage;
    socket.onerror = this.handleError;
    socket.onclose = this.handleClose;
  };

  setupCheckInPing = () => {
    const checkInIntervalId = setInterval(this.sendCheckin, 30000);
    this.setState({ checkInIntervalId });
  };

  setupNewConnection = () => {
    setTimeout(() => {
      console.log('attempting reconnect');
      socket = new WebSocket(this.props.socketUrl);
      this.setupListeners();
    }, 10000);
  };

  // =============================================================
  // Socket Event Handlers
  //
  handleConnect: () => void = () => {
    console.log('CONNECTED TO ELIXR');
    this.props.socketConnected();

    // send first check in message
    this.sendCheckin();

    // 00000000000000000000000000000000000000000000000000000
    // create a dummy job
    // setTimeout(() => {
    //   const data = {
    //     id: '213124321542354',
    //     type: 'job-request',
    //     job_type: 'http-uptime-check',
    //     protocol: 'http',
    //     method: 'GET',
    //     headers: {
    //       'x-type': 'blablablaba'
    //     },
    //     payload: 'asfdbnaksjfbkasjf',
    //     endpoint_address: 'http://joshs.space',
    //     endpoint_port: '80',
    //     endpoint_additional_params: '',
    //     polling_interval: 50,
    //     degraded_after: 60,
    //     critical_after: 70,
    //     critical_responses: {
    //       header_status: '500',
    //       body_contains: 'Nah error'
    //     },
    //     job_uuid: '1234436543575468568'
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
        this.props.receiveJob(data);
        break;
      case SERVER_ACK:
        // if it is the first ever check-in message
        if (has(data, 'miner_id')) {
          // store miner_id
          this.props.minerSetId(data);
          persistentStorage.setMinerId(data.miner_id);
        }
        // server ack to recurring miner check-in message
        this.sendAck(data.id);
        break;
      case SERVER_ERROR:
        this.props.serverError(data);
        break;
    }
  };

  handleError: (event: Event) => void = event => {
    console.log('SOCKET ERROR');
  };

  handleClose: () => void = () => {
    console.log('SOCKET CONNECTION CLOSED');
    this.props.socketDisconnected();
    this.setupNewConnection();
  };

  // =============================================================
  // Socket Message Senders
  //
  sendCheckin = () => {
    // TODO Sort out LAT LNG
    if (this.state.allowCheckIn) {
      const { miner_id, device_type } = this.props.device.info;
      const { wallet } = this.props.options.userSettings;
      const checkInMsg = createCheckInMsg(miner_id, device_type, wallet);
      socket.send(JSON.stringify(checkInMsg));
    }
  };

  sendAck = (msg_id: string) => {
    const ackMsg = createAckMsg(msg_id);
    socket.send(JSON.stringify(ackMsg));
  };

  sendJobResult = () => {};

  render() {
    return null;
  }
}
const mapStateToProps = state => {
  return {
    device: state.device,
    options: state.options,
    job: state.job
  };
};

const mapDispatchToProps = {
  socketConnected,
  socketDisconnected,
  receiveJob,
  submitJobSuccess,
  minerSetId,
  serverError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketClient);
