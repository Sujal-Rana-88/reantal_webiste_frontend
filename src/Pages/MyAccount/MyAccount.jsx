// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import Notification from "../../components/common/Notification";
// import LendGameModal from "../../components/common/LendGameModal";
// import Rate from "../../components/common/Rating";

// const MyAccount = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [notification, setNotification] = useState({ visible: false });
//   const name = localStorage.getItem("user_name");
//   const email = localStorage.getItem("email");

//   const user = {
//     profilePicture: "https://via.placeholder.com/150", // Default image
//     name: "John Doe", // Default name
//     email: "johndoe@example.com", // Default email
//     bio: "This is the user bio. It can contain information about the user.", // Default bio
//     followers: 120, // Default rating
//     following: 75, // Default rented games count
//     lended: 32, // Default lended games count
//   };

//   const StatItem = ({ label, value }) => (
//     <div className="flex flex-col items-center text-center">
//       <span className="text-gray-700 font-semibold">{label}</span>
//       <span className="text-xl text-gray-800">{value}</span>
//     </div>
//   );

//   const handleLendGame = () => {
//     setNotification({
//       visible: true,
//       message: "Game lent successfully!",
//       type: "success",
//     });

//     setTimeout(() => {
//       setNotification((prev) => ({ ...prev, visible: false }));
//     }, 3000);

//     handleHideModal();
//   };

//   const handleHideModal = () => setShowModal(false);
//   const closeNotification = () => {
//     setNotification((prev) => ({ ...prev, visible: false }));
//   };

//   return (
//     <>
//       <Navbar />
//       <Rate />
//       <div className="p-6">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center">
//           <img
//             src={user.profilePicture}
//             alt={`${user.name}'s profile picture`}
//             className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
//           />
//           <h2 className="mt-4 text-3xl font-bold text-gray-800">{`${name
//               .charAt(0)
//               .toUpperCase()}${name.substring(1)}`}
//           </h2>
//           <p className="text-gray-600 text-lg">{email}</p>
//           <Link
//             to="/LendGameHistory"
//             className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
//           >
//             View Lend History
//           </Link>
//         </div>

//         {/* Buttons Section */}
//         <div className="mt-6 flex flex-col items-center">
//           <button
//             className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
//             onClick={() => setShowModal(true)}
//           >
//             Lend a Game
//           </button>
//         </div>

//         {/* Statistics Section */}
//         <div className="mt-8 flex justify-around border-t border-gray-200 pt-6">
//           <StatItem label="Rating" value={user.followers} />
//           <StatItem label="Rented Games" value={user.following} />
//           <StatItem label="Lended Games" value={user.lended} />
//         </div>
//       </div>

//       {/* Notification */}
//       <Notification
//         notification={notification}
//         closeNotification={closeNotification}
//       />

//       {/* Modal */}
//       {showModal && (
//         <LendGameModal
//           onSubmit={handleLendGame}
//           setNotification={setNotification}
//           onClose={handleHideModal}
//         />
//       )}
//     </>
//   );
// };

// export default MyAccount;
