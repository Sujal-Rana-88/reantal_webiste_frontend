import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { useLocation } from "react-router-dom";

const RentGame = () => {
  const location = useLocation();
  const { about, gameName, price, rating, imageUrl } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 mt-16">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            className="w-full h-64 object-cover"
            src={imageUrl}
            alt={gameName || "Game Image"}
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">{gameName || "Unknown Game"}</h1>
            <p className="text-gray-600 mt-2">{about || "No description available."}</p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-500 font-bold">{rating}★</span>
              <p className="text-sm text-gray-500 ml-2">
                {rating >= 4.5 ? "Highly Rated" : "Good Rating"}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-semibold text-gray-800">₹{price || "N/A"}</span>
            </div>
            <button
              onClick={handleModalToggle}
              className="mt-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Pay
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalToggle}
        >
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pay</h3>
              <button
                type="button"
                onClick={handleModalToggle}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4">
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Select your preferred payment method.
              </p>
              <ul className="my-4 space-y-3">
                <li>
                  <a
                    href=""
                    className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className="ml-2">Google Pay</span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className="ml-2">Credit Card</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentGame;