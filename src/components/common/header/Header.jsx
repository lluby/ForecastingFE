/* eslint-disable react/prop-types */
import { message, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const Header = ({ title = "" }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Ambil role dari localStorage
  const username = localStorage.getItem('username'); // Ambil username jika ada di localStorage

  const handleLogout = () => {
    message.success("Successfully logout");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const content = (
    <button onClick={handleLogout} className="text-red-500 w-32 text-left hover:bg-slate-100 px-3 py-1 rounded">
      Logout
    </button>
  );

  return (
    <div className="relative flex items-center justify-between bg-white mb-8">
      <p className="font-semibold text-2xl">{title}</p>

      <Popover content={content} trigger="click" className="cursor-pointer">
        <div className="flex items-center space-x-3 text-gray-700">
          <img src="./public/profile.png" alt="profile" className="w-10 h-10 rounded-full border border-gray-300" />
          <div>
            {/* Menampilkan username dan role sesuai login */}
            <p className="text-gray-700 font-medium">Hi, {role === 'admin' ? 'Admin' : username || 'Staff'}!</p>
            <p className="text-sm text-gray-500">{role === 'admin' ? 'Admin Inventory' : 'Staff Inventory'}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Header;
