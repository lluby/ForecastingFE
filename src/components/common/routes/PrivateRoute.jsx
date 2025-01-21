import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../../../pages/DashboardPage";
import NotFoundPage from "../../../pages/NotFound";
import PrimaryLayout from "../layout/PrimaryLayout";
import ManageInventoryPage from "../../../pages/ManageInventoryPage";
import HistoryPage from "../../../pages/HistoryPage";
import ManageAccount from "../../../features/setting/ManageAccount";

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Pastikan 'role' diset dengan benar setelah login

  // Jika tidak ada token, arahkan ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PrimaryLayout>
      <Routes>
        {/* Rute untuk Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Rute untuk Kelola Bahan Baku (akses untuk admin dan staff) */}
        <Route
          path="/manage-inventory"
          element={<ManageInventoryPage />}
        />
        
        {/* Rute untuk Riwayat User (akses hanya untuk admin) */}
        {userRole === 'admin' && (
          <Route path="/history" element={<HistoryPage />} />
        )}

        {userRole === 'admin' && (
          <Route path="/setting" element={<ManageAccount />} />
        )}  

        {/* Rute untuk halaman 404 jika tidak ditemukan */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PrimaryLayout>
  );
};

export default PrivateRoute;
