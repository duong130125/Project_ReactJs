import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Courses } from "../../interfaces/Users";
import {
  addCourse,
  deleteCourse,
  editCourse,
  fetchCourses,
} from "../../store/reducers/admin/getCourses";

export default function ManageCourses() {
  const dispatch = useDispatch();
  const courses: Courses[] = useSelector((state: any) => state.course.course);
  console.log(courses);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
  });
  const [editingCourse, setEditingCourse] = useState<null | Courses>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingCourse(null);
    setNewCourse({ title: "", description: "" });
  };

  const handleAddCourse = () => {
    dispatch(addCourse(newCourse));
    closeModal();
  };

  const handleEditCourse = (course: Courses) => {
    setEditingCourse(course);
    setNewCourse(course);
    openModal();
  };

  const handleSaveCourse = () => {
    dispatch(editCourse(newCourse));
    closeModal();
  };

  const handleDeleteCourse = (courseId: number) => {
    dispatch(deleteCourse(courseId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Khóa Thi</h1>
      <button
        onClick={openModal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tiêu Đề</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: Courses, index: number) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{course.title}</td>
              <td className="py-2 px-4 border-b text-center">
                {course.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {editingCourse ? "Cập Nhật Khóa Thi" : "Thêm Mới Khóa Thi"}
            </h2>
            <input
              type="text"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
              placeholder="Tiêu Đề"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              placeholder="Mô Tả"
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={editingCourse ? handleSaveCourse : handleAddCourse}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {editingCourse ? "Lưu" : "Thêm Mới"}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
