export const baseUrl = 'http://192.168.10.25:5000/';
export const baseUrlAssets = 'http://192.168.10.25:3000/';
export const baseUrlAssetsGigs = 'http://192.168.10.25:3000';
export const isDevelopement = false;
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLoginUserSelector } from '../store/loginUser/selector';
const setAuthToken = (token) => {
  const loginUser = useSelector(getLoginUserSelector);
  axios.defaults.headers.common['x-auth-token'] = loginUser.token;
};

export default setAuthToken;
