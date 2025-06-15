import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type userStore = {
  token: string
  setToken: (val:string) => void
}

export const useUserStore = create(
  persist<userStore>(
    (set) => ({
      token: '',
      setToken: (val) => set({ token: val })
    }),
    {
      name: 'profolio-user', 
      storage: createJSONStorage(() => localStorage),
    }
  )
)