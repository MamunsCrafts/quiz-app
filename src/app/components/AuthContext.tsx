// app/context/AuthContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: string;  // 'true' or 'false'
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

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
  const [isLoggedIn, setIsLoggedIn] = useState<string>(''); 
  const [user, setUser] = useState<string | null>(null);

  const login = (email: string) => {
    setUser(email);
    setIsLoggedIn(email);
    localStorage.setItem('isLoggedIn', email);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn('');
    localStorage.setItem('isLoggedIn', '');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
