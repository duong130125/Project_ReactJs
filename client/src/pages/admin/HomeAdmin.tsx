import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCog,
  FaChartPie,
  FaBell,
  FaSignOutAlt,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
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

export default function HomeAdmin() {
  const getData: Users[] = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

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
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-07-05_092039-removebg-preview.png?alt=media&token=99a1c0ae-d1ab-4f6c-a3d4-38fa5bae033d"
              alt="logo admin"
              className="w-28 h-14 mr-4"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              Admin Dashboard
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative"></div>
            <FaBell className="text-white text-xl" />
            <span className="text-white">Welcome, Admin</span>
            <img
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
              alt="User Avatar"
              className="rounded-full w-10 h-10"
            />
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex">
        <nav className="w-64 bg-gradient-to-b from-white to-gray-200 shadow-lg min-h-screen p-4">
          <ul className="space-y-4">
            <li className="flex items-center p-2 hover:bg-blue-200 rounded-md text-blue-500">
              <FaUsers className="mr-2" /> Users
            </li>
            <li className="flex items-center p-2 hover:bg-green-200 rounded-md text-green-500">
              <FaBook className="mr-2" /> Exams
            </li>
            <li className="ml-6 flex items-center p-2 hover:bg-yellow-200 rounded-md text-yellow-500">
              <FaClipboardList className="mr-2" /> Subjects
            </li>
            <li className="ml-12 flex items-center p-2 hover:bg-purple-200 rounded-md text-purple-500">
              <FaFileAlt className="mr-2" /> Tests
            </li>
            <li className="ml-18 flex items-center p-2 hover:bg-pink-200 rounded-md text-pink-500">
              <FaQuestionCircle className="mr-2" /> Questions
            </li>
            <li className="flex items-center p-2 hover:bg-purple-200 rounded-md text-purple-500">
              <FaChartPie className="mr-2" /> Analytics
            </li>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-md text-gray-500">
              <FaCog className="mr-2" /> Settings
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-6">
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
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </select>
            </div>
          </div>
          {isModalVisible && <NewUserForm setModalVisible={setModalVisible} />}
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">STT</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Profile</th>
                <th className="py-3 px-6 text-left">Trạng thái</th>
                <th className="py-3 px-6 text-left">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item: Users, index: number) => (
                <tr
                  className="hover:bg-gray-100 border-b border-gray-200 py-10"
                  key={item.id}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{item.email}</td>
                  <td className="py-3 px-6 text-left">{item.profilePicture}</td>
                  <td className="py-3 px-6 text-left">
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
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleDeleteUser(item.id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
