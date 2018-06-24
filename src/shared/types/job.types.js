// @flow
type DeviceOS = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

type Status = 'critical' | 'degraded' | 'ok' | 'unknown';

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

type ASN = {
  value: string, // AS Number
  amount?: number // amount of nodes to assign with this ASN
};

type GeoData = {
  coords: {
    lat: number,
    lng: number,
    bounds?: number // used for filtration later in roadmap. miners don't report this.
  },
  city?: string,
  country?: string,
  [string]: string // this covers any other arbitrary address microdata
};

type Headers = {
  [string]: string
};

type CriticalResponses = {
  header_status: string,
  body_contains: string
};

export type JobRequest = {
  id: string,
  type: 'job-request',
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
  result_uuid: string,
  customer_uuid: string,
  miner_id: string,
  job_uuid: string,
  geo: GeoData,
  asn: number,
  ip_range: string,
  received_on: number,
  status: Status,
  response_time: number,
  response_body: Object
};

export type Emit = (io: Function, msg: JobRequest) => void;
