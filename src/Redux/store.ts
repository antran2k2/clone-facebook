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
import infoReducer from './reducer/userInfo';
import {ErrorCode} from '@/types/response.type';
import {postApi} from './api/post';
import {commentApi} from './api/comment';

const reducers = combineReducers({
  signUpInfo: signUpInfoReducer,
  auth: authReducer,
  info: infoReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'signUpInfo'],
  blacklist: [authApi.reducerPath, postApi.reducerPath],
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
      postApi.middleware,
      commentApi.middleware,
      rtkQueryErrorLogger,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
