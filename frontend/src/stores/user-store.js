import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    data: {},
  }),
  getters: {
    userData() {
      return this.data;
    },
  },
  actions: {
    setData(data) {
      this.data = data;
    },
  },
});
