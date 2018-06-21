// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLocationInfo } from './helpers';

type Props = {
  setLocation: any
};

class Device extends Component<Props> {
  componentDidMount() {
    this.props.setLocation();
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
