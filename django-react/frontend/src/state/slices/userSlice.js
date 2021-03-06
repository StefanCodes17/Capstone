import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api, { updateAccessToken } from '../../../config';


export const signin = createAsyncThunk(
  'user/signin',
  async (credentials, thunkAPI) => {
    try {
      const tokenResponse = await api.post("/api/users/token", credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("Got the tokens: ", tokenResponse);
      // save tokens
      localStorage.setItem("access", tokenResponse.data["access"])
      localStorage.setItem("refresh", tokenResponse.data["refresh"])
      // update the token axios uses
      updateAccessToken(tokenResponse.data["access"]);
      // Now that API is authorized, try to fetch user data
      const userInfoResponse = await api.get("/api/users/get_user");
      console.log("Got user info: ", userInfoResponse);
      return userInfoResponse.data;
    } catch(err) {
      console.log("Couldn't sign in, didn't get tokens");
      console.log(err);
      throw err;
    }
  }
);

/**
 * This thunk reloads user info if the access token still works
 */
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (options, thunkAPI) => {
    const token = localStorage.getItem("access")
    // update the token axios uses
    updateAccessToken(token);
    // Now that API is authorized, try to fetch user data
    const userInfoResponse = await api.get("/api/users/get_user");
    return userInfoResponse.data;
  }
);

/**
 * This thunk is for creating a user.
 * @param newCredentials  an object with username, email, password
 */
export const signup = createAsyncThunk(
  'user/signup',
  (newCredentials, thunkAPI) => {
    return (
      api.post("/api/users/register", newCredentials)
      .then(response => response.data)
    );
  }
);


const loggedOutUser = {
  isLoggedIn: false,
  created: false,
  loading: false,
  error: false,
};

export const userSlice= createSlice({
  name: 'user',
  initialState: Object.assign({}, loggedOutUser),
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    },
  },
  // Used to handle actions made by the thunks
  extraReducers: builder => {
    builder.addCase(signin.pending, (state, action) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.error = false;
    })
    .addCase(signin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = false;
      // update redux state
      Object.assign(state, action.payload);
    })
    .addCase(signin.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = true;
    })
    // fetchUser
    .addCase(fetchUser.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.isLoggedIn = true;
    })
    // sign up
    .addCase(signup.pending, (state, action) => {
      state.isLoggedIn = false;
      state.created = false;
      state.loading = true;
      state.error = false;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.created = true;
      state.loading = false;
      state.error = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.created = false;
      state.loading = false;
      state.error = true;
    })
  },
});


export const { logout } = userSlice.actions

/**
 * This is a selector, which retrieves the logged in User model from the redux state
 * This is username, email, id, etc.
 */
export const getUser = (state) => state.user

export default userSlice.reducer
