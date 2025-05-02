// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://dummyjson.com/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { fetchedUsers: [], addedUsers: [], status: 'idle' },
  reducers: {
    addUser: (state, action) => {
      state.addedUsers.push({ id: Date.now(), ...action.payload });
    },
    deleteUser: (state, action) => {
      state.addedUsers = state.addedUsers.filter(user => user.id !== action.payload);
    },
    deleteFetchedUser: (state, action) => {
      state.fetchedUsers = state.fetchedUsers.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fetchedUsers = action.payload.users.map(user => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`.trim(),
        }));
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUser, deleteUser, deleteFetchedUser } = usersSlice.actions;
export default usersSlice.reducer;
