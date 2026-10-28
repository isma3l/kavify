"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type PropsAuth = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: PropsAuth) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ununscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => ununscribe();
  }, []);

  const getToken = useCallback(async () => {
    if (!user) return null;
    return user.getIdToken();
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      getToken,
    }),
    [user, loading, getToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw Error("useAuth must be use inside AuthProvider");
  }
  return context;
}
