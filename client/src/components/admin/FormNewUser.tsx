import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers/admin/getUsers";
import { notification } from "antd";

const NewUserForm = ({
  setModalVisible,
}: {
  setModalVisible: (visible: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
    role: 0,
    status: true,
    password: "",
  });

  const handleAddUser = (e: any) => {
    e.preventDefault();
    dispatch(addUser(newUser));
    setNewUser({
      name: "",
      email: "",
      profilePicture: "",
      role: 0,
      status: true,
      password: "",
    });
    setModalVisible(false);
    notification.success({
      message: "Thành công",
      description: "Thêm mới thành công",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Thêm mới người dùng
        </h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={newUser.profilePicture}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  profilePicture: e.target.value,
                })
              }
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setModalVisible(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
