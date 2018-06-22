const defaultState = {
  device: {
    info: {
      miner_id: '',
      device_type: ''
    }
  },
  job: {
    errorMessage: '',
    jobPending: false,
    jobSuccess: {}
  },
  options: {
    errorMessage: '',
    userSettings: {
      walletAddress: '',
      wifi_only: false
    }
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
      job_type: '',
      protocol: '',
      headers: {},
      payload: '',
      endpoint_address: '',
      endpoint_port: -1,
      endpoint_additional_params: '',
      polling_interval: 0,
      degraded_after: 0,
      critical_after: 0,
      critical_responses: {
        header_status: '',
        body_contains: ''
      },
      job_uuid: ''
    },
    socketSubmitJobResults: {
      id: '',
      job_uuid: '',
      status: '',
      response_time: -1
    }
  },
  stats: {
    jobCompleteCount: 0
  }
};

export default defaultState;
