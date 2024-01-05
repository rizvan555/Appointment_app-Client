import axios from 'axios';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    allUsers: [],
  }),
  getters: {},
  actions: {
    async getAllUsers() {
      const response = await axios.get(
        'http://localhost:5173/api/users/service'
      );
      const data = await response.data;
      console.log(data);
      this.allUsers = data;
    },
  },
});
