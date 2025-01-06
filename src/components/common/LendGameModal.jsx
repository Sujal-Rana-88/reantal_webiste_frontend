import React, { useState } from "react";
import axios from "axios";
import API_URLS from "../../config/urls.js";

const LendGameModal = ({ onClose, onSubmit }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    gameName: "",
    lendingPeriod: "",
    price: "",
    tags: "",
    about: "",
    termsAccepted: false,
    image: null,
    category: "",
  });

  const [tagsList, setTagsList] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Regular expression to allow letters, numbers, spaces, and basic punctuation
    const validCharactersRegex = /^[a-zA-Z0-9\s]*$/;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      // Validate input value
      if (validCharactersRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleAboutChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Regular expression to allow letters, numbers, spaces, and special characters
    const validCharactersRegex =
      /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]*$/;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      // Validate input value
      if (validCharactersRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleAddTag = () => {
    if (tagsList.length >= 3) {
      alert("You can only add up to 3 tags.");
      return;
    }

    if (formData.tags.trim() && !tagsList.includes(formData.tags.trim())) {
      setTagsList([...tagsList, formData.tags.trim()]);
      setFormData({ ...formData, tags: "" }); // Clear the input field after adding
    }
  };

  const handleRemoveTag = (tag) => {
    setTagsList(tagsList.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to submit the form.");
      return;
    }

    if (formData.about.length > 250) {
      alert("The 'About' field must not exceed 250 characters.");
      return;
    }

    const tags = tagsList.join("$");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("gameName", formData.gameName);
    formDataToSubmit.append("lendingPeriod", formData.lendingPeriod);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("tags", tags);
    formDataToSubmit.append("about", formData.about);
    formDataToSubmit.append("userId", userId);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("category", formData.category);

    setLoading(true); // Show loader
    try {
      const response = await axios.post(API_URLS.LEND_GAME, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Game lent successfully:", response.data);
      onSubmit(response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error(
        "Error lending the game:",
        error.response?.data || error.message
      );
      alert("Failed to lend the game. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      {/* <div
  id="crud-modal"
  className="fixed inset-0 z-50 flex justify-center items-center"
> */}
      {/* <div className="relative p-4 w-full max-w-lg max-h-full"> */}
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900">
            Lend Your Game
          </h3>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 px-4 md:px-10">
            <div>
              <label>Game Name</label>
              <input
                type="text"
                name="gameName"
                value={formData.gameName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label>Lending Period</label>
              <input
                type="number"
                name="lendingPeriod"
                value={formData.lendingPeriod}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 px-4 md:px-10">
            <div>
              <label>Tags (User can add upto 3 tags)</label>

              <div className="flex items-center">
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mr-2"
                  placeholder="Enter a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  +
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tagsList.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-red-500"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4 px-4 md:px-10">
            <label>About (maximum 200 Characters)</label>
            <p className="text-sm text-gray-500 mt-2">
              {formData.about.length} characters written
            </p>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleAboutChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="mb-4 px-4 md:px-10">
            <label>Game Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              accept="image/*"
              required
            />
          </div>

          <div className="mb-4 px-4 md:px-10">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a category</option>
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
          <div className="mb-4 px-4 md:px-10">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label>I accept the terms and conditions</label>
          </div>
          <div className="flex justify-end pb-4 pr-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 mr-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button> */}
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default LendGameModal;

// import React, { useState } from "react";
// import axios from "axios";
// import API_URLS from '../../config/urls.js';
// import LoadingButton from "./LoadingButton.jsx";

// const LendGameModal = ({ onClose, onSubmit }) => {
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("user_id");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     gameName: "",
//     lendingPeriod: "",
//     price: "",
//     tags: "",
//     about: "",
//     termsAccepted: false,
//     image: null,
//   });

//   const [tagsList, setTagsList] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     // Regular expression to allow letters, numbers, spaces, and basic punctuation
//     const validCharactersRegex = /^[a-zA-Z0-9\s]*$/;

//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       // Validate input value
//       if (validCharactersRegex.test(value) || value === "") {
//         setFormData({ ...formData, [name]: value });
//       }
//     }
//   };

//   const handleAboutChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     // Regular expression to allow letters, numbers, spaces, and special characters
//     const validCharactersRegex = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]*$/;

//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       // Validate input value
//       if (validCharactersRegex.test(value) || value === "") {
//         setFormData({ ...formData, [name]: value });
//       }
//     }
//   };

//   const handleAddTag = () => {
//     if (tagsList.length >= 3) {
//       alert("You can only add up to 3 tags.");
//       return;
//     }

//     if (formData.tags.trim() && !tagsList.includes(formData.tags.trim())) {
//       setTagsList([...tagsList, formData.tags.trim()]);
//       setFormData({ ...formData, tags: "" }); // Clear the input field after adding
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setTagsList(tagsList.filter((t) => t !== tag));
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.termsAccepted) {
//       alert("You must accept the terms and conditions to submit the form.");
//       return;
//     }

//   if (formData.about.length > 250) {
//     alert("The 'About' field must not exceed 250 characters.");
//     return;
//   }
//     const tags = tagsList.join("$");

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("gameName", formData.gameName);
//     formDataToSubmit.append("lendingPeriod", formData.lendingPeriod);
//     formDataToSubmit.append("price", formData.price);
//     formDataToSubmit.append("tags", tags);
//     formDataToSubmit.append("about", formData.about);
//     formDataToSubmit.append("userId", userId);
//     formDataToSubmit.append("image", formData.image);

//     setLoading(true); // Show loader
//     try {
//       const response = await axios.post(API_URLS.LEND_GAME, formDataToSubmit, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Game lent successfully:", response.data);
//       onSubmit(response.data);
//       onClose();
//     } catch (error) {
//       console.error("Error lending the game:", error.response?.data || error.message);
//       alert("Failed to lend the game. Please try again.");
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   return (
//     <div className= "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-16">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Lend a Game</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label>Game Name</label>
//             <input
//               type="text"
//               name="gameName"
//               value={formData.gameName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label>Lending Period</label>
//             <input
//               type="number"
//               name="lendingPeriod"
//               value={formData.lendingPeriod}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label>Tags</label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 name="tags"
//                 value={formData.tags}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md mr-2"
//                 placeholder="Enter a tag"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//               >
//                 +
//               </button>
//             </div>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {tagsList.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="ml-2 text-red-500"
//                   >
//                     x
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label>About</label>
//             <input
//               type="text"
//               name="about"
//               value={formData.about}
//               onChange={handleAboutChange}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label>Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label>Game Image</label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />
//           </div>
// <div className="mb-4 flex items-center">
//   <input
//     type="checkbox"
//     name="termsAccepted"
//     checked={formData.termsAccepted}
//     onChange={handleChange}
//     className="mr-2"
//   />
//   <label>I accept the terms and conditions</label>
// </div>
// <div className="flex justify-end">
//   <button
//     type="button"
//     className="bg-gray-300 px-4 py-2 mr-2 rounded-md"
//     onClick={onClose}
//   >
//     Cancel
//   </button>
//   {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
//     Submit
//   </button> */}
//   <button
//     type="submit"
//     className={`bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center ${
//       loading ? "cursor-not-allowed opacity-70" : ""
//     }`}
//     disabled={loading}
//   >
//     {loading ? (
//       <>
//         <svg
//           className="w-5 h-5 mr-2 text-white animate-spin"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//           ></path>
//         </svg>
//         Loading...
//       </>
//     ) : (
//       "Submit"
//     )}
//   </button>
// </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LendGameModal;
