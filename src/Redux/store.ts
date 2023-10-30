import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authApi} from './api/auth';
import authReducer, {setToken} from './reducer/auth';
import signUpInfoReducer from './reducer/signUpInfo';
import {ErrorCode} from '@/types/response.type';

const reducers = combineReducers({
  signUpInfo: signUpInfoReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const rtkQueryErrorLogger: Middleware = api => next => action => {
  if (isRejectedWithValue(action)) {
    if (action.payload.response_code === ErrorCode.NOT_ACCESS) {
      api.dispatch(setToken(null));
      //   api.dispatch(setUser(null));
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM =>
    gDM({serializableCheck: false}).concat(
      authApi.middleware,
      rtkQueryErrorLogger,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
