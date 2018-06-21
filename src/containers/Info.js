// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import reducers from '../shared/reducers';

import InfoBox from '../components/InfoBox';

type Props = {
  jobCompleteCount: number,
  jobStatus: boolean
};

class Info extends Component<Props> {
  render() {
    const { jobCompleteCount, jobStatus } = this.props;
    const jobActive = jobStatus ? 'Active' : 'Inactive';

    return (
      <View>
        <InfoBox prefix="Jobs completed: " data={jobCompleteCount} />
        <InfoBox prefix="Status: " data={jobActive} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobCompleteCount: state.stats.jobCompleteCount,
    jobStatus: state.job.jobPending
  };
};

export default connect(mapStateToProps)(Info);
