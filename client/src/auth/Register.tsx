import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser } from "../store/reducers/authSlice";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

const InputField = ({
  icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  showToggle,
}: any) => {
  const [showPw, setShowPw] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={showToggle ? (showPw ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-${
            showToggle ? "10" : "4"
          } py-3 rounded-xl border ${
            error ? "border-red-400" : "border-slate-200"
          } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm`}
        />
        {showToggle && (
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
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Vui lòng nhập họ và tên";
    if (!email) e.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email không hợp lệ";
    if (!password) e.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 6) e.password = "Mật khẩu ít nhất 6 ký tự";
    if (password !== confirm) e.confirm = "Mật khẩu xác nhận không khớp";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(registerUser({ name, email, password }));

    if (registerUser.fulfilled.match(result)) {
      notification.success({
        message: "Đăng ký thành công",
        description: "Tài khoản đã được tạo. Vui lòng đăng nhập.",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Đăng ký thất bại",
        description: result.payload as string,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-50 via-white to-primary-50 px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-elevated overflow-hidden animate-fade-in-up">
        {/* Left - Image */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
            alt="Books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-white text-2xl font-bold">Tham gia cùng VinaStudy</h2>
            <p className="text-white/80 text-sm mt-2">
              Hàng nghìn học viên đã tin tưởng lựa chọn nền tảng của chúng tôi.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gradient-primary">
              Đăng ký
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Tạo tài khoản miễn phí để bắt đầu luyện thi ngay hôm nay.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<HiOutlineUser className="h-5 w-5" />}
              label="Họ và tên"
              value={name}
              onChange={setName}
              placeholder="Nguyễn Văn A"
              error={errors.name}
            />
            <InputField
              icon={<HiOutlineMail className="h-5 w-5" />}
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              error={errors.email}
            />
            <InputField
              icon={<HiOutlineLockClosed className="h-5 w-5" />}
              label="Mật khẩu"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              error={errors.password}
              showToggle
            />
            <InputField
              icon={<HiOutlineLockClosed className="h-5 w-5" />}
              label="Xác nhận mật khẩu"
              type="password"
              value={confirm}
              onChange={setConfirm}
              placeholder="••••••••"
              error={errors.confirm}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-lg shadow-primary-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </span>
              ) : (
                "Tạo tài khoản"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
