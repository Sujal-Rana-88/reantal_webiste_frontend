import React, { useState } from "react";
import axios from "axios";
import API_URLS from '../../config/urls.js';

const LendGameModal = ({ onClose, onSubmit }) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    gameName: "",
    lendingPeriod: "",
    price: "",
    tags: "",
    about: "",
    termsAccepted: false,
    image: null,
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

  const handleAddTag = () => {
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
    // use your algo where divide it with $ sign
    // var tags = "";

    const tags = tagsList.join("$");
    console.log(tags);
    
    //! Prepare form data for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("gameName", formData.gameName);
    formDataToSubmit.append("lendingPeriod", formData.lendingPeriod);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("tags", JSON.stringify(tagsList)); // Submit tags as JSON
    formDataToSubmit.append("about", formData.about);
    formDataToSubmit.append("image", formData.image);

    try {
      // Sending the request to the correct backend URL
      const response = await axios.post(API_URLS.LEND_GAME, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      console.log("Game lent successfully:", response.data);
      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error("Error lending the game:", error.response?.data || error.message);
      alert("Failed to lend the game. Please try again.");
    }
  };

  return (
    <div className= "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Lend a Game</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label>Tags</label>
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
          <div className="mb-4">
            <label>About</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label>Game Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label>I accept the terms and conditions</label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 mr-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendGameModal;
