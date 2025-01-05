import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import GameCard from "../../components/common/GameCard";
import API_URLS from "../../config/urls";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rate from "../../components/common/Rating";

const MoreGames = () => {
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // Whether there are more games to load
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category state

  // Fetch games from API with pagination
  const fetchGames = useCallback(async () => {
    if (!hasMore) return; // Stop fetching if no more data is available

    setLoading(true);
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        API_URLS.FETCH_GAMES, 
        {
          userId, 
          page, 
          limit: 20, 
          category: selectedCategory, // Send selected category
          search: searchTerm 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newGames = response.data || [];
      setGames((prevGames) => [...prevGames, ...newGames]);

      // If fewer games are returned than the limit, assume no more data
      if (newGames.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, selectedCategory, searchTerm]);

  // Fetch games when the component mounts or the page/category/search term changes
  useEffect(() => {
    fetchGames();
  }, [fetchGames, page, selectedCategory, searchTerm]); // Re-fetch on category change

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 // Load more when 200px from the bottom
    ) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]); // Ensure handleScroll only reacts when necessary

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to page 1 when the category changes
    setGames([]); // Clear current games
    setHasMore(true); // Ensure pagination can work again
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <Rate />
      <div className="overflow-x-auto whitespace-nowrap px-16 py-4 bg-gray-100 dark:bg-gray-800 flex-grow">
        <div className="flex justify-between items-center mb-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Sports">Sports</option>
            <option value="Racing">Racing</option>
            <option value="Shooter">Shooter</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Open World">Open World</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game) => {
            const formattedTags = game.tags
              .split("$")
              .map((tag) => `#${tag}`)
              .join(" "); // Convert "ForzaHorizon$Racing" to "#ForzaHorizon #Racing"

            return (
              <GameCard
                key={game.lendingId}
                imageUrl={game.image}
                about={game.about}
                tags={formattedTags}
                gameName={game.gameName}
                rating={5}
                price={game.price}
                category={game.category}
              />
            );
          })}
        </div>
        {loading && (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
            Loading...
          </p>
        )}
        {!hasMore && (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
            No more games to load.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MoreGames;
