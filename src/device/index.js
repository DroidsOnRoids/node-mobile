// @flow
import * as IpSubnetCalculator from 'ip-subnet-calculator';
import type { Store } from 'redux';

import { updateDeviceInfo } from '../shared/actions/device';

const setDeviceLocationInfo = async () => {
  const geo = navigator.geolocation;

  const deviceLocationData = {
    cidr: '1.2.3.4/12',
    asn: '12335'
  };

  return deviceLocationData;
};

const setInfo: (store: Store) => Promise<void> = async store => {
  const { dispatch } = store;
  const deviceLocationInfo = await setDeviceLocationInfo();
};

const deviceHandle = {
  setInfo
};

export default deviceHandle;
