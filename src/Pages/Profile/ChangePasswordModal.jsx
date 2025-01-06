import { React, useState } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("userId", userId);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("newPassword", formData.newPassword);
    //     // const formDataToSubmit = {
    //     //   userId,
    //     //   firstName: formData.firstName,
    //     //   lastName: formData.lastName,
    //     //   image : image? image : null
    //     // };

    setLoading(true);
    try {
      const response = await axios.post(
        API_URLS.UPDATE_PASSWORD,
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
      toast.success("Password Updated successfully ");
      setFormData({
        password: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(
        "Error Saving user Info:",
        error.response?.data || error.message
      );
      toast.error("Error Updating password ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal content */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h1>
          {/* Add your error and message handling logic */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                name="password"
                // defaultValue={formData.firstName}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter current password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleUpdatePassword}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
