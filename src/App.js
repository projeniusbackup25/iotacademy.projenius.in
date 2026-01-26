import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      {/* ✅ ROOT ROUTE */}
      <Route path="/" element={<HomePage />} />

      {/* OPTIONAL: redirect /home → / */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/contactpage" element={<ContactPage />} />

      {/* ✅ 404 SAFETY */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
