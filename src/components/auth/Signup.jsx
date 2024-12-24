import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import API_URLS from '../../config/urls.js';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      console.log(dob);
      // if (image) {
      //   data.append('image', image);
      // }

      const response = await axios.post(API_URLS.REGISTER, {
        userName,
        email,
        password,
        firstName, 
        lastName,
        phoneNumber,
        dob
      });
        
      setMessage(response.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputField label="Last Name" id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <InputField label="Username" id="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Phone Number" id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <InputField label="Date of Birth" id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <InputField label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Repeat Password" id="repeatPassword" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm" />
          </div>
          <button type="submit" className="col-span-1 md:col-span-2 bg-primary-600 text-white py-2 rounded-lg">Sign Up</button>
        </form>
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-primary-600 hover:underline">Log in</button>
        </p>
      </div>
    </section>
  );
};

const InputField = ({ label, id, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full p-2.5 text-sm rounded-lg border"
      required
    />
  </div>
);

export default Signup;
