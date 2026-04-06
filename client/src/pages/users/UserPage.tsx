import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserAnswers } from "../../store/reducers/users/userAnswers";
import { UserAnswers } from "../../interfaces/Users";
import PageLayout from "../../layout/PageLayout";
import {
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineCog,
} from "react-icons/hi";
import { updateUserProfile } from "../../store/reducers/authSlice";
import { notification } from "antd";

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const userAnswers: UserAnswers[] = useAppSelector(
    (state: any) => state.userAnswer?.userAnswers || [],
  );

  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({ name: "", profilePicture: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, profilePicture: user.profilePicture });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await dispatch(
          updateUserProfile({
            id: user.id,
            name: formData.name,
            profilePicture: formData.profilePicture,
          }),
        ).unwrap();
        notification.success({
          message: "Thành công",
          description: "Thông tin của bạn đã được cập nhật thành công!",
        });
      } catch (err: any) {
        notification.error({
          message: "Thất bại",
          description: err || "Không thể cập nhật thông tin lúc này.",
        });
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAnswers(user.id));
    }
  }, [dispatch, user]);

  if (!user) return null;

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-100 overflow-hidden animate-fade-in-up">
            {/* Header Banner */}
            <div className="h-40 md:h-52 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 relative">
              <div className="absolute inset-0 bg-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
            </div>

            <div className="px-6 md:px-10 pb-10">
              {/* Profile Block */}
              <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 md:-mt-24 mb-10">
                <div className="relative group">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-3xl border-4 border-white shadow-xl bg-white"
                  />
                  <button className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white shadow-md hover:from-primary-600 hover:to-primary-700 transition">
                    <HiOutlineUser className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    {user.name}
                  </h1>
                  <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 mt-2 font-medium">
                    <HiOutlineMail className="w-5 h-5" /> {user.email}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit mx-auto md:mx-0">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "overview"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Tổng quan
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "history"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Lịch sử làm bài
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "settings"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Cài đặt tài khoản
                </button>
              </div>

              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-primary-500 flex items-center justify-center mx-auto mb-4 text-xl">
                      <HiOutlineAcademicCap />
                    </div>
                    <div className="text-3xl font-extrabold text-primary-600">
                      {userAnswers.length}
                    </div>
                    <div className="text-sm font-medium text-primary-800 mt-2">
                      Bài thi đã làm
                    </div>
                  </div>

                  <div className="bg-accent-50 border border-accent-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-accent-500 flex items-center justify-center mx-auto mb-4 text-xl">
                      ⭐
                    </div>
                    <div className="text-3xl font-extrabold text-accent-600">
                      {userAnswers.length > 0
                        ? (
                            userAnswers.reduce(
                              (acc, curr) => acc + curr.score,
                              0,
                            ) / userAnswers.length
                          ).toFixed(1)
                        : "0"}
                    </div>
                    <div className="text-sm font-medium text-accent-800 mt-2">
                      Điểm trung bình
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-emerald-500 flex items-center justify-center mx-auto mb-4 text-xl">
                      🏆
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-600">
                      Thành viên
                    </div>
                    <div className="text-sm font-medium text-emerald-800 mt-2">
                      Hạng tài khoản
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: History */}
              {activeTab === "history" && (
                <div className="animate-fade-in">
                  {userAnswers.length > 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200 uppercase tracking-wider">
                            <th className="py-4 px-6 font-semibold">
                              Tên bài thi
                            </th>
                            <th className="py-4 px-6 font-semibold text-center w-32">
                              Điểm số
                            </th>
                            <th className="py-4 px-6 font-semibold w-40">
                              Trạng thái
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {userAnswers.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-slate-50 transition-colors group"
                            >
                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                                  {item.nameExam}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-center">
                                <span
                                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${item.score >= 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                  {item.score}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                {item.score >= 5 ? (
                                  <span className="inline-flex py-1 px-3 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">
                                    Đạt
                                  </span>
                                ) : (
                                  <span className="inline-flex py-1 px-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
                                    Không đạt
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <HiOutlineClock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">
                        Chưa có dữ liệu bài thi nào.
                      </p>
                      <button className="mt-4 px-6 py-2.5 bg-white text-primary-600 font-semibold border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors shadow-sm">
                        Làm bài ngay
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Settings */}
              {activeTab === "settings" && (
                <div className="animate-fade-in max-w-2xl mx-auto">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <HiOutlineCog className="w-6 h-6 text-primary-500" />
                      Cá nhân hóa tài khoản
                    </h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Ảnh đại diện (URL)
                        </label>
                        <input
                          type="text"
                          value={formData.profilePicture}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              profilePicture: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm text-slate-800"
                        />
                        {formData.profilePicture && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-500 mb-2">
                              Xem trước ảnh mới:
                            </p>
                            <img
                              src={formData.profilePicture}
                              alt="Preview Avatar"
                              className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100"
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg")
                              }
                            />
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="submit"
                          disabled={authLoading}
                          className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 transition-all disabled:opacity-60"
                        >
                          {authLoading ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
