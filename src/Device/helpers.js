// @flow
import { Platform } from 'react-native';
import { has } from 'lodash';

import {
  setDeviceLocation,
  setDeviceDeviceType
} from '../shared/actions/device';

export const setLocationInfo: (dispatch: any) => any = dispatch => {
  return dispatch => {
    if (has(navigator, 'geolocation')) {
      console.log('Refreshing location');
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
        .then(position => {
          if (has(position, 'coords')) {
            dispatch(
              setDeviceLocation(
                String(position.coords.latitude),
                String(position.coords.longitude)
              )
            );
          }
        })
        .catch(error => {
          console.log('Location services not available');
        });
    }
  };
};

export const setDeviceType: (dispatch: any) => any = dispatch => {
  const device_type = Platform.OS;
  return dispatch => {
    dispatch(setDeviceDeviceType(device_type));
  };
};

const getPosition = async () => {};
