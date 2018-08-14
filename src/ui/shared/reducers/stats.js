// @flow
import { combineReducers } from 'redux';

import { STATS_SET_JOB_COUNT } from '../actions/constants';

const initialStats = {
  jobCompleteCount: 0
};

const stats = (state: any = initialStats, action: any) => {
  switch (action.type) {
    case STATS_SET_JOB_COUNT:
      return {
        jobCompleteCount: action.jobCompleteCount
      };
    default:
      return state;
  }
};

export default stats;

export const getStats = (state: any) => state.stats;
