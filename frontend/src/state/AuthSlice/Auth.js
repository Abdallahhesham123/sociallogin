
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import * as api from "../Apis.js";
const initialState = {
  mode: "light",
  user: null,
  error: "",
  loading: false,
}

export const loginFetch = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log("asd",formValue);
      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      console.log("loginresponse",response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ googleAccessToken, navigate, toast }, { rejectWithValue }) => {
    try {
    
      const response = await api.googleSignIn(googleAccessToken);
      toast.success("Login Successfully");
      navigate("/");
      console.log("loginresponse",response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const facebookSignIn = createAsyncThunk(
  "auth/facebookSignIn",
  async ({ res, navigate, toast }, { rejectWithValue }) => {
    try {
    console.log(res);
      const response = await api.facebookSignIn(res);
      toast.success("Login Successfully");
      navigate("/chat");
      console.log("loginresponse",response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GithubSignIn = createAsyncThunk(
  "auth/GithubSignIn",
  async ({ res, navigate, toast }, { rejectWithValue }) => {
    try {
    console.log(res);
      const response = await api.GithubSignIn(res);
      toast.success("Login Successfully");
      navigate("/");
      console.log("loginresponse",response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      
      const response = await api.signUp(formValue);
      toast.success("Register Successfully Please check your mail");
      navigate("/login");
      console.log("registerresponse",response.data.ok)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setUser: (state, action) => {
        state.user = action.payload;
  
      },
      setLogout: (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.error="";
        state.loading= false;
        
      }
    },
    extraReducers: {
      [loginFetch.pending]: (state, action) => {
        state.loading = true;
      },
      [loginFetch.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.result;
        state.error="";
      },
      [loginFetch.rejected]: (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message
      },

      [googleSignIn.pending]: (state, action) => {
        state.loading = true;
      },
      [googleSignIn.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.result;
        state.error="";
      },
      [googleSignIn.rejected]: (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message
      },

      [facebookSignIn.pending]: (state, action) => {
        state.loading = true;
      },
      [facebookSignIn.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.result;
        state.error="";
      },
      [facebookSignIn.rejected]: (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message
      },


      [GithubSignIn.pending]: (state, action) => {
        state.loading = true;
      },
      [GithubSignIn.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.result;
        state.error="";
      },
      [GithubSignIn.rejected]: (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload?.message
      },


      [register.pending]: (state, action) => {
        state.loading = true;
        
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log("fullfiledregister",action.payload);
      },
      [register.rejected]: (state, action) => {
        state.loading = false;
        console.log("rejectedregister0",action.payload);
        state.error = action.payload.message;
      },
    }


  })
  
  // Action creators are generated for each case reducer function
  export const {setMode ,setUser, setLogout  } = authSlice.actions
  
  export default authSlice.reducer