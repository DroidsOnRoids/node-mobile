// @flow
// device actions
import { STATS_SET_JOB_COUNT } from './constants';

export const updateJobCount: (jobCount: string) => any = jobCount => ({
  type: STATS_SET_JOB_COUNT,
  jobCompleteCount: jobCount
});
