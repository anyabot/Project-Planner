import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './store/stateSlice';

export const store = configureStore({
  reducer: {
    state: stateReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;