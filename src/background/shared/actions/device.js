// @flow
// device actions
import {
  DEVICE_SET_LOCATION,
  DEVICE_SET_MINER_ID,
  DEVICE_SET_DEVICE_TYPE
} from './constants';

export const setDeviceLocation: (lat: string, lng: string) => any = (
  lat,
  lng
) => ({
  type: DEVICE_SET_LOCATION,
  data: {
    lat,
    lng
  }
});

export const setDeviceMinerId: (miner_id: string) => any = miner_id => ({
  type: DEVICE_SET_MINER_ID,
  miner_id
});

export const setDeviceDeviceType: (
  device_type: string
) => any = device_type => ({
  type: DEVICE_SET_DEVICE_TYPE,
  device_type
});
