// @flow
import type { UserOptions } from './option.types';

type DeviceOS = 'android' | 'ios' | 'chrome' | 'firefox' | 'desktop';

export type DeviceInfo = {
  miner_id?: string,
  lat?: string,
  lon?: string,
  device_type: DeviceOS
};

export type DeviceOptions = {
  wallet: string,
  wifi_only: boolean
};

export type Device = {
  info: DeviceInfo,
  options: UserOptions
};
