import storyReducer from './storyReducer';
import storiesReducer from './storiesReducer';
import wordsReducer from './wordsReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  story: storyReducer,
  stories: storiesReducer,
  words: wordsReducer,
  error: errorReducer,
});

export default rootReducer;
