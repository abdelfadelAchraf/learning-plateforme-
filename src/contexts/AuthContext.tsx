import React, { createContext, useContext, useState, useEffect,type  ReactNode } from 'react';
import type { AuthContextType, User, LoginCredentials } from '../types/auth';
import {  useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '../graphql';



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    console.log('Login appelé avec', credentials);
    try {
      setIsLoading(true);
      const { data } = await loginMutation({
        variables: { input: credentials }
      });
      console.log('Données de connexion reçues:', data);

      const { token, user } = data.login;
      
      // Stocker dans le state
      setToken(token);
      setUser(user);
      
      // Stocker dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

    } catch (error: any) {
      throw new Error(error.message || 'Échec de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Supprimer du state
    setToken(null);
    setUser(null);
    
    // Supprimer du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Optionnel: Rediriger vers la page de login
    window.location.href = '/login';
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};