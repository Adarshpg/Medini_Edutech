
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }

      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }

    return "light"
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove the previous theme class
    root.classList.remove("light", "dark")

    // Add the current theme class
    root.classList.add(theme)

    // Save the theme preference
    localStorage.setItem("theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

