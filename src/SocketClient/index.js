// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  socketConnected,
  socketDisconnected,
  receiveJob,
  submitJobSuccess,
  minerSetId,
  serverError
} from '../shared/actions/socketClient';

import { getDevice } from '../shared/reducers';

import { createCheckInMsg, handleMessage } from './helpers';

// TODO environment variable.
const socketURL =
  'ws://devCluster-default-jobsapi-3bfa-787513993.us-west-2.elb.amazonaws.com/ws';
const socket = new WebSocket(socketURL);

type Props = {
  socketConnected: any,
  socketDisconnected: any
};

class SocketClient extends Component<Props> {
  componentDidMount() {
    this.setupListeners();
  }

  setupListeners = () => {
    socket.onopen = e => {
      console.log('CONNECTED TO ELIXR');
      this.props.socketConnected();

      // now we're connected, get the device info
      const checkInMsg = createCheckInMsg();

      // emit initialisation message
      socket.send(JSON.stringify(checkInMsg));
    };

    socket.onmessage = event => {
      const data = event.data;
      // required for flow
      if (typeof data === 'string') {
        //handleMessage(JSON.parse(data), dispatch);
      }
    };

    socket.onerror = event => {
      console.log('SOCKET CONNECTION ERROR');
    };

    socket.onclose = event => {
      console.log('SOCKET CONNECTION CLOSED');
      this.props.socketDisconnected();
    };
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

const mapDispatchToProps = { socketConnected, socketDisconnected };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketClient);
