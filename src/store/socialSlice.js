import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  followers: 12500,
  engagementRate: 8.2,
  postViews: 45200,
  reach: 89100,
  posts: [],
  loading: false,
  error: null
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setEngagementRate: (state, action) => {
      state.engagementRate = action.payload;
    },
    setPostViews: (state, action) => {
      state.postViews = action.payload;
    },
    setReach: (state, action) => {
      state.reach = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setFollowers, 
  setEngagementRate, 
  setPostViews, 
  setReach, 
  setLoading, 
  setError 
} = socialSlice.actions;

export default socialSlice.reducer; 