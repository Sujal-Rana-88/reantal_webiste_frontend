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
  DELETE_ACCOUNT: `${BASE_URL}/deleteAccount`,
  UPDATE_INFO: `${BASE_URL}/user/settings`,
  UPDATE_PASSWORD: `${BASE_URL}/changepassword`,
  FETCH_USER_INFO: `${BASE_URL}/getUser`,
  FETCH_USER_RATING: `${BASE_URL}/user/ratings`,
  GOOGLE_OAUTH_EMAIL: `${BASE_URL}/auth/google/checkemail`,
  GOOGLE_OAUTH_REGISTER: `${BASE_URL}/auth/google/register`,
};

export default API_URLS;
