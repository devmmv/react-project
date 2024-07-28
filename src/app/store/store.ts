import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peoples';
import { swApi } from '../swApi';

const store = configureStore({
  reducer: { people: peopleReducer, [swApi.reducerPath]: swApi.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
