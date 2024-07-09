import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Questions } from "../../interfaces/Users";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  fetchQuestions,
} from "../../store/reducers/admin/getQuestions";
import { useParams } from "react-router-dom";
import QuestionModal from "../../components/admin/FormQuestuon";

export default function ManageQuestions() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const questions: Questions[] = useSelector(
    (state: any) => state.question.question
  );

  const [questionData, setQuestionData] = useState({
    question: "",
    examId: Number(id),
    options: ["", "", "", ""],
    answer: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions(id));
  }, [dispatch, id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleAddQuestion = () => {
    if (
      questionData.question &&
      questionData.options.every((option) => option) &&
      questionData.answer
    ) {
      dispatch(addQuestion(questionData));
      resetQuestionData();
    }
  };

  const handleEditQuestion = () => {
    if (
      questionData.question &&
      questionData.options.every((option) => option) &&
      questionData.answer
    ) {
      dispatch(editQuestion(questionData));
      resetQuestionData();
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    dispatch(deleteQuestion(questionId));
  };

  const openEditModal = (question: any) => {
    setQuestionData(question);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const resetQuestionData = () => {
    setQuestionData({
      question: "",
      examId: Number(id),
      options: ["", "", "", ""],
      answer: "",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Câu Hỏi</h1>
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Câu Hỏi</th>
            <th className="py-2 px-4 border-b">Đáp Án</th>
            <th className="py-2 px-4 border-b">Đáp Án Đúng</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {question.question}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.options.join(", ")}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.answer}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => openEditModal(question)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <QuestionModal
          questionData={questionData}
          handleInputChange={handleInputChange}
          handleOptionChange={handleOptionChange}
          handleAddQuestion={handleAddQuestion}
          handleEditQuestion={handleEditQuestion}
          setIsModalOpen={setIsModalOpen}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}
