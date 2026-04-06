import { HiOutlineAcademicCap } from "react-icons/hi";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Điều khoản dịch vụ", href: "#" },
    { label: "Thư viện câu hỏi", href: "#" },
    { label: "Khóa học & Bài giảng", href: "#" },
    { label: "Hỏi đáp bài tập", href: "#" },
    { label: "Tài liệu tham khảo", href: "#" },
  ];

  const subjects = [
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Tiếng Anh",
    "Ngữ văn",
    "Lịch sử",
    "Địa lý",
  ];

  const socials = [
    { icon: <FaFacebookF />, href: "#", color: "hover:bg-blue-500" },
    { icon: <FaYoutube />, href: "#", color: "hover:bg-red-500" },
    { icon: <FaTwitter />, href: "#", color: "hover:bg-sky-500" },
    { icon: <FaInstagram />, href: "#", color: "hover:bg-pink-500" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                <HiOutlineAcademicCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                VinaStudy
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Tầng 2, số nhà 541 Vũ Tông Phan, Khương Đình, Thanh Xuân, Hà Nội
            </p>
            <p className="text-sm text-slate-400">📞 084 283 4585</p>
            <p className="text-sm text-slate-400">✉️ contact@vinastudy.vn</p>

            <div className="flex gap-2 mt-5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-400 ${s.color} hover:text-white transition-all duration-200`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2.5">
              {links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-white font-semibold mb-4">Môn thi</h4>
            <ul className="grid grid-cols-2 gap-2.5">
              {subjects.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nhận tin mới</h4>
            <p className="text-sm text-slate-400 mb-4">
              Đăng ký để nhận thông tin về đề thi mới và khuyến mãi.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-primary-400 transition"
              />
              <button
                type="button"
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            © 2024 VinaStudy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
