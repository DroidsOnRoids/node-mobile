// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { MinerJobRequest } from '../shared/types/job.types';

import {
  httpGet,
  httpPost,
  httpPut,
  httpHead,
  httpDelete,
  httpConnect,
  httpOptions,
  httpTrace
} from './httpRunners';

type Props = {
  httpGet: Function,
  httpPost: Function,
  httpPut: Function,
  httpPatch: Function,
  httpHead: Function,
  httpDelete: Function,
  httpConnect: Function,
  httpOptions: Function,
  httpTrace: Function,
  job: MinerJobRequest
};

class JobRunner extends Component<Props> {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    // detect if job state updates
    // run job if so
    if (this.props.job !== prevProps.job) {
      console.log('jobrunner state updated');
      this.handleProtocol(this.props.job);
    }
  }

  handleProtocol: (jobData: MinerJobRequest) => void = jobData => {
    const { protocol } = jobData;
    switch (protocol) {
      case 'http':
      case 'HTTP':
        this.handleHttpMethod(jobData);
        break;
      case 'tcp':
      case 'TCP':
        this.handleTcpJob(jobData);
        break;
      case 'udp':
      case 'UDP':
        this.handleUdpJob(jobData);
        break;
      case 'dns':
      case 'DNS':
        this.handleDnsJob(jobData);
        break;
      case 'icmp':
      case 'ICMP':
        this.handleIcmpJob(jobData);
        break;
    }
  };

  // ===============================================
  // Protocol handlers
  //

  handleHttpMethod: (jobData: MinerJobRequest) => void = jobData => {
    const { method } = jobData;

    switch (method) {
      case 'GET':
        this.props.httpGet(jobData);
        break;
      case 'POST':
        this.props.httpPost(jobData);
        break;
      case 'PUT':
        this.props.httpPut(jobData);
        break;
      case 'PATCH':
        this.props.httpPatch(jobData);
        break;
      case 'HEAD':
        this.props.httpHead(jobData);
        break;
      case 'DELETE':
        this.props.httpDelete(jobData);
        break;
      case 'CONNECT':
        this.props.httpConnect(jobData);
        break;
      case 'OPTIONS':
        this.props.httpOptions(jobData);
        break;
      case 'TRACE':
        this.props.httpTrace(jobData);
        break;
    }
  };

  handleTcpJob: (jobData: MinerJobRequest) => void = jobData => {
    const { job_type } = jobData;

    switch (job_type) {
    }
  };

  handleUdpJob: (jobData: MinerJobRequest) => void = jobData => {
    const { job_type } = jobData;

    switch (job_type) {
    }
  };

  handleIcmpJob: (jobData: MinerJobRequest) => void = jobData => {
    const { job_type } = jobData;

    switch (job_type) {
    }
  };

  handleDnsJob: (jobData: MinerJobRequest) => void = jobData => {
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
    httpPost: jobData => dispatch(httpPost(jobData)),
    httpPut: jobData => dispatch(httpPut(jobData)),
    httpHead: jobData => dispatch(httpHead(jobData)),
    httpDelete: jobData => dispatch(httpDelete(jobData)),
    httpConnect: jobData => dispatch(httpConnect(jobData)),
    httpOptions: jobData => dispatch(httpOptions(jobData)),
    httpTrace: jobData => dispatch(httpTrace(jobData))
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
