import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://10.161.151.8:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getVentasBoard() {
    return axios.get(API_URL + 'ventas', { headers: authHeader() });
  }

  getSuperAdminBoard() {
    return axios.get(API_URL + 'superadmin', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();