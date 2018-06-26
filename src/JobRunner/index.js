// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { MinerJobRequest } from '../shared/types/job.types';

import { httpGet, httpPost } from './httpRunners';

type Props = {
  httpGet: Function,
  httpPost: Function,
  job: MinerJobRequest
};

class JobRunner extends Component<Props> {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    // detect if job state updates
    // run job if so
    if (this.props.job !== prevProps.job) {
      console.log('jobrunner state updated');
      console.log('state', this.props.job);
      this.handleProtocol(this.props.job);
    }
  }

  handleProtocol: (jobData: MinerJobRequest) => void = jobData => {
    const { protocol } = jobData;
    switch (protocol) {
      case 'http':
        // although could end up needing to be done via cURL (native)
        this.handleHttpMethod(jobData);
        break;
      case 'tcp':
        // setup a socket connection (native functionality)
        break;
      case 'udp':
        // setup a udp connection (native functionality)
        break;
      case 'icmp':
        // send a ping (native functionality)
        break;
    }
  };

  // ===============================================
  // method handlers

  handleHttpMethod: (jobData: MinerJobRequest) => void = jobData => {
    const { method } = jobData;

    switch (method) {
      case 'GET':
        console.log('at get method');
        this.props.httpGet(jobData);
        break;
      case 'POST':
        console.log('at post method');
        //this.props.httpPost(jobData);
        break;
      case 'PUT':
        break;
      case 'PATCH':
        break;
      case 'HEAD':
        break;
      case 'DELETE':
        break;
      case 'CONNECT':
        break;
      case 'OPTIONS':
        break;
      case 'TRACE':
        break;
      case 'TRACEROUTE':
        break;
      case 'PING':
        break;
    }
  };

  handleTcpMethod: (jobData: MinerJobRequest) => void = jobData => {
    const { job_type } = jobData;

    switch (job_type) {
    }
  };

  handleUdpMethod: (jobData: MinerJobRequest) => void = jobData => {
    const { job_type } = jobData;

    switch (job_type) {
    }
  };

  submitJobResult: (jobData: MinerJobRequest) => void = () => {};

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    httpGet: jobData => dispatch(httpGet(jobData)),
    httpPost: jobData => dispatch(httpPost(jobData))
  };
};

const mapStateToProps = state => {
  return {
    job: state.socketClient.socketReceiveJob
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobRunner);
