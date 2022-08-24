import { defineStore, StoreDefinition } from 'pinia';
import Cookies from 'js-cookie';
import { User } from '../types/userType';
import { env } from '../utils/myVariable';

export const useAuthStore: StoreDefinition = defineStore({
  id: 'auth',
  state: () => ({
    currentUser: {} as User | {},
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    loginUser(user: User) {
      (this.currentUser = user), (this.isAuthenticated = true);
    },

    logoutUser() {
      Cookies.remove(env.nameCookie);
    },
  },
});
