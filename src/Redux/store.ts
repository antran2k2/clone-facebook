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
import {friendApi} from './api/friend';
import {blockApi} from './api/block';
import {searchApi} from './api/search';
import {settingApi} from './api/setting';
import {notificationApi} from './api/notification';
import {profileApi} from './api/profile';
const reducers = combineReducers({
  signUpInfo: signUpInfoReducer,
  auth: authReducer,
  info: infoReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [blockApi.reducerPath]: blockApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'signUpInfo', 'info'],
  blacklist: [
    authApi.reducerPath,
    postApi.reducerPath,
    commentApi.reducerPath,
    friendApi.reducerPath,
    blockApi.reducerPath,
    searchApi.reducerPath,
    settingApi.reducerPath,
    notificationApi.reducerPath,
  ],
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
      friendApi.middleware,
      blockApi.middleware,
      searchApi.middleware,
      settingApi.middleware,
      notificationApi.middleware,
      profileApi.middleware,
      rtkQueryErrorLogger,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
