import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type UserType = 'manager' | 'staff' | '';

export type AuthState = {
  token: string | null;
  user: any;
  user_type: UserType;
  is_password_change: boolean;
  timezone: string;
  difference: number;
};

const initialState: AuthState = {
  token: null,
  user: {},
  user_type: '',
  is_password_change: false,
  timezone: '',
  difference: 0,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state: AuthState, action: PayloadAction<any>) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.is_password_change = action.payload?.user?.is_password_change;
      state.user_type = action.payload?.user?.type;
      state.timezone = action.payload?.timezone;
      state.difference = action.payload?.difference;
    },
    setCreatePinResponse: (state: AuthState, action: PayloadAction<any>) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.is_password_change = action.payload?.user?.is_password_change;
      state.user_type = action.payload?.user?.type;
    },
    logout: (state: AuthState) => ({
      ...initialState,
    }),
  },
});

export const {logout, setLoginData, setCreatePinResponse} = slice.actions;

export default slice.reducer;
