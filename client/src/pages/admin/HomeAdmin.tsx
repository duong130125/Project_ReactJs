import { useState } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/reducers/authSlice";
import { 
  HiOutlineUsers, 
  HiOutlineBookOpen, 
  HiOutlineCog, 
  HiOutlineBell, 
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineViewGrid
} from "react-icons/hi";

import ManageUser from "./ManageUser";
import ManageCourses from "./ManageCourses";
import ManageSubjects from "./ManageSubjects";
import ManageExams from "./ManageExams";
import ManageQuestions from "./ManageQuestions";

export default function HomeAdmin() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { to: "", label: "Dashboard", icon: <HiOutlineViewGrid className="w-5 h-5" /> }, // could be an overview page, but let's just make it point to base
    { to: "userAd", label: "Quản lý Người dùng", icon: <HiOutlineUsers className="w-5 h-5" /> },
    { to: "coursesAd", label: "Quản lý Khóa học", icon: <HiOutlineBookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:relative shadow-2xl`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <HiOutlineBookOpen className="text-white w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">VinaAdmin</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto">
              <HiOutlineBookOpen className="text-white w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex-1 py-6 overflow-y-auto px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === `/admin/${link.to}` || (link.to === "" && location.pathname === "/admin");
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                title={!isSidebarOpen ? link.label : undefined}
              >
                {link.icon}
                {isSidebarOpen && <span className="font-medium text-sm">{link.label}</span>}
              </Link>
            );
          })}
          
          <div className="pt-8 mb-2">
            {isSidebarOpen && <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3">Khác</span>}
          </div>
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all ${!isSidebarOpen && 'justify-center'}`}
            title="Cài đặt"
          >
            <HiOutlineCog className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Cài đặt hệ thống</span>}
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all ${!isSidebarOpen && 'justify-center'}`}
            title="Đăng xuất"
          >
            <HiOutlineLogout className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors hidden lg:block"
            >
              <HiOutlineMenuAlt2 className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden md:block">Bảng điều khiển</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors">
              <HiOutlineBell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">{user?.name}</p>
                <p className="text-xs font-medium text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-xl rounded-br-sm bg-gradient-to-br from-primary-100 to-accent-100 p-0.5 shadow-sm">
                <img 
                  src={user?.profilePicture} 
                  alt="Admin" 
                  className="w-full h-full rounded-[10px] rounded-br-[2px] object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            <Routes>
              <Route path="/" element={<div className="p-10 text-center text-slate-500">Vui lòng chọn chức năng trên menu.</div>} />
              <Route path="userAd" element={<ManageUser />} />
              <Route path="coursesAd" element={<ManageCourses />} />
              <Route path="coursesAd/subjectAd/:id" element={<ManageSubjects />} />
              <Route path="coursesAd/subjectAd/examAd/:id" element={<ManageExams />} />
              <Route path="coursesAd/subjectAd/examAd/questionAd/:id" element={<ManageQuestions />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-fade-in-up">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineLogout className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Đăng xuất?</h3>
            <p className="text-center text-slate-500 mb-8">Bạn có chắc chắn muốn đăng xuất khỏi phiên làm việc này?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
