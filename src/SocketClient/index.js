// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import { has } from 'lodash';

import persistentStorage from '../shared/store/persistentStorage';

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

import { createCheckInMsg } from './helpers';

// TODO environment variable.
const socketURL =
  'ws://devCluster-default-jobsapi-3bfa-864171616.us-west-2.elb.amazonaws.com/ws';

const socket = new WebSocket(socketURL);

type Props = {
  socketConnected: any,
  socketDisconnected: any,
  receiveJob: any,
  submitJobSuccess: any,
  minerSetId: any,
  serverError: any,
  device: Object,
  options: Object,
  job: Object
};

class SocketClient extends Component<Props> {
  componentDidMount() {
    this.setupListeners();
  }

  setupListeners = () => {
    socket.onopen = e => {
      console.log('CONNECTED TO ELIXR');
      this.props.socketConnected();

      // send first check in message
      const { miner_id, device_type } = this.props.device.info;
      const { wallet } = this.props.options.userSettings;
      const checkInMsg = createCheckInMsg(miner_id, device_type, wallet);
      socket.send(JSON.stringify(checkInMsg));
    };

    socket.onmessage = event => {
      const { data } = event;
      this.handleMessage(JSON.parse(data));
    };

    socket.onerror = event => {
      console.log('SOCKET CONNECTION ERROR');
    };

    socket.onclose = event => {
      console.log('SOCKET CONNECTION CLOSED');
      this.props.socketDisconnected();
    };
  };

  handleMessage: (data: Object) => void = data => {
    const { type } = data;

    switch (type) {
      case RECEIVE_JOB:
        // respond with ack
        // set job running
        this.props.receiveJob(data);
        break;
      case SERVER_ACK:
        // server ack to recurring miner check-in message
        if (has(data, 'miner_id')) {
          this.props.minerSetId(data);
          persistentStorage.setMinerId(data.miner_id);
        }
        break;
      case SERVER_ERROR:
        this.props.serverError(data);
        break;
    }
  };

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
