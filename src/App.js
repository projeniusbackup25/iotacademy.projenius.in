import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/contactpage" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
