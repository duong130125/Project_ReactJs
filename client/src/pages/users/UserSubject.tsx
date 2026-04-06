import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getSubjectUser,
  searchSubjects,
} from "../../store/reducers/users/subject";
import { ExamSubjects } from "../../interfaces/Users";
import SearchBar from "../../components/ui/SearchBar";
import Card from "../../components/ui/Card";
import UIButton from "../../components/ui/Button";

export default function UserSubject() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const subjects: ExamSubjects[] = useAppSelector(
    (state: any) => state.userSubject.userSubject
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    dispatch(getSubjectUser(id));
  }, [dispatch, id]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentSubjects = subjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(subjects.length / perPage);

  return (
    <>
      <div className="mb-5">
        <SearchBar
          placeholder="Tìm kiếm môn thi..."
          onSearch={(q) => {
            dispatch(searchSubjects(q));
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
        {currentSubjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.title}
            description={subject.description}
            mediaUrl={subject.image}
            className="animate-fade-in-up"
            actions={
              <UIButton
                size="sm"
                onClick={() =>
                  navigate(`/courseUser/userSubject/userExam/${subject.id}`)
                }
                className="w-full"
              >
                Vào môn
              </UIButton>
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
