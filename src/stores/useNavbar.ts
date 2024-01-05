import Profile from '../assets/Icons/Profile.vue';
import LogIn from '../assets/Icons/LogIn.vue';
import LogOut from '../assets/Icons/LogOut.vue';
import Register from '../assets/Icons/Register.vue';
import { defineStore } from 'pinia';

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
        name: 'SignIn',
        path: '/signIn',
        isLogged: false,
        icon: LogIn,
      },
      {
        id: 3,
        name: 'SignUp',
        path: '/signUp',
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
