import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getExamUser, searchExams } from "../../store/reducers/users/exam";
import { Exams } from "../../interfaces/Users";
import SearchBar from "../../components/ui/SearchBar";
import Card from "../../components/ui/Card";
import UIButton from "../../components/ui/Button";
import { HiOutlineClock } from "react-icons/hi";

export default function UserExam() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const exams: Exams[] = useAppSelector(
    (state: any) => state.userExam.userExam
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    dispatch(getExamUser(id));
  }, [dispatch, id]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentExams = exams.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(exams.length / perPage);

  const handleNext = (id: number) => {
    localStorage.removeItem("timeUser");
    navigate(`/userQuestion/${id}`);
  };

  return (
    <>
      <div className="mb-5">
        <SearchBar
          placeholder="Tìm kiếm đề thi..."
          onSearch={(q) => {
            dispatch(searchExams(q));
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
        {currentExams.map((exam) => (
          <Card
            key={exam.id}
            title={exam.title}
            description={exam.description}
            mediaUrl={exam.image}
            badge={`${exam.duration} phút`}
            className="animate-fade-in-up"
            actions={
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <HiOutlineClock className="h-4 w-4" />
                  {exam.duration} phút
                </span>
                <UIButton size="sm" onClick={() => handleNext(exam.id)}>
                  Vào đề thi
                </UIButton>
              </div>
            }
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                  : "border border-slate-200 hover:bg-primary-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
