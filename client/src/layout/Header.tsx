import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/reducers/authSlice";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineAcademicCap,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/courses", label: "Khóa học" },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-primary-300 transition-shadow">
            <HiOutlineAcademicCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-extrabold text-gradient-primary tracking-tight">
            VinaStudy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <HiOutlineX className="h-6 w-6 text-slate-700" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 text-slate-700" />
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <img
                  src={user.profilePicture}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-slate-700 hidden sm:inline max-w-[120px] truncate">
                  {user.name}
                </span>
                <HiOutlineChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-elevated border border-slate-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/userHome"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <HiOutlineUser className="h-4 w-4" /> Hồ sơ cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiOutlineLogout className="h-4 w-4" /> Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                  Đăng nhập
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 transition-all duration-200">
                  Đăng ký
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="pt-3 flex gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl transition-all">
                    Đăng ký
                  </button>
                </Link>
              </div>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <HiOutlineLogout className="h-4 w-4" /> Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
