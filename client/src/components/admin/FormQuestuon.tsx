import React, { ChangeEvent } from "react";

interface QuestionModalProps {
  questionData: {
    question: string;
    examId: number | null;
    options: string[];
    answer: string;
  };
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleOptionChange: (index: number, value: string) => void;
  handleAddQuestion: () => void;
  handleEditQuestion: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isEditMode: boolean;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  questionData,
  handleInputChange,
  handleOptionChange,
  handleAddQuestion,
  handleEditQuestion,
  setIsModalOpen,
  isEditMode,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Chỉnh Sửa Câu Hỏi" : "Thêm Câu Hỏi Mới"}
        </h2>
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleInputChange}
          placeholder="Câu Hỏi"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="space-y-2">
          {questionData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Đáp Án ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ))}
        </div>
        <input
          type="text"
          name="answer"
          value={questionData.answer}
          onChange={handleInputChange}
          placeholder="Đáp Án Đúng"
          className="w-full p-2 border border-gray-300 rounded mt-4 mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded"
            onClick={isEditMode ? handleEditQuestion : handleAddQuestion}
          >
            {isEditMode ? "Cập Nhật" : "Thêm mới"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
