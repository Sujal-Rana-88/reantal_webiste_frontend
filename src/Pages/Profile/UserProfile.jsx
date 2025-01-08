import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_URLS from "../../config/urls";
import { toast } from "react-toastify";

import { Camera } from "lucide-react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  );
  const name = localStorage.getItem("user_name");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(""); 
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const profileUrl = localStorage.getItem("profilePicture");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    image: null,
  });

  const handleHideModal = () => setShowModal(false);

  // Mock user data - in a real app, this would come from your backend
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Regular expression to allow letters, numbers, spaces, and basic punctuation
    const validCharactersRegex = /^[a-zA-Z0-9\s]*$/;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      // Validate input value
      if (validCharactersRegex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // find current rating

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        console.log(userId);
        const requestData = { userId };

        const response = await axios.post(API_URLS.FETCH_USER_RATING, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          setRating(response.data[0].rating);
        } else {
          setRating(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("userId", userId);
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    if (image) formDataToSubmit.append("image", image);
    // const formDataToSubmit = {
    //   userId,
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   image : image? image : null
    // };

    if (image) {
      console.log("YES");
      console.log(image);
    }
    setLoading(true);
    try {
      const response = await axios.post(
        API_URLS.UPDATE_INFO,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Info Updated successfully ");
      localStorage.setItem("user_name", response.data.userName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("profilePicture", response.data.profilePictureUrl);
    } catch (error) {
      console.error(
        "Error Saving user Info:",
        error.response?.data || error.message
      );
      toast.error("Error Updating details ");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };
  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          // Edit Mode
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <img
                  src={profileUrl || avatarUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="relative">
                  <button
                    onClick={handleButtonClick}
                    className="absolute bottom-1 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <Camera className="w-5 h-5 text-gray-600" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*" // Restrict to image files
                  />
                  {/* Display the selected image (optional) */}
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Selected"
                        className="w-32 h-32 object-cover rounded-full border"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      // defaultValue={formData.firstName}
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              {/* <button
                          onClick={handleSave}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Save Changes
                        </button> */}

              <button
                onClick={handleSave}
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
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-8">
            <div className="flex items-start gap-8">
              <img
                src={profileUrl || avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                      {firstName} {lastName}
                    </h3>
                    <div className="flex items-center ms-4">
                      <svg
                        className="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                        {rating}
                      </p>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                      >
                        73 reviews
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-500">{email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
