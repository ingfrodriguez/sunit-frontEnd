import axios from 'axios';

//const API_URL = 'http://10.161.151.8:8080/api/auth/';
const API_URL = 'http://192.168.232.98:8080/api/auth/';
//const API_URL = 'http://10.168.0.120:8080/api/auth/';
//const API_URL = 'http://10.161.187.35:8080/api/auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles
    });
  }
}

export default new AuthService();
