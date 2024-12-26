import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import { Rating } from "@material-tailwind/react";
import Rate from "../../components/common/Rating";
import UserLendedGamesCard from "../../components/common/UserLendedGamesCard";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ visible: false });

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch data from the API endpoint
        const userId = localStorage.getItem("user_id");
        const requestData = {
          userId: userId,
        };

        // Sending a POST request to fetch games
        // const response = await axios.post(API_URLS.FETCH_GAMES, requestData);
        const token = localStorage.getItem("token"); // or from another source like a context API

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
      <div class="flex justify-end">
        <Link
          to="/LendGameHistory"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2 md:mr-4 lg:mr-6"
        >
          History
        </Link>
      </div>

      {/* <LoadingSpinner/> */}
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
