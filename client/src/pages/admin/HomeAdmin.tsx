import { Link, Route, Routes } from "react-router-dom";
import UsersAd from "./UsersAd";

export default function HomeAdmin() {
  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="text-white mr-4">Welcome, Admin</span>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex">
        <nav className="w-64 bg-white shadow-lg min-h-screen p-4">
          <ul>
            <li className="mb-4">
              <Link
                to="/users"
                className="block p-2 rounded-lg text-gray-700 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/users" element={<UsersAd />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
