import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ExamSubjects } from "../../interfaces/Users";
import {
  addSubject,
  deleteSubject,
  editSubject,
  fetchSubjects,
} from "../../store/reducers/admin/getSubject";
import SubjectModal from "../../components/admin/FormSubject";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageSubjects() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  const subjects: ExamSubjects[] = useSelector(
    (state: any) => state.subject.subject
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [subjectData, setSubjectData] = useState({
    title: "",
    description: "",
    courseId: Number(id),
  });

  useEffect(() => {
    dispatch(fetchSubjects(id));
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubjectData({ ...subjectData, [name]: value });
  };

  const handleAddSubject = () => {
    if (subjectData.title && subjectData.description) {
      dispatch(addSubject(subjectData));
      setSubjectData({
        title: "",
        description: "",
        courseId: Number(id),
      });
      setIsModalOpen(false);
    }
  };

  const handleEditSubject = () => {
    if (subjectData.title && subjectData.description) {
      dispatch(editSubject(subjectData));
      setSubjectData({
        title: "",
        description: "",
        courseId: Number(id),
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteSubject = (subjectId: number) => {
    dispatch(deleteSubject(subjectId));
  };

  const openAddModal = () => {
    setSubjectData({
      title: "",
      description: "",
      courseId: Number(id),
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (subject: any) => {
    setSubjectData(subject);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/examAd/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Môn Thi</h1>
      <button
        className="bg-amber-500 text-white px-4 py-2 rounded mb-4"
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
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject: ExamSubjects, index: number) => (
            <tr key={subject.id} onClick={() => handleNext(subject.id)}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {subject.title}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {subject.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => openEditModal(subject)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteSubject(subject.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <SubjectModal
          isEditMode={isEditMode}
          subjectData={subjectData}
          handleInputChange={handleInputChange}
          handleSubmit={isEditMode ? handleEditSubject : handleAddSubject}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
