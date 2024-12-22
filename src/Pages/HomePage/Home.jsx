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
        // Fetch data from the API endpoint
        const response = await axios.get(
          API_URLS.FETCH_GAMES
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
      <Featured />
      <div className="overflow-x-auto whitespace-nowrap p-4 ">
        <div className="flex space-x-4">
          {loading ? (
            <p>Loading...</p>
          ) :
           (
            games.length > 0 ? ( 
              games.map((game) => (
                <GameCard
                  key={game.lendingId} 
                  imageUrl={game.image}
                  // imageUrl={`https://picsum.photos/200`}
                  about={game.about}
                  gameName={game.gameName}
                  rating={5} 
                  price={game.price} 
                />
              ))
            ) 
            : (
              <p>No games available.</p>
            )
          )
          
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
