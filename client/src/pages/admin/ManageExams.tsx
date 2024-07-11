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

  const [newExam, setNewExam] = useState<any>({
    title: "",
    description: "",
    duration: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/29.jpg?alt=media&token=07ec6572-9c97-41e7-bfee-e5c229a98f16",
    examSubjectId: Number(id),
  });
  const [editingExam, setEditingExam] = useState<null | Exams>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExams(id));
  }, [dispatch]);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingExam(null);
    setNewExam({
      title: "",
      description: "",
      duration: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/29.jpg?alt=media&token=07ec6572-9c97-41e7-bfee-e5c229a98f16",
      examSubjectId: Number(id),
    });
  };

  const handleAddExam = () => {
    dispatch(addExam({ ...newExam, duration: parseInt(newExam.duration) }));
    closeModal();
  };

  const handleEditExam = (exam: Exams) => {
    setEditingExam(exam);
    setNewExam(exam);
    openModal();
  };

  const handleSaveExam = () => {
    dispatch(editExam({ ...newExam, duration: parseInt(newExam.duration) }));
    closeModal();
  };

  const handleDeleteExam = (examId: number) => {
    dispatch(deleteExam(examId));
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/examAd/questionAd/${id}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Đề Thi</h1>
      <button
        onClick={openModal}
        className="bg-violet-600 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tiêu Đề</th>
            <th className="py-2 px-4 border-b">Hình Ảnh</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Thời Gian Thi (phút)</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam: Exams, index: number) => (
            <tr key={exam.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td
                className="py-2 px-4 border-b text-center"
                onClick={() => handleNext(exam.id)}
              >
                {exam.title}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="rounded-50 w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                {exam.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {exam.duration}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditExam(exam);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteExam(exam.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ExamModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        exam={newExam}
        setExam={setNewExam}
        handleSave={editingExam ? handleSaveExam : handleAddExam}
        isEditing={!!editingExam}
      />
    </div>
  );
}
