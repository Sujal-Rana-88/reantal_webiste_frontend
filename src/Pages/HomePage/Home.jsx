import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Featured from "../../components/common/Featured";
import Footer from "../../components/common/Footer";
import GameCard from "../../components/common/GameCard";
import API_URLS from "../../config/urls";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [visibleGames, setVisibleGames] = useState(10); // Number of games to display initially

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        console.log(userId);
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

  const handleShowMore = () => {
    // Increase the number of visible games by 10
    setVisibleGames((prev) => Math.min(prev + 10, games.length));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        
        <Featured />
        <div className="p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-100 dark:bg-gray-800 p-4 z-10">
            <div className="flex items-center text-lg font-medium">
              <span>Latest Games</span>
              <FaClock style={{ marginLeft: "8px" }} />
            </div>
            <Link
              to="/more"
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            >
              Show More
            </Link>
          </div>

          {/* Horizontal Scrolling Games Section */}
          <div className="overflow-x-auto whitespace-nowrap bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex space-x-4">
              {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              ) : games.length > 0 ? (
                games.slice(0, visibleGames).map((game) => {
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
                      category={game.category}
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
