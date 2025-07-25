import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  tasks: [],
};

const tasks = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload
    },
    createTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    },
    updateTask: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if(index !== -1) {
        state.tasks[index] = payload
      }
    }
  },
});

export const { setTasks, createTask, deleteTask, updateTask } = tasks.actions;

export const getTasksThunk = () => (dispatch) => {
  const token = localStorage.getItem("token");
  axios.get(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(({data}) => dispatch(setTasks(data)))
  .catch((error) => console.error(error))
}

export const createTaskThunk = (taskData) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .post(`${BASE_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({data}) => dispatch(createTask(data)))
    .catch((error) => console.error(error));
};

export const deleteTaskThunk = (tasksId) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .delete(`${BASE_URL}/tasks/${tasksId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => dispatch(deleteTask({ id: tasksId })))
    .catch((error) => console.error(error))
}

export const updateTaskThunk  = (tasksId, taskData) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .patch(`${BASE_URL}/tasks/${tasksId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then(({ data }) => dispatch(updateTask(data)))
    .catch((error) => console.error(error));
}

export default tasks.reducer;