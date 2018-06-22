// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLocationInfo, setDeviceType } from './helpers';

type Props = {
  setLocation: any,
  setDeviceDeviceType: any
};

type State = {
  intervalId: any
};

class Device extends Component<Props, State> {
  componentDidMount() {
    this.props.setDeviceDeviceType();

    this.props.setLocation();

    setTimeout(() => {
      console.log(this.props.device);
    }, 4000);
    // Update location every 30 seconds
    const intervalId = setInterval(this.props.setLocation, 30000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocation: () => dispatch(setLocationInfo()),
    setDeviceDeviceType: () => dispatch(setDeviceType())
  };
};

const mapStateToProps = state => {
  return {
    device: state.device,
    options: state.options
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Device);
