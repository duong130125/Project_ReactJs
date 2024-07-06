import { configureStore } from "@reduxjs/toolkit";
import userAdmin from "./reducers/admin/getUsers";
export const store = configureStore({
  reducer: {
    user: userAdmin,
  },
});
