// @flow
type Headers = {
  [string]: string
};

type CriticalResponses = {
  header_status: string,
  body_contains: string
};

type Status = 'critical' | 'degraded' | 'ok' | 'unknown';

type Device = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

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

// 'amount' is spread across ASNs evenly unless "ASN.amount" is present,
// in which case "Filters.amount" should == sum of all "ASN.amount" values.
type Filters = {
  amount?: number, // amount of nodes to perform job
  ASN?: ASN[],
  devices?: Device[], // hardware type of nodes to perform job
};

export type JobRequest = {
  name: string,
  type: string,
  filters: Filters,
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
  value: string
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
  geo: GeoData,
  asn: number,
  ip_range: string,
  received_on: number,
  status: Status,
  response_time: number
};

export type Emit = (io: Function, msg: JobRequest) => void;
