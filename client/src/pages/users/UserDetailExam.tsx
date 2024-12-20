const UserDetailExam = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">
          IELTS Simulation Listening test 5
        </h1>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>
            Thời gian làm bài: 40 phút | 4 phần thi | 40 câu hỏi | 253 bình luận
          </span>
          <span>138246 người đã luyện tập đề thi này</span>
        </div>
        <p className="text-sm text-red-500 mt-2">
          Chú ý: để được quy đổi sang scaled score (ví dụ điểm thang điểm 990
          cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ làm FULL TEST.
        </p>
      </div>

      {/* Tab Section */}
      <div className="flex border-b mb-4">
        <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600">
          Thông tin đề thi
        </button>
        <button className="py-2 px-4 text-gray-500">Đáp án/transcript</button>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow">
        <p className="text-green-600 font-semibold mb-4">
          Pro tips: Hình thức luyện tập từng phần và chọn mức thời gian phù hợp
          giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực
          hoàn thành bài thi.
        </p>
        {/* Options */}
        <div className="space-y-4">
          {["Recording 1", "Recording 2", "Recording 3", "Recording 4"].map(
            (recording, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={recording}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={recording} className="text-gray-700">
                  {recording} (10 câu hỏi)
                </label>
              </div>
            )
          )}
        </div>

        {/* Time Selection */}
        <div className="mt-6">
          <label htmlFor="time" className="block text-gray-700 mb-2">
            Giới hạn thời gian (Để trống để làm bài không giới hạn):
          </label>
          <select id="time" className="w-full p-2 border rounded">
            <option value="">-- Chọn thời gian --</option>
            <option value="20">20 phút</option>
            <option value="40">40 phút</option>
          </select>
        </div>

        {/* Submit Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">
          Luyện tập
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Bình luận</h2>
        <textarea
          placeholder="Chia sẻ cảm nghĩ của bạn ..."
          className="w-full p-3 border rounded mb-4"
        ></textarea>
        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          Gửi
        </button>
        <div className="mt-6 space-y-4">
          {[
            {
              name: "ngocdiep9707",
              date: "Tháng 12.08, 2024",
              comment: "Mình là nữ...",
            },
            {
              name: "mynqo.vt2010",
              date: "Tháng 12.06, 2024",
              comment: "First time 34/40",
            },
          ].map((c, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <p className="text-sm text-gray-600 mb-2">
                {c.name}, {c.date}
              </p>
              <p>{c.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailExam;
