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

  const [questionData, setQuestionData] = useState<Questions>({
    id: 0,
    question: "",
    examId: Number(id),
    options: ["", "", "", ""],
    answer: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions(id) as any);
  }, [dispatch, id]);

  const handleInputChange = (name: string, value: string) => {
    setQuestionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setQuestionData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return { ...prevData, options: newOptions };
    });
  };

  const handleAnswerChange = (value: string) => {
    setQuestionData((prevData) => ({ ...prevData, answer: value }));
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion(questionData) as any);
    resetQuestionData();
    setIsModalOpen(false);
  };

  const handleEditQuestion = () => {
    dispatch(editQuestion(questionData) as any);
    resetQuestionData();
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (questionId: number) => {
    dispatch(deleteQuestion(questionId) as any);
  };

  const openEditModal = (question: Questions) => {
    setQuestionData({
      ...question,
      examId: Number(id),
    });
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const resetQuestionData = () => {
    setQuestionData({
      id: 0,
      question: "",
      examId: Number(id),
      options: ["", "", "", ""],
      answer: "",
    });
    setIsEditMode(false);
  };
  console.log(questionData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Câu Hỏi</h1>
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          resetQuestionData();
          setIsModalOpen(true);
        }}
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
                {question.options.join("; ")}
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

      <QuestionModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        questionData={questionData}
        handleInputChange={handleInputChange}
        handleOptionChange={handleOptionChange}
        handleAnswerChange={handleAnswerChange}
        handleAddQuestion={handleAddQuestion}
        handleEditQuestion={handleEditQuestion}
        isEditMode={isEditMode}
      />
    </div>
  );
}
