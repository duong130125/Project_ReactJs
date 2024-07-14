import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionUser } from "../../store/reducers/users/question";
import { useDispatch, useSelector } from "react-redux";
import { Questions } from "../../interfaces/Users";
import { getExamUserId } from "../../store/reducers/users/exam";

export default function UserQuestion() {
  const [time, setTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [initialTime, setInitialTime] = useState(0);

  const optionLabels = ["A", "B", "C", "D"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const currentExam = useSelector((state: any) => state.userExam.userExam);
  const questions: Questions[] = useSelector(
    (state: any) => state.userQuestion.userQuestion
  );

  useEffect(() => {
    dispatch(getExamUserId(id));
    dispatch(getQuestionUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Khởi tạo thời gian ban đầu
    setInitialTime(currentExam.duration * 60);
    setTime(currentExam.duration * 60);

    // Bắt đầu tính thời gian
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("timeUser", JSON.stringify(updatedTime)); // Lưu thời gian mới vào localStorage
        return updatedTime;
      });
    }, 1000);

    // Xóa interval khi component unmount hoặc khi đã nộp bài
    return () => clearInterval(timerInterval);
  }, [currentExam]);

  const handleOptionChange = (questionId: number, option: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));

    const question = questions.find((q) => q.id === questionId);
    if (question && question.answer === option) {
      setCorrectAnswers((prevCorrect) =>
        prevCorrect.includes(questionId)
          ? prevCorrect
          : [...prevCorrect, questionId]
      );
    } else {
      setCorrectAnswers((prevCorrect) =>
        prevCorrect.filter((id) => id !== questionId)
      );
    }

    // Lưu thời gian mỗi khi thay đổi câu trả lời
    localStorage.setItem("timeUser", JSON.stringify(time));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const totalQuestions = questions.length;
    const correct = correctAnswers.length;
    const incorrect = totalQuestions - correct;
    const score = Math.round((correct / totalQuestions) * 10);
    const timeTaken = initialTime - time; // Tính thời gian đã làm bài

    // Điều hướng đến trang kết quả
    navigate("/results", {
      state: {
        correct,
        incorrect,
        score,
        time: timeTaken,
      },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-5 flex">
        <div className="flex-1 bg-white p-5 shadow rounded mr-5">
          <h1 className="text-3xl font-bold mb-5">Bài Thi</h1>
          <div className="grid grid-cols-2 gap-4">
            {questions.map((question, index) => (
              <div key={question.id} className="mb-5">
                <p className="text-lg mb-2">
                  {index + 1}. {question.question}
                </p>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-2 flex items-center">
                    <input
                      type="radio"
                      id={`question-${question.id}-option-${optionIndex}`}
                      name={`question-${question.id}`}
                      value={option}
                      className="mr-2"
                      onChange={() => handleOptionChange(question.id, option)}
                      checked={userAnswers[question.id] === option}
                    />
                    <label
                      htmlFor={`question-${question.id}-option-${optionIndex}`}
                      className="mr-2"
                    >
                      {optionLabels[optionIndex]}. {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"></div>
        </div>
        <div className="w-64 bg-white p-5 shadow text-center rounded">
          <div className="mb-5">
            <p className="text-2xl font-bold">Time</p>
            <p className="text-2xl">{formatTime(time)}</p>
          </div>
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="block w-full px-4 py-2 bg-red-500 text-white rounded text-center mb-4"
            >
              Nộp bài
            </button>
          )}
          <div>
            <p className="text-2xl font-bold">Câu hỏi</p>
            <div className="grid grid-cols-2 gap-4">
              {questions.map((question, index: number) => (
                <button
                  key={question.id}
                  className="px-2 py-2 bg-blue-500 text-white rounded"
                >
                  Câu hỏi {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
