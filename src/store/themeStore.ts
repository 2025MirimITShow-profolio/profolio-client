import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeStore = {
  isDark: boolean
  toggleDark: () => void
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      isDark: false,
      toggleDark: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'profolio-theme', 
      storage: createJSONStorage(() => localStorage),
    }
  )
)