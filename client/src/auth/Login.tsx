import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser, clearError } from "../store/reducers/authSlice";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email không hợp lệ";
    if (!password) e.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 4) e.password = "Mật khẩu quá ngắn";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(clearError());

    const result = await dispatch(loginUser({ email, password, remember }));

    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;
      notification.success({
        message: "Đăng nhập thành công",
        description: `Chào mừng ${user.name}!`,
      });
      navigate(user.role === 1 ? "/admin" : "/");
    } else {
      const msg = result.payload as string;
      if (msg === "Tài khoản đã bị khóa") {
        notification.warning({
          message: "Tài khoản bị khóa",
          description: "Vui lòng liên hệ admin để biết thêm chi tiết.",
        });
      } else {
        notification.error({
          message: "Đăng nhập thất bại",
          description: msg,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-elevated overflow-hidden animate-fade-in-up">
        {/* Left - Image */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop"
            alt="Education"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-white text-2xl font-bold">VinaStudy</h2>
            <p className="text-white/80 text-sm mt-2">
              Nền tảng luyện thi trực tuyến hàng đầu với ngân hàng đề chất lượng cao.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gradient-primary">
              Đăng nhập
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Chào mừng bạn quay lại! Đăng nhập để tiếp tục học tập.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                    errors.password ? "border-red-400" : "border-slate-200"
                  } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? (
                    <HiOutlineEyeOff className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-primary-500 focus:ring-primary-400"
                />
                <span className="text-slate-600">Nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg shadow-primary-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </span>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
