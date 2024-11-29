import axios from "axios";
import API_URLS from '../apiUrls/urls';
export const lendGame = async (data, token) => {
  return axios.post(API_URLS.LEND_GAME, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
