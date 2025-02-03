import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type CommonState = {
  clients: any[];
  venues: any[];
  users: any[];
};

const initialState: CommonState = {
  clients: [],
  venues: [],
  users: [],
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setClients: (state: CommonState, action: PayloadAction<any>) => {
      state.clients = action.payload;
    },
    setVenues: (state: CommonState, action: PayloadAction<any>) => {
      state.venues = action.payload;
    },
    setUsers: (state: CommonState, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export const {setClients, setVenues, setUsers} = slice.actions;

export default slice.reducer;
