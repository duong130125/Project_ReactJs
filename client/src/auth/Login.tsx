import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="gradient-custom flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto">
          <div className="hidden md:block md:w-1/3">
            <img
              src="https://img.lovepik.com/original_origin_pic/18/11/27/137f9dc94ac924466aa154bcbc13531e.jpg_wh860.jpg"
              alt="Canyon"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 p-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
            <form>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Nhớ đăng nhập
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Đăng nhập
              </button>
              <div className="text-center mt-3">
                <span className="text-sm text-gray-600">hoặc</span>
              </div>
              <p className="mt-6 text-center text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="text-purple-500 hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
