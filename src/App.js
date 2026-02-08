import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import WorkshopKit from "./component/WorkshopKits";
import PaymentPage from "./pages/PaymentPage";
import PreviewPage from "./pages/PreviewPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import UserVideo from "./pages/UserVideo";
import UserProject from "./pages/UserProject";
import UserDownload from "./pages/UserDownload";
import Certificate from "./pages/Certificate";
import OrderHistory from "./pages/OrderPage";
import CoursesPage from "./pages/CoursePage";
import ReportsPage from "./pages/ReportsPage";

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
      <Route path="/preview/:level" element={<PreviewPage />} />
       <Route path="/payment/:level" element={<PaymentPage />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/workshopkit" element={<WorkshopKit />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route path="/termsofservice" element={<TermsOfService/>} />


      <Route path="/uservideo" element={<UserVideo />} />
      <Route path="/userproject" element={<UserProject />} />
      <Route path="/userdownload" element={<UserDownload />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/coursepage" element={<CoursesPage />} /> 
      <Route path="/reportspage" element={<ReportsPage />} /> 

      {/* ✅ 404 SAFETY */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
