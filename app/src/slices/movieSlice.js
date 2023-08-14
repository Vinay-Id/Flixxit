import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  plusUser:false
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    fetchMoviesData: (state, action) => {
      state.movies = action.payload;
    },
    membership: (state) => {
      state.plusUser =!state.plusUser;
      ;
    },
  },
});

export const { fetchMoviesData,membership } = movieSlice.actions;

export default movieSlice.reducer;
