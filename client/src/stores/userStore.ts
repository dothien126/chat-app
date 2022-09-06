import { defineStore, StoreDefinition } from 'pinia';
import { IUser } from '../types/userType';

export const UserStore: StoreDefinition = defineStore({
  id: 'users',
  state: () => ({
    users: [] as IUser[],
  }),
  getters: {},
  actions: {
    getAllUser(users: IUser[]) {
      this.users = users;
    },
  },
});
