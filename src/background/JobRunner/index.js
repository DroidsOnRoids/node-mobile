// @flow
// import '../../shim';
import watch from 'redux-watch';

import type { MinerJobRequest } from '../shared/types/job.types';

import {
  httpGet,
  httpPost,
  httpPut,
  httpHead,
  httpDelete,
  httpPatch,
  httpConnect,
  httpOptions,
  httpTrace
} from './httpRunners';

export default class JobRunner {
  store: any;

  constructor(store: any) {
    this.store = store;
    this.setupStoreListeners();
    // const testData = {
    //   id: 'string',
    //   type: 'job-request',
    //   job_type: 'UDP',
    //   protocol: 'UDP',
    //   method: 'UDP',
    //   headers: '',
    //   payload: 'string',
    //   endpoint_address: '10.10.14.215',
    //   endpoint_port: 1337,
    //   endpoint_additional_params: '',
    //   polling_interval: 10000,
    //   degraded_after: 3000,
    //   critical_after: 6000,
    //   critical_responses: [],
    //   job_uuid: 'string-uuid'
    // };
    //
    // console.log('handle prot outer');
    // this.handleProtocol(testData);
  }

  setupStoreListeners() {
    let jobWatcher = watch(
      this.store.getState,
      'socketClient.socketReceiveJob'
    );

    // detect if job state updates
    // run job if so
    this.store.subscribe(
      jobWatcher((newJob, oldJob) => {
        console.log('in job runner');
        if (newJob !== oldJob) {
          this.handleProtocol(newJob);
        }
      })
    );
  }

  handleProtocol: (jobData: MinerJobRequest) => void = jobData => {
    console.log('handle protocol');
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

  handleHttpMethod: (jobData: MinerJobRequest) => void = jobData => {
    const { method } = jobData;

    switch (method) {
      case 'GET':
        this.store.dispatch(httpGet(jobData));
        break;
      case 'POST':
        this.store.dispatch(httpPost(jobData));
        break;
      case 'PUT':
        this.store.dispatch(httpPut(jobData));
        break;
      case 'PATCH':
        this.store.dispatch(httpPatch(jobData));
        break;
      case 'HEAD':
        this.store.dispatch(httpHead(jobData));
        break;
      case 'DELETE':
        this.store.dispatch(httpDelete(jobData));
        break;
      case 'CONNECT':
        this.store.dispatch(httpConnect(jobData));
        break;
      case 'OPTIONS':
        this.store.dispatch(httpOptions(jobData));
        break;
      case 'TRACE':
        this.store.dispatch(httpTrace(jobData));
        break;
    }
  };

  handleTcpJob: (jobData: MinerJobRequest) => void = jobData => {};

  handleUdpJob: (jobData: MinerJobRequest) => void = jobData => {};

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
}
