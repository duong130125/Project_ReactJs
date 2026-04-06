import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import userAdmin from "./reducers/admin/getUsers";
import courseSlice from "./reducers/admin/getCourses";
import subjectsSlice from "./reducers/admin/getSubject";
import examsSlice from "./reducers/admin/getExam";
import questionsSlice from "./reducers/admin/getQuestions";
import courseUsers from "./reducers/users/courses";
import subjectUsers from "./reducers/users/subject";
import examUsers from "./reducers/users/exam";
import questionUsers from "./reducers/users/question";
import userAnswers from "./reducers/users/userAnswers";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userAdmin,
    course: courseSlice,
    subject: subjectsSlice,
    exam: examsSlice,
    question: questionsSlice,
    userCourse: courseUsers,
    userSubject: subjectUsers,
    userExam: examUsers,
    userQuestion: questionUsers,
    userAnswer: userAnswers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
