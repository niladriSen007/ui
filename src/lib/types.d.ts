enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  DEFAULT = 'default',
}

export interface ActiveThemeProviderProps{
  children: ReactNode
  initialTheme?: Theme | string
}

export interface ThemeContextType {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}