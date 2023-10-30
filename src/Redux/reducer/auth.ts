import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '@/Redux/api/auth';
type TState = {
  token: string | null;
};

const initialState: TState = {token: null};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.data.refresh_token;
      },
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, _) => {
      state.token = null;
    });
  },
});

export const {setToken} = authSlice.actions;

export default authSlice.reducer;
