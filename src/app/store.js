import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import restReducer from '../features/rest/restSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    rest: restReducer
  },
});
