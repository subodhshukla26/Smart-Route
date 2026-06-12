import { create } from 'zustand';
import type { ActivePage } from '@/types';

interface AppState {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),
}));
