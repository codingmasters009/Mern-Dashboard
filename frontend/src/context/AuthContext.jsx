import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfilePicture = async (formData) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/dashboard/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prevUser) => ({ ...prevUser, profilePicture: response.data.user.profilePicture }));
      return response.data;
    } catch (err) {
      console.error("Error updating profile picture:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/dashboard', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(() => logout());
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);