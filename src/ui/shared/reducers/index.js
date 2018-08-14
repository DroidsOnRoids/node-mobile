// @flow
import { combineReducers } from 'redux';
import options, * as fromOptions from './options';
import stats, * as fromStats from './stats';

const reducers = combineReducers({
  options,
  stats
});

export default reducers;

export const getOptions = (state: any) => fromOptions.getOptions(state.options);
export const getOptionsErrorMessage = (state: any) =>
  fromOptions.getErrorMessage(state.options);

export const getStats = (state: any) => fromStats.getStats(state.stats);
