// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
 import authSlice from '../redux/userSlice';

import firewall from '../redux/firewall/firewall';




const store = configureStore({
  reducer: {
    auth: authSlice,

    firewalls: firewall,
//
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware, productApi.middleware),

});

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
