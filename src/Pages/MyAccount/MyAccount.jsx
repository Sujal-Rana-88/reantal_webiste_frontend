// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/common/Navbar";
// import axios from "axios";

// function MyAccount() {
//   const [userData] = useState({
//     name: "Sujal Rana",
//     totalGamesLended: 5,
//     totalGamesRented: 10,
//     rentalHistory: [
//       { id: 1, gameName: "Horizon Zero Dawn", date: "2024-01-15" },
//       { id: 2, gameName: "Destiny", date: "2024-02-10" },
//     ],
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [notification, setNotification] = useState({
//     visible: false,
//     message: "",
//     type: "", // "success" or "error"
//   });

//   const [formData, setFormData] = useState({
//     gameName: "",
//     lendingPeriod: "",
//     image: null,
//     cost: "",
//     termsAccepted: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.termsAccepted) {
//       const data = new FormData();
//       data.append("gameName", formData.gameName);
//       data.append("lendingPeriod", formData.lendingPeriod);
//       data.append("image", formData.image);
//       data.append("price", formData.cost);

//       const token = localStorage.getItem("token");
//       console.log("Token:", token);

//       try {
//         const response = await axios.post(
//           "http://localhost:5000/games/lend",
//           // "https://rental-website-backend.onrender.com/games/lend",
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setFormData({
//           gameName: "",
//           lendingPeriod: "",
//           image: null,
//           cost: "",
//           termsAccepted: false,
//         });
//         setShowModal(false);
//         setNotification({
//           visible: true,
//           message: "Game lent successfully!",
//           type: "success",
//         });

//         // Automatically remove notification after 3 seconds
//         setTimeout(() => {
//           setNotification({ ...notification, visible: false });
//         }, 3000);
//       } catch (error) {
//         console.error(
//           "Error posting game:",
//           error.response?.data || error.message
//         );
//         setNotification({
//           visible: true,
//           message: "Failed to post the game. Please try again.",
//           type: "error",
//         });

//         // Automatically remove notification after 3 seconds
//         setTimeout(() => {
//           setNotification({ ...notification, visible: false });
//         }, 3000);
//       }
//     } else {
//       setNotification({
//         visible: true,
//         message: "Please accept the terms and conditions.",
//         type: "error",
//       });

//       // Automatically remove notification after 3 seconds
//       setTimeout(() => {
//         setNotification({ ...notification, visible: false });
//       }, 3000);
//     }
//   };

//   const closeNotification = () => {
//     setNotification({ ...notification, visible: false });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center mt-12 px-4 md:px-8">
//         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-md md:max-w-xl mx-auto">
//           <img
//             className="w-24 h-24 md:w-36 md:h-36 rounded-lg object-cover"
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
//             alt="Generic placeholder"
//           />

//           <div className="flex flex-col items-center md:items-start w-full space-y-2 md:space-y-3">
//             <h5 className="text-lg md:text-xl font-bold">Sujal Rana</h5>
//             <p className="text-sm md:text-base text-gray-500">@sujal_304</p>

//             <div className="flex justify-between w-full bg-gray-100 p-2 md:p-3 rounded-lg space-x-2">
//               <div className="text-center">
//                 <p className="text-xs md:text-sm text-gray-400">Rented Games</p>
//                 <p className="font-medium text-base">10</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xs md:text-sm text-gray-400">Lend Games</p>
//                 <p className="font-medium text-base">13</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xs md:text-sm text-gray-400">Rating</p>
//                 <p className="font-medium text-base">8.5</p>
//               </div>
//             </div>

//             <div className="flex w-full space-x-2 mt-3">
//               <button className="w-1/2 py-2 text-xs md:text-sm font-medium border border-blue-500 text-blue-500 rounded-lg whitespace-nowrap">
//                 Chat
//               </button>
//               <button
//                 className="w-1/2 py-2 text-xs md:text-sm font-medium bg-blue-500 text-white rounded-lg whitespace-nowrap"
//                 onClick={() => setShowModal(true)}
//               >
//                 Lend a game
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Notification */}
//       {notification.visible && (
//         <div
//           className={` z-50 fixed top-4 right-4 p-4 rounded-md text-white ${
//             notification.type === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           <div className="flex justify-between">
//             <p>{notification.message}</p>
//             <button onClick={closeNotification} className="text-lg font-bold">
//               &times;
//             </button>
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
//           <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
//             <h2 className="text-2xl font-bold mb-4">Lend a Game</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Game Name
//                 </label>
//                 <input
//                   type="text"
//                   name="gameName"
//                   value={formData.gameName}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Lending Period (in days)
//                 </label>
//                 <input
//                   type="number"
//                   name="lendingPeriod"
//                   value={formData.lendingPeriod}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Cost in ₹
//                 </label>
//                 <input
//                   type="number"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Game Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="mt-1 block w-full text-sm text-gray-500"
//                   required
//                 />
//               </div>

//               <div className="mb-4 flex items-center">
//                 <input
//                   type="checkbox"
//                   name="termsAccepted"
//                   checked={formData.termsAccepted}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">
//                   I accept the terms and conditions
//                 </label>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default MyAccount;

import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import ProfileCard from "../../components/common/ProfileCard";
import Notification from "../../components/common/Notification";
import LendGameModal from "../../components/common/LendGameModal";
import { Rating } from "@material-tailwind/react";
import Rate from "../../components/common/Rating";

const MyAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ visible: false });

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleLendGame = (data) => {
    setNotification({
      visible: true,
      message: "Game lent successfully!",
      type: "success",
    });
    handleHideModal(); 
  };

  return (
    <>
      <Navbar />
      <Rate />
      <ProfileCard onLendGameClick={handleShowModal} />
      <Notification notification={notification} />
      {showModal && (
        <LendGameModal
          onSubmit={handleLendGame} 
          setNotification={setNotification}
          onClose={handleHideModal}
        />
      )}
    </>
  );
};

export default MyAccount;
