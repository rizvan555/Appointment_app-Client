import { defineStore } from 'pinia';
import LogIn from '../assets/Icons/LogIn.vue';
import LogOut from '../assets/Icons/LogOut.vue';
import Profile from '../assets/Icons/Profile.vue';
import Register from '../assets/Icons/Register.vue';


export const useNavbarStore = defineStore('navStore', {
  state: () => ({
    navs: [{ id: 1, name: 'Home', path: '/' }],
    menu: [
      {
        id: 1,
        name: 'Profile',
        path: '/profile',
        isLogged: true,
        icon: Profile,
      },
      {
        id: 2,
        name: 'Login',
        path: '/login',
        isLogged: false,
        icon: LogIn,
      },
      {
        id: 3,
        name: 'Register',
        path: '/register',
        isLogged: false,
        icon: Register,
      },
      {
        id: 4,
        name: 'SignOut',
        path: '/signOut',
        isLogged: true,
        icon: LogOut,
      },
    ],
  }),
  getters: {},

  actions: {},
});
