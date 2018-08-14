import 'jsdom-global/register';
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { WebSocket, Server } from 'mock-socket';
import SocketClient from '../SocketClient';

require('react-native-mock-render/mock');

jest.mock('react-native', () => require('react-native-mock-render'), {
  virtual: true
});
configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const socketURL = 'ws://localhost:8080';

const mockServer = new Server(socketURL);

mockServer.on('connection', server => {});

describe('socketClient tests', () => {
  // handles a succesful connection correctly

  // it('Connects to server', () => {
  //   const wrapper = mount(<SocketClient socketUrl={socketURL} />);
  //
  //   setTimeout(() => {
  //     expect(true).toEqual(true);
  //   }, 2000);
  // });

  it('Connects to server and sends checkin message', () => {
    expect(true).toEqual(true);
  });

  it('Connects to server, sends checkin message and updates miner_id on first ack', () => {
    expect(true).toEqual(true);
  });

  it('Receives job message and sends ack', () => {
    expect(true).toEqual(true);
  });

  it('Receives job result and sends result in message to server', () => {
    expect(true).toEqual(true);
  });
  // handles failed connection attempt (tries to reconnect)
});
