import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) { 
      setIsLogIn(true); // Usuario logueado
    } else {
      setIsLogIn(false); // Usuario no logueado
    }
  }, []);

  // Función para iniciar sesión
  const login = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setIsLogIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setIsLogIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLogIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
