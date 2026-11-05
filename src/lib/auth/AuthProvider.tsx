"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { AuthResponse, User } from "@/lib/api/types";

const STORAGE_KEY = "skybook-auth";

type StoredAuth = {
  token: string;
  expiresAt: string;
  user: User;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isReady: boolean; // false on the server and the first moment in the browser
  saveLogin: (response: AuthResponse) => void;
  logout: () => void;
};

// --- A tiny "store" around localStorage ---

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // login or logout in another tab
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function readStoredText() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage is blocked (for example in some private windows)
  }
}

function parseStoredAuth(text: string | null): StoredAuth | null {
  if (!text) return null;
  try {
    const stored = JSON.parse(text) as StoredAuth;
    // An expired token is the same as being logged out
    return new Date(stored.expiresAt) > new Date() ? stored : null;
  } catch {
    return null;
  }
}

const subscribeNothing = () => () => {};

// --- The provider ---

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedText = useSyncExternalStore(subscribe, readStoredText, () => null);
  const isReady = useSyncExternalStore(subscribeNothing, () => true, () => false);

  const value = useMemo<AuthContextValue>(() => {
    const auth = parseStoredAuth(storedText);

    return {
      user: auth?.user ?? null,
      token: auth?.token ?? null,
      isReady,
      saveLogin: (response) => {
        const stored: StoredAuth = {
          token: response.token,
          expiresAt: response.expiresAt,
          user: response.user,
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch {
          // storage is blocked: the user stays logged in until the page closes
        }
        notifyListeners();
      },
      logout: () => {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // nothing to remove
        }
        notifyListeners();
      },
    };
  }, [storedText, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}