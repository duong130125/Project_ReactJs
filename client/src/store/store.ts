import { configureStore } from "@reduxjs/toolkit";
import userAdmin from "./reducers/admin/getUsers";
import courseSlice from "./reducers/admin/getCourses";
import subjectsSlice from "./reducers/admin/getSubject";
import examsSlice from "./reducers/admin/getExam";
import questionsSlice from "./reducers/admin/getQuestions";

export const store = configureStore({
  reducer: {
    user: userAdmin,
    course: courseSlice,
    subject: subjectsSlice,
    exam: examsSlice,
    question: questionsSlice,
  },
});
