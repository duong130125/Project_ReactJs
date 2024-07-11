// src/features/course/courseSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Courses } from "../../../interfaces/Users";

const courseUser: Courses[] = [];

// Fetch all courses
export const getCoursesUser: any = createAsyncThunk(
  "course/getUser",
  async () => {
    const response = await baseUrl.get("courses");
    return response.data;
  }
);

const courseUsers = createSlice({
  name: "course",
  initialState: {
    userCourse: courseUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoursesUser.fulfilled, (state, action) => {
      state.userCourse = action.payload;
    });
  },
});

export default courseUsers.reducer;
