import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./components/RouteGuards";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/users/Home";
import NotFound from "./components/NotFound";
import UserQuestion from "./pages/users/UserQuestion";
import UserPage from "./pages/users/UserPage";
import ResultUser from "./pages/users/ResultUser";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <HomeAdmin />
          </AdminRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/userQuestion/:id"
        element={
          <ProtectedRoute>
            <UserQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <ResultUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userHome"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
