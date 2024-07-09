import React from "react";

interface SubjectModalProps {
  isEditMode: boolean;
  subjectData: { id?: number | null; title: string; description: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  isEditMode,
  subjectData,
  handleInputChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Chỉnh Sửa Môn Thi" : "Thêm Môn Thi Mới"}
        </h2>
        <input
          type="text"
          name="title"
          value={subjectData.title}
          onChange={handleInputChange}
          placeholder="Tiêu Đề"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          name="description"
          value={subjectData.description}
          onChange={handleInputChange}
          placeholder="Mô Tả"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isEditMode ? "Cập Nhật" : "Thêm mới"}
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

export default SubjectModal;
