"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type LoadingState = { isLoading: boolean; message?: string };
type LoadingContextType = LoadingState & {
  start: (message?: string) => void;
  stop: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const value = useMemo(
    () => ({
      ...state,
      start: (message?: string) => setState({ isLoading: true, message }),
      stop: () => setState({ isLoading: false, message: undefined }),
    }),
    [state]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}