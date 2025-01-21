/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

// ProtectedRoute yang memeriksa role yang dibutuhkan
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Jika tidak ada token, arahkan ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai dengan yang dibutuhkan, arahkan ke dashboard atau halaman lain
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika role sesuai, tampilkan children (halaman yang dilindungi)
  return children;
};

export default ProtectedRoute;
