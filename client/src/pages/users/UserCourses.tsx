import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCoursesUser,
  searchCourses,
} from "../../store/reducers/users/courses";
import { Courses } from "../../interfaces/Users";
import Modal from "../../components/user/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Card from "../../components/ui/Card";
import UIButton from "../../components/ui/Button";

export default function UserCourses() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const courses: Courses[] = useAppSelector(
    (state: any) => state.userCourse.userCourse
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCoursesUser());
  }, [dispatch]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / perPage);

  const handleCourseClick = (id: number) => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      navigate(`courseUser/userSubject/${id}`);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={() => navigate("/login")}
      />
      <div className="mb-5">
        <SearchBar
          placeholder="Tìm kiếm khóa học..."
          onSearch={(q) => {
            dispatch(searchCourses(q));
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
        {currentCourses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            description={course.description}
            mediaUrl={course.image}
            className="animate-fade-in-up"
            actions={
              <UIButton
                size="sm"
                onClick={() => handleCourseClick(course.id)}
                className="w-full"
              >
                Xem chi tiết
              </UIButton>
            }
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-200"
                  : "border border-slate-200 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
