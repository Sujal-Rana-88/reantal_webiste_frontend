import React from "react";

const ProfileCard = ({ onLendGameClick }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
    <h3 className="text-lg font-bold">Sujal Rana</h3>
    <p className="text-gray-500">Total Games Rented: 10</p>
    <p className="text-gray-500">Total Games Lent: 5</p>
    <button
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
      onClick={onLendGameClick}
    >
      Lend a Game
    </button>
  </div>
);

export default ProfileCard;
