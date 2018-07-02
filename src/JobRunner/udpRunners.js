// @flow
import type { MinerJobRequest, Status } from '../shared/types/job.types';
import type { Action, Thunk } from '../shared/types/action.types';

import { jobResultSuccess, jobResultFailure } from '../shared/actions/job';
