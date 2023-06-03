import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './store/stateSlice';
import projectReducer from './store/projectSlice';
import boardReducer from './store/boardSlice';
import groupReducer from './store/groupSlice';
import taskReducer from './store/taskSlice';

export const store = configureStore({
  reducer: {
    state: stateReducer,
    projects: projectReducer,
    boards: boardReducer,
    groups: groupReducer,
    tasks: taskReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;