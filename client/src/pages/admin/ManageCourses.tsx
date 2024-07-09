import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Courses } from "../../interfaces/Users";
import {
  addCourse,
  deleteCourse,
  editCourse,
  fetchCourses,
} from "../../store/reducers/admin/getCourses";
import CourseFormModal from "../../components/admin/FormCourse";
import { useNavigate } from "react-router-dom";

export default function ManageCourses() {
  const dispatch = useDispatch();
  const courses: Courses[] = useSelector((state: any) => state.course.course);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
  });
  const [editingCourse, setEditingCourse] = useState<null | Courses>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/${id}`);
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
            <tr key={course.id} onClick={() => handleNext(course.id)}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{course.title}</td>
              <td className="py-2 px-4 border-b text-center">
                {course.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
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

      <CourseFormModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        course={newCourse}
        setCourse={setNewCourse}
        handleSave={editingCourse ? handleSaveCourse : handleAddCourse}
        isEditing={!!editingCourse}
      />
    </div>
  );
}
