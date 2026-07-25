import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

import {
  saveToken,
  saveUser,
  getToken,
  getUser,
  clearStorage
} from "../utils/storage";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);



  // Load user when app starts
  useEffect(() => {

    const storedToken = getToken();
    const storedUser = getUser();


    if (storedToken && storedUser) {

      setToken(storedToken);
      setUser(storedUser);

    }


    setLoading(false);


  }, []);





  // Register
  const register = async (userData) => {

    const response = await API.post(
      "/auth/register",
      userData
    );


    const {
      token,
      user
    } = response.data;


    saveToken(token);
    saveUser(user);


    setToken(token);
    setUser(user);


    return response.data;

  };





  // Login
  const login = async (credentials) => {


    const response = await API.post(
      "/auth/login",
      credentials
    );


    const {
      token,
      user
    } = response.data;



    saveToken(token);
    saveUser(user);


    setToken(token);
    setUser(user);



    return response.data;

  };





  // Logout
  const logout = () => {

    clearStorage();

    setToken(null);
    setUser(null);

  };





  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );


};