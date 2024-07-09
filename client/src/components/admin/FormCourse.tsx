import React from "react";

interface CourseFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  course: { title: string; description: string };
  setCourse: (course: { title: string; description: string }) => void;
  handleSave: () => void;
  isEditing: boolean;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  closeModal,
  course,
  setCourse,
  handleSave,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {isEditing ? "Cập Nhật Khóa Thi" : "Thêm Mới Khóa Thi"}
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Tiêu Đề
          </label>
          <input
            id="title"
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            placeholder="Tiêu Đề"
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Mô Tả
          </label>
          <textarea
            id="description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Mô Tả"
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
          >
            {isEditing ? "Cập nhật" : "Thêm Mới"}
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseFormModal;
