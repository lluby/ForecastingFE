import LoginPage from "../../../pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Private Route */}
        <Route path="/*" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
