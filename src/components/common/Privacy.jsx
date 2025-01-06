import { React, useState } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../Pages/Profile/ChangePasswordModal";

const Privacy = () => {
  const navigate = useNavigate();
  const [delButton, setDelButton] = useState(false);
  const userId = localStorage.getItem("user_id");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const confirmDelete = async () => {
    // Here you would typically delete the user data
    // setDelButton(false);
    console.log(userId);
    try {
      const response = await axios.delete(
        `${API_URLS.DELETE_ACCOUNT}?userId=${userId}`
      );

      setDelButton(false);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("email");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("profilePicture");
    } catch (err) {
      toast.error("Error: " + err.response.data.message);

      setDelButton(false);
    }
  };
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-center text-gray-900 dark:text-white">
          Privacy & Security
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add an extra layer of security to your account
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Enable 2FA
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Change Password
              </button>

              {/* ChangePasswordModal */}
              <ChangePasswordModal
                show={isModalOpen}
                onClose={handleCloseModal}
              />
            </div>
            <button
              className="mt-10 px-4 py-2 text-sm font-medium text-black/80 dark:text-white bg-white border bg-red-500/75 border-gray-300 dark:bg-red-500/75 dark:border-gray-600 rounded-lg hover:bg-red-500/65 dark:hover:bg-red-500/50"
              onClick={() => setDelButton(true)}
            >
              Delete Account
            </button>

            {delButton && (
              <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">
                  <div className="mb-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                      <svg
                        className="h-7 w-7 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
                      Delete Account
                    </h2>
                    <p className="text-center text-sm text-gray-600">
                      This action cannot be undone. Your account and all
                      associated data will be permanently deleted.
                    </p>
                  </div>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
                    <button
                      onClick={() => setDelButton(false)}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
