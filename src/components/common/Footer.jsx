import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const handleIconClick = (platform) => {
    console.log(`Clicked on ${platform}`); // Replace with actual redirection if needed
    // Example:
    // if (platform === 'Facebook') {
    //   wind̥̥̥ow.open('https://www.facebook.com', '_blank');
    // }
  };

  return (
    <footer className="bg-[#24262b] py-16">
      {" "}
      {/* Use <footer> instead of <Footer> */}
      <div className="max-w-[1520px] m-auto px-4 text-gray-300">
        <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <h1 className="w-full text-3xl font-bold text-white">
              Horizon Games
            </h1>
            <p>Explore the gaming world with us!</p>
            <div className="flex justify-between md:w-[35%] my-6">
              <FaFacebookSquare
                size={30}
                className="transition-transform transform hover:scale-110 cursor-pointer"
                onClick={() => handleIconClick("Facebook")}
              />
              <FaGithubSquare
                size={30}
                className="transition-transform transform hover:scale-110 cursor-pointer"
                onClick={() => handleIconClick("Github")}
              />
              <FaInstagram
                size={30}
                className="transition-transform transform hover:scale-110 cursor-pointer"
                onClick={() => handleIconClick("Instagram")}
              />
              <FaTwitterSquare
                size={30}
                className="transition-transform transform hover:scale-110 cursor-pointer"
                onClick={() => handleIconClick("Twitter")}
              />
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-between mt-6">
            <div>
              <h6 className="font-medium text-[#9b9b9b]">Popular Games</h6>
              <ul>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Fortnite
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Call of Duty
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  League of Legends
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-[#9b9b9b]">Gaming Communities</h6>
              <ul>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  eSports
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  RPG Enthusiasts
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Streamers
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-[#9b9b9b]">Game Reviews</h6>
              <ul>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Latest Game Releases
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Game Ratings
                </li>
                <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
                  Player Insights
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h1 className="flex text-white justify-center">
            © 2024 Horizon Games. All rights reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
