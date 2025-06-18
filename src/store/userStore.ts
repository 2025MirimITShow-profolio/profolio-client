import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type userStore = {
  token: string
  setToken: (val:string) => void,
  projectId: number | null,
  setProjectId: (val: number|null) => void
}

export const useUserStore = create(
  persist<userStore>(
    (set) => ({
      token: '',
      projectId: null,
      setToken: (val) => set({ token: val }),
      setProjectId: (val) => set({projectId: val})
    }),
    {
      name: 'profolio-user', 
      storage: createJSONStorage(() => localStorage),
    }
  )
)