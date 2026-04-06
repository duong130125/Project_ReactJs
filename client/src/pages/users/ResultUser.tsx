import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../layout/PageLayout";
import { LocationState } from "../../interfaces/Users";

const ResultUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const scoreColor =
    state.score >= 8
      ? "from-green-400 to-emerald-500"
      : state.score >= 5
      ? "from-amber-400 to-orange-500"
      : "from-red-400 to-rose-500";

  const total = state.correct + state.incorrect;
  const percent = total > 0 ? Math.round((state.correct / total) * 100) : 0;

  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg animate-fade-in-up">
          {/* Score Circle */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-elevated p-8 text-center">
            <h1 className="text-2xl font-extrabold text-slate-800 mb-6">
              🎉 Kết quả bài thi
            </h1>

            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${percent * 3.14} 314`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-gradient-primary">
                  {state.score}
                </span>
                <span className="text-sm text-slate-500">/10 điểm</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {state.correct}
                </div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  ✅ Câu đúng
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <div className="text-2xl font-bold text-red-600">
                  {state.incorrect}
                </div>
                <div className="text-xs text-red-600 font-medium mt-1">
                  ❌ Câu sai
                </div>
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary-600">
                  {percent}%
                </div>
                <div className="text-xs text-primary-600 font-medium mt-1">
                  📊 Tỉ lệ đúng
                </div>
              </div>
              <div className="bg-accent-50 border border-accent-100 rounded-2xl p-4">
                <div className="text-2xl font-bold text-accent-600">
                  {formatTime(state.time)}
                </div>
                <div className="text-xs text-accent-600 font-medium mt-1">
                  ⏱️ Thời gian
                </div>
              </div>
            </div>

            {/* Message */}
            <div
              className={`inline-block px-6 py-2.5 rounded-full bg-gradient-to-r ${scoreColor} text-white font-semibold text-sm mb-6`}
            >
              {state.score >= 8
                ? "🏆 Xuất sắc!"
                : state.score >= 5
                ? "👍 Khá tốt!"
                : "💪 Cần cố gắng thêm!"}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Về trang chủ
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 transition-all"
              >
                Làm lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultUser;
