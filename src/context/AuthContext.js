import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Cambio aquí

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) { 
      const decodedToken = jwtDecode(token); // Decodificamos el token
      localStorage.setItem('userId', decodedToken.userId); // Guardamos el userId en el localStorage
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
    localStorage.removeItem('userId');
    setIsLogIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLogIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
