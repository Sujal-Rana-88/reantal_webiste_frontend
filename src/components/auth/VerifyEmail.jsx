import axios from 'axios';
import React, { useState, useRef } from 'react';
import API_URLS from '../../config/urls';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Initialize as an array
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input if value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((digit) => digit === '')) {
      setMessage('Please enter a valid 6-digit OTP.');
      return;
    }

    const otpString = otp.join(''); // Convert the array to a string 
    console.log(otpString);

    try {
      setIsVerifying(true);

      const response = await axios.post(API_URLS.VERIFY_EMAIL, { otp: otpString });

      localStorage.setItem("isAuthenticated", "true");

      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage(response.data.message);

      toast.success(response.data.message);

      setIsVerifying(false);

      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed. Try again.');

      toast.error("Error: " + err.response.data.message)

      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setMessage('A new OTP has been sent to your email.');
    setIsResending(false);
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h2 style={styles.title}>Verify Your Email</h2>
        <p style={styles.description}>
          We've sent a 6-digit code to your email. Enter it below to verify your account.
        </p>
        <div style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              style={styles.otpInput}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button
          style={{ ...styles.button, ...(isVerifying ? styles.disabledButton : {}) }}
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.resendButton,
            ...(isResending ? styles.disabledButton : {}),
          }}
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
  },
  description: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#666',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    fontSize: '24px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '8px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  resendButton: {
    backgroundColor: 'white',
    color: '#007bff',
    border: '1px solid #007bff',
  },
  disabledButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  message: {
    textAlign: 'center',
    marginTop: '16px',
    color: '#000',
  },
};

export default VerifyEmail;
