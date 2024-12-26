import UserLendedGamesCard from '../../components/common/UserLendedGamesCard'
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import LoadingSpinner from "../../components/common/LoadingSpinner";

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
    
  return (
    <div className="flex space-x-4">
        {loading ? (
          {
            /* <p>Loading...</p> */
          } <
          LoadingSpinner >
          <LoadingSpinner />
        ) : games.length > 0 ? (
          games.map((game) => {
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
                rating={5}
                price={game.price}
              />
            );
          })
        ) : (
          <p>No Lended games.</p>
        )}
      </div>
  )
}

export default LendGameHistory;
