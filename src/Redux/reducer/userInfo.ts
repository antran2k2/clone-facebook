import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '@/Redux/api/auth';
type TState = {
  id: string | null;
  username: string | null;
  avatar: string | null;
  coins: string | null;
};

const initialState: TState = {id: '', username: '', avatar: null, coins: '0'};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<TState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.coins = action.payload.coins;
    },
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
    setCoins(state, action: PayloadAction<string>) {
      state.coins = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    deleteUserInfo(state) {
      state.username = null;
      state.avatar = null;
      state.coins = null;
      state.id = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.id = payload.data.id;
        state.username = payload.data.username;
        state.avatar = payload.data.avatar;
        state.coins = payload.data.coins;
      },
    );
  },
});

export const {setUserInfo, setAvatar, deleteUserInfo, setUsername, setCoins} =
  infoSlice.actions;
export default infoSlice.reducer;
