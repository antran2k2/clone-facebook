import {SignUpInfo} from '@/types/user.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TState = {data: SignUpInfo | null};
const initialState: TState = {
  data: null,
};

const userSlice = createSlice({
  name: 'signUpInfo',
  initialState,
  reducers: {
    setSignUpInfo(state, action: PayloadAction<SignUpInfo | null>) {
      if (action.payload == null) {
        state.data = null;
      } else {
        state.data = {...state.data, ...action.payload};
      }
    },
  },
});

export const {setSignUpInfo} = userSlice.actions;

export default userSlice.reducer;
