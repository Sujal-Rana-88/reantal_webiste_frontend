import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import backgroundImage from "../../assets/login_page.jpg";
import API_URLS from "../../config/urls.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const [load, setLoad] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(API_URLS.LOGIN, {
        userName,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_name", response.data.userName);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("profilePicture", response.data.profilePictureUrl);
      
      setMessage(response.data.message || "Login successful!");
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
    }
  };


const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);

    // Extract user data after successful Google login
    const { displayName, email, photoURL, uid } = res.user;

    const [firstName, ...lastNameArray] = displayName?.split(" ") || [];
    const lastName = lastNameArray.join(" ");
      localStorage.setItem("user_name", displayName);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", email);
    setEmail(email);
    setUserName(displayName);
    setFirstName(firstName);
    setLastName(lastName);

    const formData = new FormData();
    formData.append("email", email);

    if (image) {
      formData.append("image", image);
    }

    localStorage.setItem("redirectToRegister", "true");
    const response = await axios.post(API_URLS.GOOGLE_OAUTH_EMAIL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.status === 200) {
      // Store authentication details
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_name", response.data.userName);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("profilePicture", response.data.profilePictureUrl);

      navigate("/home");
    }
  } catch (err) {
    
    // Navigate to the register page and set a flag
    navigate("/auth/google/register");

    setError(err.response?.data?.message || err.message || "Something went wrong.");
  }
};

  

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full sm:max-w-md">
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center mt-4 px-5 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-800"
              >
                <FcGoogle className="mr-2" size={20} />
                Sign in with Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>



    </section>
  );
}

export default Login;
