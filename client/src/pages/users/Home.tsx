import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLayout from "../../layout/PageLayout";
import Stat from "../../components/ui/Stat";
import SearchBar from "../../components/ui/SearchBar";
import CategoryPills from "../../components/ui/CategoryPills";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserCourses from "./UserCourses";
import UserSubject from "./UserSubject";
import UserExam from "./UserExam";
import {
  HiOutlineBookOpen,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineChevronRight,
} from "react-icons/hi";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | number>("all");

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "math", label: "Toán" },
    { id: "physics", label: "Vật lý" },
    { id: "chemistry", label: "Hóa học" },
    { id: "english", label: "Tiếng Anh" },
    { id: "biology", label: "Sinh học" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const bannerSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
      title: "Học hiệu quả mỗi ngày",
      sub: "Lộ trình cá nhân hóa, theo dõi tiến độ thông minh",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop",
      title: "Ngân hàng đề chất lượng",
      sub: "Đề thi sát thực tế, giải thích chi tiết từng câu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
      title: "Cộng đồng học tập",
      sub: "Kết nối và cùng nhau tiến bộ",
    },
  ];

  const features = [
    {
      icon: <HiOutlineBookOpen className="h-6 w-6" />,
      title: "Thư viện đề thi phong phú",
      desc: "Hàng nghìn đề thi được cập nhật liên tục",
    },
    {
      icon: <HiOutlineLightningBolt className="h-6 w-6" />,
      title: "Luyện tập thông minh",
      desc: "Hệ thống đánh giá và gợi ý bài phù hợp",
    },
    {
      icon: <HiOutlineSparkles className="h-6 w-6" />,
      title: "Kết quả tức thì",
      desc: "Chấm điểm nhanh, phân tích chi tiết",
    },
  ];

  return (
    <PageLayout>
      {/* ─── Hero Section ─── */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up">
            Học hiệu quả mỗi ngày
            <br />
            cùng <span className="text-accent-200">VinaStudy</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Lộ trình rõ ràng, bài tập đa dạng, theo dõi tiến độ thông minh.
          </p>

          <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <SearchBar
              placeholder="Tìm khóa học, môn học, bài thi..."
              onSearch={(q) => console.log("search:", q)}
              className="bg-white/95 shadow-elevated border-0"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto stagger-children">
            <Stat value="1,200+" label="Khóa học & đề thi" icon="📚" />
            <Stat value="50k+" label="Học viên đang học" icon="👩‍🎓" />
            <Stat value="4.8/5" label="Đánh giá trung bình" icon="⭐" />
          </div>
        </div>
      </section>

      {/* ─── Featured Slider ─── */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <Slider {...settings}>
          {bannerSlides.map((slide, i) => (
            <div key={i} className="px-1">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  className="w-full h-[35vh] md:h-[50vh] object-cover"
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                  <h2 className="text-white text-xl md:text-3xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mt-1">
                    {slide.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ─── Features ─── */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-card card-hover animate-fade-in-up"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{f.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main className="bg-gradient-to-b from-slate-50 to-white py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sticky top-24">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
                <HiOutlineSparkles className="h-5 w-5 text-primary-500" />
                Tin nổi bật
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Toán 12 - Luyện đề THPT",
                  "Vật lý - Ôn thi cuối kỳ",
                  "Hóa học - Bài tập nâng cao",
                  "Tiếng Anh - IELTS Prep",
                  "Sinh học - Di truyền",
                  "Toán 11 - Hàm số",
                  "Vật lý 10 - Cơ học",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 transition-colors group"
                    >
                      <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                Khóa học dành cho bạn
              </h2>
              <div className="mb-5">
                <CategoryPills
                  items={categories}
                  activeId={activeCategory}
                  onSelect={setActiveCategory}
                />
              </div>
              <Routes>
                <Route path="/" element={<UserCourses />} />
                <Route
                  path="courseUser/userSubject/:id"
                  element={<UserSubject />}
                />
                <Route
                  path="courseUser/userSubject/userExam/:id"
                  element={<UserExam />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
