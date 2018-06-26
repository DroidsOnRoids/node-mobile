// @flow
type DeviceOS = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

type Status = 'critical' | 'degraded' | 'ok' | 'unknown' | '';

type Methods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'TRACEROUTE'
  | 'PING';

type Headers = {
  [string]: string
};

type CriticalResponses = {
  header_status: string,
  body_contains: string
};

export type MinerJobRequest = {
  id: string,
  type: 'job-request',
  job_type: string,
  protocol: string,
  method: Methods,
  headers: Headers,
  payload: string,
  endpoint_address: string,
  endpoint_port: number,
  endpoint_additional_params: string,
  polling_interval: number,
  degraded_after: number,
  critical_after: number,
  critical_responses: CriticalResponses,
  job_uuid: string
};

export type JobResult = {
  id: string,
  type: 'job-result',
  job_uuid: string,
  status: Status,
  response_time: number
};

export type Emit = (io: Function, msg: MinerJobRequest) => void;
