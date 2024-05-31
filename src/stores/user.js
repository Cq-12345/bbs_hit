// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    userPosts: [],
    userReplies: []
  }),
  actions: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user/profile');
        if (response.data.success) {
          this.userInfo = response.data.data;
        } else {
          throw new Error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    async fetchUserPosts() {
      try {
        const response = await axios.get('/api/user/posts');
        if (response.data.success) {
          this.userPosts = response.data.posts;
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchUserReplies() {
      try {
        const response = await axios.get('/api/user/replies');
        if (response.data.success) {
          this.userReplies = response.data.replies;
        } else {
          throw new Error('Failed to fetch replies');
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    }
  }
});
