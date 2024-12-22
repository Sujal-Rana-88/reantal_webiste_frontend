import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import { Rating } from "@material-tailwind/react";
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
    handleHideModal(); 
  };

  return (
    <>
      <Navbar />
      <Rate />
      <ProfileCard onLendGameClick={handleShowModal} />
      <Notification notification={notification} />
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
