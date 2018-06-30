// @flow
export type DeviceOS = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

type Status = 'critical' | 'degraded' | 'ok' | 'unknown';

export type CheckIn = {
  id: string,
  type: 'check-in',
  miner_id?: string,
  wallet: string,
  device_type: DeviceOS
};

export type JobResult = {
  id: string,
  type: 'job-result',
  job_uuid: string,
  status: Status,
  response_time: number
};

export type Ack = {
  id: string,
  type: 'ack',
  miner_id?: string
};

export type Error = {
  id: string,
  type: 'error',
  description: string
};
