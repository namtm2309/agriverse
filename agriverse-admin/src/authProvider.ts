import { AuthProvider } from 'react-admin';

const API_URL = '/api';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Sai tài khoản hoặc mật khẩu');
    }

    const data = await response.json();
    localStorage.setItem('agriverse_token', data.access_token);
  },

  logout: () => {
    localStorage.removeItem('agriverse_token');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('agriverse_token')
      ? Promise.resolve()
      : Promise.reject();
  },

  checkError: () => Promise.resolve(),

  getPermissions: () => Promise.resolve(),
};


