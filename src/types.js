// @flow
type Headers = {
  [string]: string
};

type CriticalResponses = {
  header_status: string,
  body_contains: string
};

type Status = 'critical' | 'degraded' | 'ok' | 'unknown';

export type JobRequest = {
  name: string,
  type: string,
  protocol: string,
  headers: Headers,
  payload: string,
  endpoint_address: string,
  endpoint_port: number,
  endpoint_additional_params: string,
  polling_interval: number,
  degraded_after: number,
  critical_after: number,
  critical_responses: CriticalResponses,
  uuid: string,
  customer_uuid?: string,
  created_at: number
};

export type JobRequestMessage = {
  topic: string,
  value: string,
  offset: number,
  partition: number,
  highWaterOffset: number,
  key: ?string,
  timestamp: Date
};

export type JobResult = {
  result_uuid: string, // @TODO: subtype uuids as opaque data types
  customer_uuid: string,
  miner_id: string,
  job_uuid: string,
  geo: string,
  asn: number,
  ip_range: string,
  received_on: number,
  status: Status,
  response_time: number
};

export type Emit = (io: Function, msg: JobRequest) => void;
