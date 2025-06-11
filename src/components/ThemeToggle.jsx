import { useTheme } from "./ThemeProvider"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:from-blue-600 dark:to-purple-700"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute inset-0 rounded-full ${theme === "dark" ? "bg-gray-900" : "bg-white"} transition-opacity duration-300 ${theme === "dark" ? "opacity-80" : "opacity-90"}`}
      ></span>

      <span
        className={`absolute left-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-yellow-500 shadow-sm transition-all duration-500 dark:bg-gray-800 ${theme === "dark" ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </span>

      <span
        className={`absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-blue-400 shadow-sm transition-all duration-500 dark:bg-white ${theme === "dark" ? "translate-x-0 opacity-100" : "translate-x-[-24px] opacity-0"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
    </button>
  )
}

export default ThemeToggle

