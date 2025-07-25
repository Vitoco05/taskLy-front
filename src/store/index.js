import { configureStore } from "@reduxjs/toolkit";
import  usersReducer from "./slices/users.slice";
import  tasksReducer from "./slices/tasks.slice";


export default configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer
  }
})