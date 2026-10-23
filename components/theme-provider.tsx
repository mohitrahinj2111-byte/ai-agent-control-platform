"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme");
    const initialTheme: Theme =
      savedTheme === "dark" ? "dark" : "light";

    setThemeState(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setLoaded(true);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    localStorage.setItem("site-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setThemeState(nextTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={loaded ? "" : "invisible"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}