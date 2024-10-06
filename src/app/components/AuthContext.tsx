// app/context/AuthContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: string;  // 'true' or 'false'
  user: string | null;
  login: (username: string,isAdmin:boolean) => void;
  logout: () => void;
  isAdmin : boolean;
  gainedPoints: number;
  addedScore: (points: number) => void;
  setIsAdmin: (isAdmin: boolean) => void;
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
  const [gainedPoints, setGainedPoints] = useState<number>(0);
 const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const login = (email: string,isAdmin:boolean) => {
    setUser(email);
    setIsAdmin(isAdmin);
    setIsLoggedIn(email);

    localStorage.setItem('isLoggedIn', email);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn('');
    localStorage.setItem('isLoggedIn', '');
  };

  const addedScore = (points: number) => {
    setGainedPoints((prevPoints) => prevPoints + points);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout,addedScore,gainedPoints,isAdmin ,setIsAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};
