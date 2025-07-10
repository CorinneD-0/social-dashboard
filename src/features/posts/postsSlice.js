import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsAPI } from '../../services/api';

// Thunk per ottenere tutti i post
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await postsAPI.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk per ottenere un post specifico
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      return await postsAPI.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk per creare un nuovo post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const newPost = {
        ...postData,
        id: Date.now(), // ID temporaneo
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      };
      return await postsAPI.create(newPost);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk per aggiornare un post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      return await postsAPI.update(id, postData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk per eliminare un post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await postsAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk per like/unlike un post
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async ({ postId, currentLikes }, { rejectWithValue }) => {
    try {
      const newLikes = currentLikes + 1;
      const updatedPost = await postsAPI.update(postId, { likes: newLikes });
      return { postId, likes: newLikes };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single post
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost && state.currentPost.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost = null;
        }
      })
      // Toggle like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.likes = likes;
        }
        if (state.currentPost && state.currentPost.id === postId) {
          state.currentPost.likes = likes;
        }
      });
  },
});

export const { clearError, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer; 