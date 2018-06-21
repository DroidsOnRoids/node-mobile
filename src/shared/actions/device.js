// @flow
// device actions
import { DEVICE_SET_LOCATION, DEVICE_SET_MINER_ID } from './constants';

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
