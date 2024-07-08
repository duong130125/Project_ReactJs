import { useState } from "react";

export default function ManageExams() {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Đề Thi 1",
      description: "Mô tả cho đề thi 1",
      duration: 90,
    },
    {
      id: 2,
      title: "Đề Thi 2",
      description: "Mô tả cho đề thi 2",
      duration: 120,
    },
  ]);

  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleAddExam = () => {
    if (newExam.title && newExam.description && newExam.duration) {
      const newId = exams.length ? exams[exams.length - 1].id + 1 : 1;
      setExams([
        ...exams,
        { id: newId, ...newExam, duration: parseInt(newExam.duration) },
      ]);
      setNewExam({ title: "", description: "", duration: "" });
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quản Lý Đề Thi</h1>
        <button
          className="bg-violet-800 text-white px-4 py-2 rounded mb-4"
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
              <th className="py-2 px-4 border-b">Thời Gian Thi (phút)</th>
              <th className="py-2 px-4 border-b">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={exam.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">{exam.title}</td>
                <td className="py-2 px-4 border-b">{exam.description}</td>
                <td className="py-2 px-4 border-b text-center">
                  {exam.duration}
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
              <h2 className="text-xl font-bold mb-4">Thêm Đề Thi Mới</h2>
              <input
                type="text"
                name="title"
                value={newExam.title}
                onChange={handleInputChange}
                placeholder="Tiêu Đề"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea
                name="description"
                value={newExam.description}
                onChange={handleInputChange}
                placeholder="Mô Tả"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="number"
                name="duration"
                value={newExam.duration}
                onChange={handleInputChange}
                placeholder="Thời Gian Thi (phút)"
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
                  onClick={handleAddExam}
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
