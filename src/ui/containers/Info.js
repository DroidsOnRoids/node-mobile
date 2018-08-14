// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import reducers from '../shared/reducers';

import InfoBox from '../components/InfoBox';

type Props = {
  jobCompleteCount: number
};

class Info extends Component<Props> {
  render() {
    const { jobCompleteCount } = this.props;

    return (
      <View>
        <InfoBox prefix="Jobs completed: " data={jobCompleteCount} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobCompleteCount: state.stats.jobCompleteCount
  };
};

export default connect(mapStateToProps)(Info);
