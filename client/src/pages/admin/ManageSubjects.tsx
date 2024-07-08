import React, { useState } from "react";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([
    { id: 1, title: "Môn Thi 1", description: "Mô tả cho môn thi 1" },
    { id: 2, title: "Môn Thi 2", description: "Mô tả cho môn thi 2" },
    { id: 3, title: "Môn Thi 3", description: "Mô tả cho môn thi 3" },
  ]);

  const [newSubject, setNewSubject] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleAddSubject = () => {
    if (newSubject.title && newSubject.description) {
      const newId = subjects.length ? subjects[subjects.length - 1].id + 1 : 1;
      setSubjects([...subjects, { id: newId, ...newSubject }]);
      setNewSubject({ title: "", description: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quản Lý Môn Thi</h1>
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsModalOpen(true)}
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
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {subject.title}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {subject.description}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Sửa
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Thêm Môn Thi Mới</h2>
              <input
                type="text"
                name="title"
                value={newSubject.title}
                onChange={handleInputChange}
                placeholder="Tiêu Đề"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea
                name="description"
                value={newSubject.description}
                onChange={handleInputChange}
                placeholder="Mô Tả"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleAddSubject}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
