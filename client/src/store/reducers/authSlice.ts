import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import httpClient from "../../api/api";

// ─── Types ───
interface AuthUser {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
  role: number;
  status: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// ─── Helpers ───
function getStoredAuth(): { user: AuthUser | null; token: string | null } {
  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  return {
    user: userStr ? JSON.parse(userStr) : null,
    token: token || null,
  };
}

// ─── Thunks ───
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    payload: { email: string; password: string; remember: boolean },
    { rejectWithValue }
  ) => {
    try {
      // json-server-auth POST /login
      const res = await httpClient.post("login", {
        email: payload.email,
        password: payload.password,
      });
      const token: string = res.data.accessToken;

      // Fetch thêm thông tin user đầy đủ
      const userRes = await httpClient.get(`users?email=${encodeURIComponent(payload.email)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = userRes.data[0];

      if (!userData) throw new Error("Không tìm thấy user");
      if (userData.status === false)
        throw new Error("Tài khoản đã bị khóa");

      const user: AuthUser = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        profilePicture: userData.profilePicture,
        role: userData.role,
        status: userData.status,
      };

      // Lưu storage
      const storage = payload.remember ? localStorage : sessionStorage;
      storage.setItem("accessToken", token);
      storage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (err: any) {
      const msg =
        err.message === "Tài khoản đã bị khóa"
          ? err.message
          : err.response?.status === 400
          ? "Email hoặc mật khẩu không chính xác"
          : "Có lỗi xảy ra khi đăng nhập";
      return rejectWithValue(msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // json-server-auth POST /register
      const res = await httpClient.post("register", {
        email: payload.email,
        password: payload.password,
        name: payload.name,
        role: 0,
        status: true,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
      });
      return res.data;
    } catch (err: any) {
      const msg =
        err.response?.status === 400
          ? "Email đã được sử dụng"
          : "Có lỗi xảy ra khi đăng ký";
      return rejectWithValue(msg);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    payload: { id: number; name: string; profilePicture: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await httpClient.patch(`users/${payload.id}`, {
        name: payload.name,
        profilePicture: payload.profilePicture,
      });
      
      const updatedUser = res.data;
      
      // Update local storage
      const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        const newUserObj = { ...userObj, name: payload.name, profilePicture: payload.profilePicture };
        if (localStorage.getItem("user")) localStorage.setItem("user", JSON.stringify(newUserObj));
        if (sessionStorage.getItem("user")) sessionStorage.setItem("user", JSON.stringify(newUserObj));
      }

      return updatedUser;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Cập nhật thất bại");
    }
  }
);

// ─── Slice ───
const stored = getStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored.user,
    token: stored.token,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { 
            ...state.user, 
            name: action.payload.name, 
            profilePicture: action.payload.profilePicture 
          };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
