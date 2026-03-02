import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  email: string;
  username?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const BASE_URL = 'https://fakestoreapi.com';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.post(`${BASE_URL}/auth/login`, {
            username,
            password
          });

          if (response.data.token) {
            set({
              user: { email: username, username },
              token: response.data.token,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({ error: 'Invalid response from server', isLoading: false });
            return false;
          }
        } catch (error) {
          let errorMessage = 'Login failed. Please check your credentials.';
          
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
              errorMessage = 'Invalid username or password';
            }
          }
          
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);