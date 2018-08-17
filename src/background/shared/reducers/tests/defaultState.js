const defaultState = {
  device: {
    info: {
      miner_id: '',
      device_type: ''
    }
  },
  job: {
    jobFailure: '',
    jobPending: false,
    jobSuccess: {
      job_uuid: '',
      status: '',
      response_time: -1
    }
  },
  options: {
    errorMessage: '',
    wallet: ''
  },
  socketClient: {
    socketConnected: false,
    socketErrorMessage: '',
    socketCheckIn: {
      id: '',
      wallet: '',
      device_type: ''
    },
    socketReceiveJob: {
      id: '',
      type: '',
      job_type: '',
      protocol: '',
      method: '',
      headers: {},
      payload: '',
      endpoint_address: '',
      endpoint_port: '',
      endpoint_additional_params: '',
      polling_interval: 0,
      degraded_after: 0,
      critical_after: 0,
      critical_responses: {},
      job_uuid: ''
    },
    socketSubmitJobResults: {
      id: '',
      job_uuid: '',
      status: '',
      response_time: -1
    }
  }
};

export default defaultState;
