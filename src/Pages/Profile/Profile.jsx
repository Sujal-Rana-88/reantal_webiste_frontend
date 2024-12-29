import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLendedGamesCard from "../../components/common/UserLendedGamesCard";
import axios from "axios";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import Navbar from "../../components/common/Navbar";

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
  const email = localStorage.getItem("email");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ visible: false });

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

  const handleHideModal = () => setShowModal(false);
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  // Mock user data - in a real app, this would come from your backend
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    bio: "Software developer passionate about creating amazing user experiences.",
    location: "San Francisco, CA",
    website: "https://horizon-games.netlify.app/home",
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

  const handleSave = () => {
    // Here you would typically save the form data
    setIsEditing(false);
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 mt-10">
        <div className="max-w-7xl mx-5 px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Account</h1>

          <div className="flex gap-8">
            {/* Navigation */}
            <div className="w-64 flex-shrink-0">
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
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
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
                      <div className="flex items-start gap-8">
                        <div className="relative group">
                          <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 group-hover:bg-gray-50">
                            <Camera className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                defaultValue={userData.firstName}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                defaultValue={userData.lastName}
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
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Bio
                            </label>
                            <textarea
                              defaultValue={userData.bio}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Location
                              </label>
                              <input
                                type="text"
                                defaultValue={userData.location}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Website
                              </label>
                              <input
                                type="url"
                                defaultValue={userData.website}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
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
                          src={avatarUrl}
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
                          <div className="pt-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Bio
                            </h4>
                            <p className="text-gray-500 dark:text-gray-400">{userData.bio}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-6 pt-2">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Location
                              </h4>
                              <p className="text-gray-500 dark:text-gray-400">
                                {userData.location}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Website
                              </h4>
                              <a
                                href={userData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {userData.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Link
                    to="/LendGameHistory"
                    className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Lend History
                  </Link>
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
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
                              <h3 className="text-lg font-semibold">
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
                  onClose={handleHideModal}
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
                      Change your password regularly to keep your account secure
                    </p>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                      Change Password
                    </button>
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