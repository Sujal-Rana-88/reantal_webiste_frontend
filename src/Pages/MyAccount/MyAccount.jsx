import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import Rate from "../../components/common/Rating";

const MyAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ visible: false });

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleLendGame = (data) => {
    setNotification({
      visible: true,
      message: "Game lent successfully!",
      type: "success",
    });

    // Automatically hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);

    handleHideModal();
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <Navbar />
      <Rate />
      <ProfileCard onLendGameClick={handleShowModal} />
      <Notification notification={notification} closeNotification={closeNotification} />
      <div className="flex justify-end">
        <Link
          to="/LendGameHistory"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2 md:mr-4 lg:mr-6"
        >
          History
        </Link>
      </div>

      {showModal && (
        <LendGameModal
          onSubmit={handleLendGame}
          setNotification={setNotification}
          onClose={handleHideModal}
        />
      )}
    </>
  );
};

export default MyAccount;
