import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const handleIconClick = (platform) => {
   // console.log(`Clicked on ${platform}`); // Replace with actual redirection if needed
    // Example:
    // if (platform === 'Facebook') {
    //   wind̥̥̥ow.open('https://www.facebook.com', '_blank');
    // }
  };

  return (
    // <footer className="bg-[#24262b] py-16">
    //   {" "}
    //   {/* Use <footer> instead of <Footer> */}
    //   <div className="max-w-[1520px] m-auto px-4 text-gray-300">
    //     <div className="grid lg:grid-cols-3 gap-8">
    //       <div>
    //         <h1 className="w-full text-3xl font-bold text-white">
    //           Horizon Games
    //         </h1>
    //         <p>Explore the gaming world with us!</p>
    //         <div className="flex justify-between md:w-[35%] my-6">
    //           <FaFacebookSquare
    //             size={30}
    //             className="transition-transform transform hover:scale-110 cursor-pointer"
    //             onClick={() => handleIconClick("Facebook")}
    //           />
    //           <FaGithubSquare
    //             size={30}
    //             className="transition-transform transform hover:scale-110 cursor-pointer"
    //             onClick={() => handleIconClick("Github")}
    //           />
    //           <FaInstagram
    //             size={30}
    //             className="transition-transform transform hover:scale-110 cursor-pointer"
    //             onClick={() => handleIconClick("Instagram")}
    //           />
    //           <FaTwitterSquare
    //             size={30}
    //             className="transition-transform transform hover:scale-110 cursor-pointer"
    //             onClick={() => handleIconClick("Twitter")}
    //           />
    //         </div>
    //       </div>
    //       <div className="lg:col-span-2 flex justify-between mt-6">
    //         <div>
    //           <h6 className="font-medium text-[#9b9b9b]">Popular Games</h6>
    //           <ul>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Fortnite
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Call of Duty
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               League of Legends
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h6 className="font-medium text-[#9b9b9b]">Gaming Communities</h6>
    //           <ul>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               eSports
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               RPG Enthusiasts
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Streamers
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h6 className="font-medium text-[#9b9b9b]">Game Reviews</h6>
    //           <ul>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Latest Game Releases
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Game Ratings
    //             </li>
    //             <li className="py-2 text-sm footer-link hover:underline cursor-pointer">
    //               Player Insights
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <h1 className="flex text-white justify-center">
    //         © 2024 Horizon Games. All rights reserved.
    //       </h1>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-white dark:bg-gray-900">
    {/* <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Company
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            {["About", "Careers", "Brand Center", "Blog"].map((item) => (
              <li key={item} className="mb-4">
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Help Center
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            {["Discord Server", "Twitter", "Facebook", "Contact Us"].map(
              (item) => (
                <li key={item} className="mb-4">
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Legal
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            {["Privacy Policy", "Licensing", "Terms & Conditions"].map(
              (item) => (
                <li key={item} className="mb-4">
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Download
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            {["iOS", "Android", "Windows", "MacOS"].map((item) => (
              <li key={item} className="mb-4">
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div> */}

    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
        © 2025 <a href="/">Horizon Games™</a>. All Rights Reserved.
      </span>
      <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
        {[
          {
            href: "#",
            ariaLabel: "Facebook page",
            iconPath:
              "M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z",
          },
          {
            href: "#",
            ariaLabel: "Discord community",
            iconPath:
              "M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59Z",
          },
          {
            href: "#",
            ariaLabel: "Twitter page",
            iconPath:
              "M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z",
          },
        ].map((link) => (
          <a
            key={link.ariaLabel}
            href={link.href}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label={link.ariaLabel}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={link.iconPath} />
            </svg>
            <span className="sr-only">{link.ariaLabel}</span>
          </a>
        ))}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
