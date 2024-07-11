import { useEffect, useState } from "react";
import { Users } from "../../interfaces/Users";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAd,
  toggleUserLock,
  deleteUser,
  searchUsers,
  sortUsers,
} from "../../store/reducers/admin/getUsers";
import NewUserForm from "../../components/admin/FormNewUser";

export default function ManageUser() {
  const getData: Users[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const handleToggleLock = (id: number) => {
    dispatch(toggleUserLock(id));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quản Lý người dùng</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleModalVisibility}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thêm mới
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>
      {isModalVisible && <NewUserForm setModalVisible={setModalVisible} />}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">STT</th>
            <th className="py-3 px-6 text-center">Họ và tên</th>
            <th className="py-3 px-6 text-center">Profile</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Trạng thái</th>
            <th className="py-3 px-6 text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((item: Users, index: number) => (
            <tr
              className="hover:bg-gray-100 border-b border-gray-200 py-10"
              key={item.id}
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-center">{item.name}</td>
              <td className="py-3 px-6 text-center">
                <img
                  src={item.profilePicture}
                  alt={item.name}
                  className="rounded-full w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-3 px-6 text-center">{item.email}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleToggleLock(item.id)}
                  className={`${
                    item.status
                      ? "text-red-500 hover:text-red-600"
                      : "text-green-500 hover:text-green-600"
                  }`}
                >
                  {item.status ? "Khóa" : "Mở khóa"}
                </button>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDeleteUser(item.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
