import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getQuestionUser } from "../../store/reducers/users/question";
import { getExamUserId } from "../../store/reducers/users/exam";
import { Questions } from "../../interfaces/Users";
import httpClient from "../../api/api";
import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

export default function UserQuestion() {
  const [time, setTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [initialTime, setInitialTime] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const optionLabels = ["A", "B", "C", "D"];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentExam = useAppSelector((state: any) => state.userExam.userExam);
  const questions: Questions[] = useAppSelector(
    (state: any) => state.userQuestion.userQuestion
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getExamUserId(id));
    dispatch(getQuestionUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    const timeUserLocal = localStorage.getItem("timeUser");
    if (timeUserLocal && !isSubmitted) {
      setTime(parseInt(timeUserLocal, 10));
      setInitialTime(currentExam.duration * 60);
    } else {
      setInitialTime(currentExam.duration * 60);
      setTime(currentExam.duration * 60);
    }

    const storedAnswers = localStorage.getItem("userAnswers");
    if (storedAnswers) {
      setUserAnswers(JSON.parse(storedAnswers));
    }
  }, [currentExam, isSubmitted]);

  useEffect(() => {
    let timerInterval: any;
    if (!isSubmitted) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          const updatedTime = prevTime > 0 ? prevTime - 1 : 0;
          localStorage.setItem("timeUser", JSON.stringify(updatedTime));
          if (updatedTime === 0) {
            handleSubmit();
          }
          return updatedTime;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const timePercent = initialTime > 0 ? (time / initialTime) * 100 : 100;
  const isTimeLow = time < 60;

  const handleSubmit = () => {
    setIsSubmitted(true);
    const getTime = localStorage.getItem("timeUser");
    const totalQuestions = questions.length;
    const correct = questions.filter(
      (q) => userAnswers[q.id] === q.answer
    ).length;
    const incorrect = totalQuestions - correct;
    const score = Math.round((correct / totalQuestions) * 10);
    const timeTaken = initialTime - Number(getTime);

    const nameExam = currentExam.title;

    const userResult = {
      userId: user?.id,
      examId: Number(id),
      nameExam,
      score,
    };

    try {
      httpClient.post("userAnswers", userResult);
    } catch (error) {
      console.error("Lỗi lưu kết quả:", error);
    }

    navigate("/results", {
      state: { correct, incorrect, score, time: timeTaken },
    });
    localStorage.removeItem("timeUser");
    localStorage.removeItem("userAnswers");
  };

  const handleOptionChange = (questionId: number, option: string) => {
    const newAnswers = { ...userAnswers, [questionId]: option };
    setUserAnswers(newAnswers);
    localStorage.setItem("userAnswers", JSON.stringify(newAnswers));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = questions[activeQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {currentExam.title || "Bài Thi"}
            </h1>
            <p className="text-xs text-slate-500">
              {answeredCount}/{questions.length} câu đã trả lời
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${
                isTimeLow
                  ? "bg-red-50 text-red-600 animate-pulse"
                  : "bg-primary-50 text-primary-600"
              }`}
            >
              <HiOutlineClock className="h-5 w-5" />
              {formatTime(time)}
            </div>
            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 shadow-md shadow-red-200 transition-all"
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className={`h-full transition-all duration-1000 ${
              isTimeLow ? "bg-red-500" : "bg-gradient-to-r from-primary-400 to-accent-400"
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Main Question Area */}
        <div className="flex-1 min-w-0">
          {currentQ && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {activeQuestion + 1}
                </span>
                <h2 className="text-lg font-bold text-slate-800">
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const selected = userAnswers[currentQ.id] === option;
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selected
                          ? "border-primary-400 bg-primary-50 shadow-md shadow-primary-100"
                          : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={option}
                        checked={selected}
                        onChange={() =>
                          handleOptionChange(currentQ.id, option)
                        }
                        className="sr-only"
                      />
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          selected
                            ? "bg-primary-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {optionLabels[idx]}
                      </span>
                      <span
                        className={`text-sm ${
                          selected
                            ? "text-primary-700 font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        {option}
                      </span>
                      {selected && (
                        <HiOutlineCheckCircle className="h-5 w-5 text-primary-500 ml-auto" />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setActiveQuestion((p) => Math.max(0, p - 1))}
                  disabled={activeQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <HiOutlineChevronLeft className="h-4 w-4" /> Câu trước
                </button>
                <span className="text-sm text-slate-500">
                  {activeQuestion + 1} / {questions.length}
                </span>
                <button
                  onClick={() =>
                    setActiveQuestion((p) =>
                      Math.min(questions.length - 1, p + 1)
                    )
                  }
                  disabled={activeQuestion === questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Câu sau <HiOutlineChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Question Navigator Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 sticky top-24">
            <h3 className="text-sm font-bold text-slate-800 mb-4">
              Danh sách câu hỏi
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const answered = !!userAnswers[q.id];
                const isActive = idx === activeQuestion;
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestion(idx)}
                    className={`w-full aspect-square rounded-lg text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md scale-105"
                        : answered
                        ? "bg-primary-100 text-primary-700 border border-primary-200"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-primary-100 border border-primary-200" />
                Đã trả lời ({answeredCount})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-100" />
                Chưa trả lời ({questions.length - answeredCount})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
