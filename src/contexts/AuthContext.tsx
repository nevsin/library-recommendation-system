/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from 'react';
import {
  signIn,
  signUp,
  signOut,
  fetchUserAttributes,
  fetchAuthSession,
} from 'aws-amplify/auth';
import { User } from '@/types';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // JWT'den role çıkarma
  const getRoleFromSession = async (): Promise<'admin' | 'user'> => {
    const session = await fetchAuthSession();
    const groups = session.tokens?.idToken?.payload[
      'cognito:groups'
    ] as string[] | undefined;

    return groups?.includes('admin') ? 'admin' : 'user';
  };

  //  Sayfa yenilenince auth kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const role = await getRoleFromSession();

        setUser({
          id: attributes.sub ?? '',
          email: attributes.email ?? '',
          name: attributes.name ?? '',
          role,
          createdAt: new Date().toISOString(),
        });
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn({ username: email, password });

      const attributes = await fetchUserAttributes();
      const role = await getRoleFromSession();

      setUser({
        id: attributes.sub ?? email,
        email: attributes.email ?? email,
        name: attributes.name ?? '',
        role,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  //  Logout
  const logout = async () => {
    await signOut();
    setUser(null);
  };

  //  Signup (Cognito REQUIRED 
  const signup = async (email: string, password: string, name: string) => {
    const nameParts = name.trim().split(' ');
    const givenName = nameParts[0];
    const familyName =
      nameParts.length > 1 ? nameParts.slice(1).join(' ') : givenName;

    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
          given_name: givenName,
          family_name: familyName,
        },
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
