import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Exams } from "../../interfaces/Users";
import {
  addExam,
  deleteExam,
  editExam,
  fetchExams,
} from "../../store/reducers/admin/getExam";
import ExamModal from "../../components/admin/FormExam";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageExams() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const exams: Exams[] = useSelector((state: any) => state.exam.exam);

  const [examData, setExamData] = useState({
    title: "",
    description: "",
    duration: "",
    examSubjectId: Number(id),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchExams(id));
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleAddExam = () => {
    if (examData.title && examData.description && examData.duration) {
      dispatch(addExam({ ...examData, duration: parseInt(examData.duration) }));
      setExamData({
        title: "",
        description: "",
        duration: "",
        examSubjectId: Number(id),
      });
      setIsModalOpen(false);
    }
  };

  const handleEditExam = () => {
    if (examData.title && examData.description && examData.duration) {
      dispatch(
        editExam({ ...examData, duration: parseInt(examData.duration) })
      );
      setExamData({
        title: "",
        description: "",
        duration: "",
        examSubjectId: Number(id),
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteExam = (examId: number) => {
    dispatch(deleteExam(examId));
  };

  const openAddModal = () => {
    setExamData({
      title: "",
      description: "",
      duration: "",
      examSubjectId: Number(id),
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (exam: any) => {
    setExamData(exam);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/examAd/questionAd/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Đề Thi</h1>
      <button
        className="bg-violet-800 text-white px-4 py-2 rounded mb-4"
        onClick={openAddModal}
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tiêu Đề</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Thời Gian Thi (phút)</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam: Exams, index: number) => (
            <tr key={exam.id} onClick={() => handleNext(exam.id)}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{exam.title}</td>
              <td className="py-2 px-4 border-b">{exam.description}</td>
              <td className="py-2 px-4 border-b text-center">
                {exam.duration}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => openEditModal(exam)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteExam(exam.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ExamModal
          isEditMode={isEditMode}
          examData={examData}
          handleInputChange={handleInputChange}
          handleSubmit={isEditMode ? handleEditExam : handleAddExam}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
