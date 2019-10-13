import { combineReducers } from "redux";
import realmReducer from './realmReducer';

const rootReducer = combineReducers({
  realm: realmReducer
});

export default rootReducer;
