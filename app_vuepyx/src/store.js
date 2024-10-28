// store.js
import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUserDetails({ commit }) {
      try {
        const response = await axios.post('/asis/detail', {
          correo: localStorage.getItem('correo')
        },{          
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  },
  plugins: [createPersistedState()]
});
