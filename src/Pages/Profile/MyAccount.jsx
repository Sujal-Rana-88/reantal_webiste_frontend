import React, { useState, useEffect, useRef } from "react";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import Navbar from "../../components/common/Navbar";
import { ToastContainer, toast } from "react-toastify";

import {
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  History,
  Gamepad2,
} from "lucide-react";
import Logout from "../../components/auth/Logout";
import Privacy from "../../components/common/Privacy";
import UserLendGameHistory from "./UserLendGameHistory";
import UserProfile from "./UserProfile";

function MyAccount() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState({ visible: false });
  const [showModal, setShowModal] = useState(false);
 
  const handleHideModal = () => setShowModal(false);
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



  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "history", label: "Lend Game History", icon: History },
    { id: "lendGame", label: "Lend Your Game", icon: Gamepad2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
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
                <UserProfile />
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
               
                <Logout
                 onClickHandle = {() => setActiveTab("profile")}
                />

              )}
              {/* LEND GAME HISTORY */}
              {activeTab === "history" && (
                <UserLendGameHistory />
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
               
                <Privacy onClickHandle={() => setActiveTab("privacy")}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
