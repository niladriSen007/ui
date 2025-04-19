"use client"
import { COOKIE_NAME, DEFAULT_THEME } from "@/lib/constant"
import { ActiveThemeProviderProps, ThemeContextType } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: DEFAULT_THEME,
  setActiveTheme: () => {},
})

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`
}

const ActiveThemeProvider = ({
  children,
  initialTheme,
}: ActiveThemeProviderProps) => {
  const [activeTheme, setActiveTheme] = useState<string>(
    initialTheme ?? DEFAULT_THEME
  )

  useEffect(() => {
    setThemeCookie(activeTheme)
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled")
    }
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ActiveThemeProvider

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}
