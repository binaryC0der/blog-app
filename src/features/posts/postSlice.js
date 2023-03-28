import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "http://localhost:3500/posts";

const initialState = {
  posts: [],
  status: 'idle', //"idle" | "loading" | "succeeded" | "failed"
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {

    const response = await axios.get(POSTS_URL)
    return response.data;

});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {

    const response = await axios.post(POSTS_URL,initialPost)
    return response.data;

});

export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
  const {id} = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`,initialPost)
    return response.data;

});

const postSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
  extraReducers(builder){
    builder
    .addCase(fetchPosts.pending,(state,action)=>{
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled,(state,action)=>{
      state.status = 'succeeded';
      let min = 1;

      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(),{minutes:min++}).toISOString();
        return post;
      })     
      state.posts = loadedPosts;
    })
    .addCase(fetchPosts.rejected,(state,action)=>{
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(addNewPost.fulfilled,(state,action) => {
      action.payload.date = new Date().toISOString();
      state.posts.push(action.payload);
    })
    .addCase(updatePost.fulfilled,(state,action) => {
      if(!action.payload?.id){
        console.log("Update could not complete");
        return;
      }
      const {id} = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter(post => post.id!==id);
      state.posts = [...posts,action.payload];
    })
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state,id) => {
  const post = state.posts.posts.find(post => post.id === id);
  return post;
}

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
