// @flow
import { has } from 'lodash';

import { setDeviceLocation } from '../shared/actions/device';

export const setLocationInfo: (dispatch: any) => any = dispatch => {
  return dispatch => {
    if (has(navigator, 'geolocation')) {
    }

    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
      if (has(position, 'coords')) {
        dispatch(
          setDeviceLocation(
            String(position.coords.latitude),
            String(position.coords.longitude)
          )
        );
      }
    });
  };
};

const getPosition = async () => {};
