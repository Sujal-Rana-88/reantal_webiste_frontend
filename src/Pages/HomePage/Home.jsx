import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Featured from "../../components/common/Featured";
import Footer from "../../components/common/Footer";
import GameCard from "../../components/common/GameCard";
import API_URLS from "../../config/urls";

function Home() {
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const requestData = { userId };

        const response = await axios.post(API_URLS.FETCH_GAMES, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        <Featured />
        <div className="overflow-x-auto whitespace-nowrap p-4 bg-gray-100 dark:bg-gray-800">
          <div className="flex space-x-4">
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : games.length > 0 ? (
              games.map((game) => {
                const formattedTags = game.tags
                  .split("$")
                  .map((tag) => `#${tag}`)
                  .join(" "); // Convert "ForzaHorizon$Racing" to "#ForzaHorizon #Racing"

                return (
                  <GameCard
                    key={game.lendingId}
                    imageUrl={game.image}
                    about={game.about}
                    tags={formattedTags} // Pass the formatted tags
                    gameName={game.gameName}
                    rating={5}
                    price={game.price}
                  />
                );
              })
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No games available.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
