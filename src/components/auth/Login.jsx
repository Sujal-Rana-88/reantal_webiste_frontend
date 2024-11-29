import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import backgroundImage from '../../assets/login_page.jpg';
import API_URLS from '../../config/urls.js';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // const response = await axios.post('http://192.168.43.140:5000/login', {
      const response = await axios.post(API_URLS.LOGIN, {
      // const response = await axios.post('https://rental-website-backend.onrender.com/login', {
        
        email,
        password,
      });

      // Store the token and set the authentication flag in local storage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user_id', response.data.userId);
      localStorage.setItem('isAuthenticated', 'true'); 

      setMessage(response.data.message || "Login successful!");

      // Navigate to the Home screen after successful login
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="flex h-screen bg-blue-500"> {/* Set background color here */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white rounded-md p-2 w-full hover:bg-blue-700">
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button onClick={() => navigate('/signup')} className="text-blue-200 underline mt-4">
          Don't have an account? Signup
        </button>
      </div>
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      </div>
    </div>
  );
};

export default Login;
