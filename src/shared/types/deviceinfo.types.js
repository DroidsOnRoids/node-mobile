// @flow
type Device = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

export type DeviceInfo = {
  miner_id?: string,
  cidr?: string,
  asn?: string,
  lat?: string,
  lon?: string,
  device_type: Device
};

export type DeviceOptions = {
  wallet: string,
  wifi_only: boolean
};
