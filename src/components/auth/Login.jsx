import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import backgroundImage from "../../assets/login_page.jpg";
import API_URLS from "../../config/urls.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // const response = await axios.post('http://192.168.43.140:5000/login', {
      const response = await axios.post(API_URLS.LOGIN, {
        // const response = await axios.post('https://rental-website-backend.onrender.com/login', {
        userName,
        password
      });

      // Store the token and set the authentication flag in local storage
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("user_name", response.data.userName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isAuthenticated", "true");

      setMessage(response.data.message || "Login successful!");

      // Navigate to the Home screen after successful login
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
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
                  Your email
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
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

    // <div className="flex h-screen bg-blue-500"> {/* Set background color here */}
    //   <div className="flex-1 flex flex-col justify-center items-center p-6">
    //     <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
    //     <form onSubmit={handleLogin} className="w-full max-w-xs">
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         className="border border-gray-300 rounded-md p-2 mb-4 w-full"
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         className="border border-gray-300 rounded-md p-2 mb-4 w-full"
    //       />
    //       <button type="submit" className="bg-blue-600 text-white rounded-md p-2 w-full hover:bg-blue-700">
    //         Login
    //       </button>
    //     </form>
    //     {error && <p className="text-red-500">{error}</p>}
    //     {message && <p className="text-green-500">{message}</p>}
    //     <button onClick={() => navigate('/signup')} className="text-blue-200 underline mt-4">
    //       Don't have an account? Signup
    //     </button>
    //   </div>
    //   <div
    //     className="hidden lg:flex flex-1 bg-cover bg-center"
    //     style={{ backgroundImage: `url(${backgroundImage})` }}
    //   >
    //   </div>
    // </div>
  );
}

export default Login;
