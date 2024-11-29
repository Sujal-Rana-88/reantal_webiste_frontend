import React from 'react';
import UnauthorizedNavbar from './UnauthorizedNavbar';

const UnauthorizedHome = () => {
  // Sample games data with detailed descriptions
  const games = [
    {
      name: "The Legend of Zelda: Breath of the Wild",
      description: "An open-world action-adventure game where you explore the vast kingdom of Hyrule. Embark on a quest to defeat Calamity Ganon and save Princess Zelda in this critically acclaimed title that redefines the genre."
    },
    {
      name: "Super Mario Odyssey",
      description: "A 3D platformer that takes you on a globe-trotting adventure with Mario. Join him and his new friend Cappy as they travel through various kingdoms to rescue Princess Peach from Bowser."
    },
    {
      name: "Call of Duty: Warzone",
      description: "A free-to-play battle royale game that pits you against other players in intense combat. Strategize with your team, scavenge for weapons, and fight to be the last one standing."
    },
    {
      name: "Minecraft",
      description: "A sandbox game that allows you to build and explore worlds made of blocks. Gather resources, craft items, and unleash your creativity in an infinite world."
    },
    {
      name: "Fortnite",
      description: "A popular battle royale game where players compete to be the last one standing. Build structures, collect weapons, and outsmart your opponents in this vibrant world."
    },
    {
      name: "Animal Crossing: New Horizons",
      description: "A life simulation game where you create your own island paradise. Build your dream home, interact with adorable animal villagers, and customize your island to your heart's content."
    },
    {
      name: "Apex Legends",
      description: "A free-to-play battle royale game set in the Titanfall universe with unique characters. Team up with friends and use your legends' special abilities to dominate the competition."
    },
    {
      name: "Genshin Impact",
      description: "An action RPG with a beautiful open world and a gacha system for character collection. Explore the enchanting world of Teyvat and uncover its secrets while battling foes and solving puzzles."
    },
    {
      name: "League of Legends",
      description: "A team-based strategy game where you battle against other players in real-time. Choose your champion and work with your team to destroy the enemy's nexus in this popular MOBA."
    },
    {
      name: "Overwatch",
      description: "A team-based shooter with a diverse cast of heroes and fast-paced gameplay. Coordinate with your team and use unique character abilities to complete objectives and defeat your opponents."
    }
  ];

  return (
    <>
      <UnauthorizedNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">Welcome to Horizon Games!</h1>
        <p className="text-lg text-center mb-8 text-gray-700">Discover, rent, and lend your favorite games!</p>
        <p className="text-lg text-center mb-4 text-green-600 font-semibold">Log in to unlock exclusive features and enjoy a personalized gaming experience!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Featured Games Section */}
          {games.map((game, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-blue-500 mb-2">{game.name}</h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-blue-600 font-semibold">Join us today and start your gaming journey!</p>
          <p className="mt-2 text-md text-gray-500">By logging in, you can access exclusive deals, personalized recommendations, and much more!</p>
          <p className="mt-4 text-md text-red-500 font-bold">Don't miss out on the fun – Log in now!</p>
        </div>
      </div>
    </>
  );
};

export default UnauthorizedHome;
