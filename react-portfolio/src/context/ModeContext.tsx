import React, { createContext, useState, useContext } from "react";

interface ModeContextType {
  mode: string;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType>({
  mode: "dark",
  toggleMode: () => {},
});

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<string>("dark");
  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
