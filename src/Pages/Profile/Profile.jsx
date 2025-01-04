import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLendedGamesCard from "../../components/common/UserLendedGamesCard";
import axios from "axios";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import Navbar from "../../components/common/Navbar";
import { ToastContainer, toast } from 'react-toastify';

import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Camera,
  LogOut,
  History,
  Gamepad2,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  );
  const name = localStorage.getItem("user_name");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ visible: false });
  const [delButton, setDelButton] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const profileUrl = localStorage.getItem('profilePicture');

const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    image: "null", 
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch data from the API endpoint
        const userId = localStorage.getItem("user_id");
        const requestData = {
          userId: userId,
        };

        const token = localStorage.getItem("token");

        const response = await axios.post(
          API_URLS.FETCH_USER_LENDED_GAMES,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  const handleLendGame = () => {
    setNotification({
      visible: true,
      message: "Game lent successfully!",
      type: "success",
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);

    handleHideModal();
  };

  const handleSaveChangesNotification = () => {
    setNotification({
      visible: true,
      message: "User Info changed successfully!",
      type: "success",
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);

    handleHideModal();
  };


  const handleHideModal = () => setShowModal(false);
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  // Mock user data - in a real app, this would come from your backend
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "history", label: "Lend Game History", icon: History },
    { id: "lendGame", label: "Lend Your Game", icon: Gamepad2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  // const handleSave = () => {
  //   // Here you would typically save the form data
  //   setIsEditing(false);
  // };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    // Replace the current route with the homepage
    navigate("/", { replace: true });
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
    } catch (err) {
      toast.error("Error: " + err.response.data.message);

      setDelButton(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Regular expression to allow letters, numbers, spaces, and basic punctuation
    const validCharactersRegex = /^[a-zA-Z0-9\s]*$/;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      // Validate input value
      if (validCharactersRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // const formDataToSubmit = new FormData();
    // formDataToSubmit.append("userId", userId);
    // formDataToSubmit.append("firstName", formData.firstName);
    // formDataToSubmit.append("lastName", formData.lastName);
    // // formDataToSubmit.append("image", formData.image);
    const formDataToSubmit = {
      userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    // setLoading(true); 
    try {
      const response = await axios.post(API_URLS.UPDATE_INFO, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // onSubmit(response.data);
      handleSaveChangesNotification(response.data);
    } catch (error) {
      console.error(
        "Error Saving user Info:",
        error.response?.data || error.message
      );
      // alert("Failed to lend the game. Please try again.");
      toast.error("Error Updating details " )
    } finally {
      setIsEditing(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 mt-10">
        <div className="max-w-7xl mx-5 px-4 sm:px-6 lg:px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            My Account
          </h1>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Navigation */}
            <div className="w-full lg:w-64 lg:flex-shrink-0">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500/50"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* Content */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Profile Information
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    // Edit Mode
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                          <img
                            src={profileUrl || avatarUrl}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                          <button
                            // onClick={handleUpload}
                            className="absolute bottom-1 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
                          >
                            <Camera className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex-1 w-full space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                name ="firstName"
                                // defaultValue={formData.firstName}
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}

                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              defaultValue={userData.email}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-8">
                      <div className="flex items-start gap-8">
                        <img
                          src={profileUrl || avatarUrl}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                              {name}
                            </h3>
                            <p className="text-gray-500">{email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Email Notifications",
                      "Push Notifications",
                      "SMS Alerts",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between py-3 border-b"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications about updates
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* {showLogoutModal && ( */}
              {activeTab === "logout" && (
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
                        onClick={() => setActiveTab("profile")}
                        className="px-4 py-2 text-white bg-gray-600 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* LEND GAME HISTORY */}
              {activeTab === "history" && (
                <div className="space-y-6">
                  <div>
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <LoadingSpinner />
                      </div>
                    ) : games.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game) => {
                          const formattedTags = game.tags
                            .split("$")
                            .map((tag) => `#${tag}`)
                            .join(" "); // Convert "ForzaHorizon$Racing" to "#ForzaHorizon #Racing"

                          // Format the date to show in dd-mm-yyyy format
                          const date = new Date(game.createdAt);
                          const day = String(date.getDate()).padStart(2, "0"); // Adds leading zero if day is single digit
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          ); // Months are zero-indexed, so add 1
                          const year = date.getFullYear();
                          const formattedDate = `${day}-${month}-${year}`;

                          return (
                            <div key={game.lendingId} className="space-y-2">
                              <h3 className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                                Lended At {formattedDate}
                              </h3>
                              <UserLendedGamesCard
                                imageUrl={game.image}
                                about={game.about}
                                tags={formattedTags}
                                gameName={game.gameName}
                                category={game.category}
                                rating={5}
                                price={game.price}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center text-gray-600">
                        <p>No lended games found.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <Notification
                notification={notification}
                closeNotification={closeNotification}
              />

              {/* Modal */}
              {activeTab === "lendGame" && (
                <LendGameModal
                  onSubmit={handleLendGame}
                  setNotification={setNotification}
                  onClose={() => setActiveTab("profile")}
                />
              )}
              {activeTab === "privacy" && (
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
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Password
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Change your password regularly to keep your account
                        secure
                      </p>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                        Change Password
                      </button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-10 mb-4">
                        Change your password regularly to keep your account
                        secure
                      </p>
                      <button
                        className="px-4 py-2 text-sm font-medium text-black/80 dark:text-white bg-white border bg-red-500/75 border-gray-300 dark:bg-red-500/75 dark:border-gray-600 rounded-lg hover:bg-red-500/65 dark:hover:bg-red-500/50"
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
                                This action cannot be undone. Your account and
                                all associated data will be permanently deleted.
                              </p>
                            </div>
                            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
                              <button
                                onClick={() => setActiveTab("profile")}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;