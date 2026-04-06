import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAd,
  toggleUserLock,
  deleteUser,
  searchUsers,
  sortUsers,
  updateUserRole,
} from "../../store/reducers/admin/getUsers";
import NewUserForm from "../../components/admin/FormNewUser";
import { Users } from "../../interfaces/Users";
import { Select } from "antd";
import { HiOutlineSearch, HiOutlinePlus, HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineTrash } from "react-icons/hi";

export default function ManageUser() {
  const dispatch = useDispatch();
  const allUsers: Users[] = useSelector((state: any) => state.user.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { Option } = Select;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    dispatch(getUserAd());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchUsers(searchQuery));
  }, [searchQuery, dispatch]);

  useEffect(() => {
    dispatch(
      sortUsers({ order: sortOrder === "asc" ? "asc" : "desc", field: "name" })
    );
  }, [sortOrder, dispatch]);

  // Pagination logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / perPage);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const handleToggleLock = (id: number) => {
    dispatch(toggleUserLock(id));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleRoleChange = (userId: number, newRole: number) => {
    dispatch(updateUserRole({ userId, newRole }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản Lý Người Dùng</h1>
          <p className="text-sm text-slate-500 mt-1">Danh sách tất cả học viên và quản trị viên</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Tìm kiếm user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-36">
            <Select
              className="w-full h-9 rounded-xl"
              value={sortOrder}
              onChange={(value) => setSortOrder(value)}
            >
              <Option value="asc">Tăng dần (A-Z)</Option>
              <Option value="desc">Giảm dần (Z-A)</Option>
            </Select>
          </div>

          <button
            onClick={toggleModalVisibility}
            className="flex items-center justify-center gap-2 px-5 py-2 whitespace-nowrap bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 transition-all"
          >
            <HiOutlinePlus className="w-5 h-5" /> Thêm mới
          </button>
        </div>
      </div>

      {isModalVisible && <NewUserForm setModalVisible={setModalVisible} />}

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full bg-white whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">STT</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Người dùng</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Vai trò</th>
              <th className="py-4 px-6 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
              <th className="py-4 px-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentUsers.map((user: Users, index: number) => (
              <tr className="hover:bg-slate-50 transition-colors group" key={user.id}>
                <td className="py-4 px-6 text-sm text-slate-500 font-medium">#{indexOfFirstUser + index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Select
                    value={user.role}
                    onChange={(value) => handleRoleChange(user.id, value)}
                    style={{ width: 130 }}
                  >
                    <Option value={0}>Học viên</Option>
                    <Option value={1}>Admin</Option>
                  </Select>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleToggleLock(user.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                      user.status
                        ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700" 
                        : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                    }`}
                  >
                    {user.status ? <HiOutlineLockOpen className="w-4 h-4"/> : <HiOutlineLockClosed className="w-4 h-4" />}
                    {user.status ? "Hoạt động" : "Bị khóa"}
                  </button>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">Không tìm thấy người dùng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Trang trước
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-200"
                  : "border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
