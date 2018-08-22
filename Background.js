// @flow
import Device from './src/background/Device';
import JobRunner from './src/background/JobRunner';
import SocketClient from './src/background/SocketClient';
import reduxStore from './src/background/shared/store/reduxStore';

const BackgroundTask: () => any = async () => {
  const store = await reduxStore();
  console.log('In background');
  const device = new Device(store);
  const socket = new SocketClient(store);
  const jobRunner = new JobRunner(store);
};

export default BackgroundTask;
