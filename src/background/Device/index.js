// @flow
import { setLocationInfo, setDeviceType } from './helpers';

export default class Device {
  store: any = {};
  intervalId: any;

  constructor(store: any) {
    this.store = store;
    this.store.dispatch(setDeviceType());
    this.store.dispatch(setLocationInfo());

    // Update location every 30 seconds
    const intervalId = setInterval(() => {
      this.store.dispatch(setLocationInfo());
    }, 30000);
    this.intervalId = intervalId;
  }
}
