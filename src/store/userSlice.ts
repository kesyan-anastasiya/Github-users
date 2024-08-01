import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  login: string;
  avatar_url: string;
  type: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (searchTerm: string, { getState }) => {
    const state = getState() as { user: UserState };
    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchTerm}&page=${state.user.page}&per_page=10`
    );
    return response.data.items as User[];
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const { incrementPage, decrementPage } = userSlice.actions;
export default userSlice.reducer;