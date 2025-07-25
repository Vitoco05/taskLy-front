import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  user: null,
  token: null,
};

export const users = createSlice({
  initialState,
  name: "users",
  reducers: {
    createUser: (state, { payload }) => {
      state.user = payload;
    },
    loginUser: (state, { payload }) => {
      console.log("Payload loginUser reducer:", payload);
      state.user = payload.user;
      state.token = payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { createUser, loginUser, logoutUser } = users.actions;

export const createUserThunk = (data) => (dispatch) => {
  return axios
    .post(`${BASE_URL}/users`, data)
    .then(() => dispatch(createUser(data)))
    .catch((error) => console.error(error));
};

export const loginUserThunk = (data) => (dispatch) => {
  return axios.post(`${BASE_URL}/users/login`, data).then((res) => {
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(loginUser({ user, token }));
    return user
  });
  
};

export const logoutUserThunk = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(logoutUser());
};

export const verifyTokenThunk = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if(!token) return;

  return axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then(({ data }) => {
  if (data.isVerified) {
    console.log("data del /me:", data)
    dispatch(loginUser({ user: data, token }));
  } else {
    throw new Error("User not verified");
  }
});
};

export default users.reducer;
