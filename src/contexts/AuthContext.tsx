/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { signIn, signUp, signOut, getCurrentUser } from "aws-amplify/auth";
import { User } from "@/types";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cognitoUser = await getCurrentUser();
        setUser({
          id: cognitoUser.userId,
          email: cognitoUser.signInDetails?.loginId || "",
          name: cognitoUser.username,
          role: "user",
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn({ username: email, password });
      const cognitoUser = await getCurrentUser();
      setUser({
        id: cognitoUser.userId,
        email: cognitoUser.signInDetails?.loginId || "",
        name: cognitoUser.username,
        role: "user",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

 const signup = async (email: string, password: string, name: string) => {
  setIsLoading(true);
  try {
    const [givenName, ...rest] = name.split(" ");
    const familyName = rest.join(" ") || givenName;

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
  } finally {
    setIsLoading(false);
  }
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
