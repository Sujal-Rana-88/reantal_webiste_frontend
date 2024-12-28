import UserLendedGamesCard from '../../components/common/UserLendedGamesCard';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from '../../components/common/Navbar';
import Rate from '../../components/common/Rating';

const LendGameHistory = () => {
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

  return (

    <>
    <Navbar />
    <Rate/>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Your Lended Games History
      </h1>

      {/* Loading or Content */}
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

            return (
              <UserLendedGamesCard
                key={game.lendingId}
                imageUrl={game.image}
                about={game.about}
                tags={formattedTags}
                gameName={game.gameName}
                category = {game.category}
                rating={5}
                price={game.price}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>No lended games found.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default LendGameHistory;
