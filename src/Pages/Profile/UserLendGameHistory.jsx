import { React, useState, useEffect } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserLendedGamesCard from "../../components/common/UserLendedGamesCard";

const UserLendGameHistory = () => {
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [games, setGames] = useState([]); // State to store games data
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch data from the API endpoint
        const userId = localStorage.getItem("user_id");
        console.log(userId);
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
  return (
    <>
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
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
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
    </>
  );
};

export default UserLendGameHistory;
