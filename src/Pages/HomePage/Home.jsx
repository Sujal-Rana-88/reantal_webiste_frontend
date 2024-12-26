import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Featured from "../../components/common/Featured";
import Footer from "../../components/common/Footer";
import GameCard from "../../components/common/GameCard";
import API_URLS from '../../config/urls';

function Home() {
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Sample data to send with the POST request (you can modify this according to your needs)
        const userId = localStorage.getItem("user_id");
        const requestData = {
          userId: userId
        };

        // Sending a POST request to fetch games
        // const response = await axios.post(API_URLS.FETCH_GAMES, requestData);
        const token = localStorage.getItem("token"); // or from another source like a context API

      const response = await axios.post(API_URLS.FETCH_GAMES, requestData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

        // Update the games state with the response data
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
      <Featured />
      <div className="overflow-x-auto whitespace-nowrap p-4">
        <div className="flex space-x-4">
          {loading ? (
            <p>Loading...</p>
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
            <p>No games available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
