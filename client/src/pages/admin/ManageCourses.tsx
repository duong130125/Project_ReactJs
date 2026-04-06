import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Courses } from "../../interfaces/Users";
import {
  addCourse,
  deleteCourse,
  editCourse,
  fetchCourses,
} from "../../store/reducers/admin/getCourses";
import CourseFormModal from "../../components/admin/FormCourse";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlus, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineSearch, HiOutlineBookOpen } from "react-icons/hi";

export default function ManageCourses() {
  const dispatch = useAppDispatch();
  const courses: Courses[] = useAppSelector(
    (state) => state.course.course as Courses[]
  );

  const [newCourse, setNewCourse] = useState<any>({
    title: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2069&auto=format&fit=crop",
  });
  const [editingCourse, setEditingCourse] = useState<null | Courses>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter((c) => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * perPage;
  const indexOfFirstCourse = indexOfLastCourse - perPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / perPage);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingCourse(null);
    setNewCourse({
      title: "",
      description: "",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2069&auto=format&fit=crop",
    });
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
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      dispatch(deleteCourse(courseId));
    }
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/${id}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Quản Lý Khóa Học</h1>
          <p className="text-sm text-slate-500 mt-1">Danh sách chuyên đề, luyện thi trọng tâm</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-5 py-2 whitespace-nowrap bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-200 transition-all"
          >
            <HiOutlinePlus className="w-5 h-5" /> Thêm khóa học
          </button>
        </div>
      </div>

      {currentCourses.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <HiOutlineBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg font-medium">Không tìm thấy khóa học nào phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course: Courses) => (
            <div 
              key={course.id} 
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-elevated transition-shadow flex flex-col"
            >
              <div 
                className="relative h-40 overflow-hidden cursor-pointer"
                onClick={() => handleNext(course.id)}
              >
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold truncate pr-8">{course.title}</h3>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
                
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleNext(course.id)}
                    className="flex-1 py-1.5 px-3 bg-primary-50 text-primary-600 text-sm font-semibold rounded-lg hover:bg-primary-100 transition-colors text-center"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-2 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-lg transition-colors"
                    title="Sửa"
                  >
                    <HiOutlinePencilAlt className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end mt-8 gap-2 border-t border-slate-100 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            ‹
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
            ›
          </button>
        </div>
      )}

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
