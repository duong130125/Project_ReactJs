import { configureStore } from "@reduxjs/toolkit";
import userAdmin from "./reducers/admin/getUsers";
import courseSlice from "./reducers/admin/getCourses";
export const store = configureStore({
  reducer: {
    user: userAdmin,
    course: courseSlice,
  },
});
