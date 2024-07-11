import { Route, Routes } from "react-router-dom";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/users/Home";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/*" element={<HomeAdmin />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
