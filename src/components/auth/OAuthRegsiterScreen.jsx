import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import API_URLS from "../../config/urls.js";

const OAuthRegsiterScreen = () => {
  const name = localStorage.getItem("user_name");
  const userFirstName = localStorage.getItem("firstName");
  const userLastName = localStorage.getItem("lastName");
  const userEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(userEmail || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userName, setUserName] = useState(name || "");
  const [firstName, setFirstName] = useState(userFirstName || "");
  const [lastName, setLastName] = useState(userLastName || "");
  const [phoneNumber, setPhoneNumber] = useState("" || "");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const [load, setLoad] = useState(false);

  const InputField = ({ label, id, type, value, onChange }) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          required
        />
      </div>
    );
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("dob", dob);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        API_URLS.GOOGLE_OAUTH_REGISTER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      setLoad(true);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_name", response.data.userName);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("profilePicture", response.data.profilePictureUrl);

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
    setShowModal(false);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-6 sm:py-12 md:py-20">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an Account
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmitModal} className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => {
                const value = e.target.value.replace(/\s+/g, ""); // Remove spaces
                setUserName(value);
              }}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="repeatPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="block w-full p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>

        {/* Verification message */}
        <p className="font-semibold text-md text-red-400">
          {load && "Please check your mail for verification"}
        </p>
      </div>
    </section>
  );
};
 
export default OAuthRegsiterScreen;
