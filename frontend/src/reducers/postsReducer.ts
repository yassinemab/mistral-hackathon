import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/api/axiosInstance";

const initialState = {
  loading: true,
  posts: [],
};

/**
 * A thunk action creator that fetches user data from the server.
 * @returns {Promise<any>} - A promise that resolves to the fetched user data.
 */
export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const res = await axiosInstance.get("/api/v1/post/");

  if (res.status !== 200) {
    return initialState;
  }
  return res.data.data.map((post) => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,

      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  });
});

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts: (state: any, action: any) => {
      state.posts = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const documents = action.payload;

        state.loading = false;
        state.posts = documents;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPosts } = postSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.documents.value)`
export const selectPosts = (state: any) => state.posts;

export default postSlice.reducer;
