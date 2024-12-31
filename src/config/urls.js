const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://rental-website-backend.onrender.com/'
    : 'http://localhost:5000';

// Export all API endpoints as constants
const API_URLS = {
  LEND_GAME: `${BASE_URL}/games/lend`,
  FETCH_GAMES: `${BASE_URL}/games/all-games`,
  FETCH_USER_LENDED_GAMES: `${BASE_URL}/games/user-lended-games`,
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  UPDATE_GAME: `${BASE_URL}/games/update`,
  UPLOADS: `${BASE_URL}/uploads`,
  VERIFY_EMAIL: `${BASE_URL}/verifyEmail`,
<<<<<<< HEAD
  DELETE_ACCOUNT: `${BASE_URL}/deleteAccount`
=======
  UPDATE_INFO: `${BASE_URL}/user/settings`
>>>>>>> 16d252c6734901a1a776cfe4c24e041cb55ea746
};

export default API_URLS;
