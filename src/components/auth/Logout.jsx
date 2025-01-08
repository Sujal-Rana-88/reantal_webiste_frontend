import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({onClickHandle}) => {
const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);

const [theme, setTheme] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light";
  }
  return "light";
});

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

const confirmLogout = () => {
  setTimeout(() => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("profilePicture");
  }, 200); // Small delay to reduce blocking
  setShowLogoutModal(false);
  navigate("/",  { replace: true });
  // setTheme(theme ===  'dark');
};

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-lg font-bold text-center">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={confirmLogout}
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
            >
              Yes, Logout
            </button>
            <button
              onClick={onClickHandle}
              className="px-4 py-2 text-white bg-gray-600 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
