import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../../api/api";
import { UserAnswers } from "../../../interfaces/Users";

export const getUserAnswers = createAsyncThunk(
  "userAnswers/getUserAnswers",
  async (userId: number) => {
    const response = await httpClient.get(`userAnswers?userId=${userId}`);
    return response.data;
  }
);

export interface UserAnswerState {
  userAnswers: UserAnswers[];
}

const initialState: UserAnswerState = {
  userAnswers: [],
};

const userAnswersSlice = createSlice({
  name: "userAnswers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAnswers.fulfilled, (state, action) => {
      state.userAnswers = action.payload;
    });
  },
});

export default userAnswersSlice.reducer;
