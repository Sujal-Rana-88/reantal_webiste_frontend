// import React, { useEffect, useState } from "react";
// import axios from "axios"; 
// import Navbar from "../Navbar";
// import Featured from "./Featured";
// import Footer from "./Footer";
// import Card from "./Card";

// function Home() {
//   const [games, setGames] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [cart, setCart] = useState([]); 

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/games/rent-games");
//         setGames(response.data); // Set the fetched data to state
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGames(); 
//   }, []); 

//   const addToCart = (game) => {
//     setCart((prevCart) => [...prevCart, game]);
//   };

//   return (
//     <>
//       <Navbar />
//       <Featured />
//       <div className="overflow-x-auto whitespace-nowrap p-4">
//         {/* Enable horizontal scrolling */}
//         <div className="flex space-x-4">
//           {loading ? ( 
//             <p>Loading...</p>
//           ) : (
//             games.map((game) => ( 
//               <Card
//                 key={game.lendingId}
//                 imageUrl={`http://localhost:5000/${game.image}`} 
//                 gameName={game.gameName}
//                 rating={5} 
//                 price={game.price}
//                 onAddToCart={() => addToCart(game)} 
//               />
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Home;
