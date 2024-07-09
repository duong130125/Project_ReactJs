import React from "react";

interface ExamModalProps {
  isEditMode: boolean;
  examData: {
    id?: number | null;
    title: string;
    description: string;
    duration: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}

const ExamModal: React.FC<ExamModalProps> = ({
  isEditMode,
  examData,
  handleInputChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Chỉnh Sửa Đề Thi" : "Thêm Đề Thi Mới"}
        </h2>
        <input
          type="text"
          name="title"
          value={examData.title}
          onChange={handleInputChange}
          placeholder="Tiêu Đề"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          name="description"
          value={examData.description}
          onChange={handleInputChange}
          placeholder="Mô Tả"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="number"
          name="duration"
          value={examData.duration}
          onChange={handleInputChange}
          placeholder="Thời Gian Thi (phút)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-violet-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isEditMode ? "Cập Nhật" : "Thêm Mới"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={closeModal}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamModal;
