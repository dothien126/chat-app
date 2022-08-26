import { defineStore, StoreDefinition } from 'pinia';
import { IUser, User } from '../types/userType';

export const useUserStore: StoreDefinition = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[],
  }),
  getters: {},
  actions: {
    getAllUser(users: User[]) {
      this.users = users;
    },
  },
});
