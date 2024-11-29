import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')); 

  return isAuthenticated ? children : <Navigate to="/" />; 
};

export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';


// const ProtectedRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('access_token');
//     const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
//     const [isLoading, setIsLoading] = useState(true); // State to track loading

//     useEffect(() => {
//         const checkToken = () => {
//             // Check if there is no token or if the token is expired
//             if (!token || !isAuthenticated || isTokenExpired(token)) {
//                 navigate('/login'); // Redirect to login
//             } else {
//                 setIsLoading(false); // Set loading to false if token is valid
//             }
//         };

//         checkToken(); // Call the function to check token validity
//     }, [token, navigate, isAuthenticated]);

//     const isTokenExpired = (token) => {
//         try {
//             const decodedToken = jwtDecode(token);
//             const expirationTime = decodedToken.exp * 1000; // convert to milliseconds
//             const currentTime = Date.now();
//             return expirationTime < currentTime;
//         } catch (error) {
//             console.error('Invalid token', error);
//             return true; // Treat invalid token as expired
//         }
//     };

//     // If loading, do not render children yet
//     if (isLoading) {
//         return null; // Prevent rendering the children until loading is complete
//     }

//     // Render children only if authenticated and token is valid
//     return isAuthenticated && token && !isTokenExpired(token) ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
