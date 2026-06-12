import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserRole } from '@/types/auth';

export type AuthPage = 'login' | 'signup';

interface AuthState {
  isAuthenticated: boolean;
  authPage: AuthPage;
  user: AuthUser | null;
  setAuthPage: (page: AuthPage) => void;
  login: (email: string, name?: string, role?: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      authPage: 'login',
      user: null,
      setAuthPage: (page) => set({ authPage: page }),
      login: (email, name, role = 'citizen') =>
        set({ isAuthenticated: true, user: { email, name, role } }),
      logout: () =>
        set({ isAuthenticated: false, user: null, authPage: 'login' }),
    }),
    {
      name: 'stms-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
