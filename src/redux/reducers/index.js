import { combineReducers } from 'redux';
import { lensesReducer } from 'redux-lenses-streaming';
import { sessionReducer } from './sessionReducer';
import { timelineReducer } from './timelineReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  timeline: timelineReducer,
  lenses: lensesReducer,
});

export default rootReducer;
