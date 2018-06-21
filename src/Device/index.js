// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLocationInfo } from './helpers';

type Props = {
  setLocation: any
};

type State = {
  intervalId: any
};

class Device extends Component<Props, State> {
  componentDidMount() {
    this.props.setLocation();

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
    setLocation: () => dispatch(setLocationInfo())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Device);
