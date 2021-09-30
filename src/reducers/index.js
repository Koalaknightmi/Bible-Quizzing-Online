import { combineReducers } from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import socketReducer from './socket/index'
import typeQuizzingReducer from './typeQuizzing/index'
import flashCardsReducer from './flashCards/index'

const rootReducer = combineReducers({
  socketState: socketReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  typeQuizzing: typeQuizzingReducer,
  flashCards: flashCardsReducer,
});
 
export default rootReducer;