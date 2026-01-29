"use client";

import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  // If no context, return mock implementation for now
  if (!context) {
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: async () => {
        console.warn('Auth context not provided');
      },
      logout: async () => {
        console.warn('Auth context not provided');
      },
      register: async () => {
        console.warn('Auth context not provided');
      },
    };
  }

  return context;
}

export { AuthContext };
export type { User, AuthContextValue };
