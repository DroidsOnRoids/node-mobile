// @flow
// device actions
import { DEVICE_INFO_SUCCESS, DEVICE_INFO_FAILURE } from './constants';

export const updateDeviceInfo: (data: any) => any = data => ({
  type: DEVICE_INFO_SUCCESS,
  data
});

export const updateDeviceInfoFail: (data: any) => any = data => ({
  type: DEVICE_INFO_FAILURE,
  message: 'Failure setting device info'
});
