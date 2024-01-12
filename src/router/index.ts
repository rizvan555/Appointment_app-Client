import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Kontakt from '../views/Contact.vue';
import Galerie from '../views/Gallery.vue';
import Homeview from '../views/Homeview.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Register from '../views/Register.vue';
import SignOut from '../views/SignOut.vue';
import Team from '../views/Team.vue';
import Termin from '../views/Termin.vue';
import Admin from '../views/dashboard/Admin.vue';
import Service1 from '../views/service1.vue';
import Service2 from '../views/service2.vue';
import Service3 from '../views/service3.vue';
import Service4 from '../views/service4.vue';
import Service5 from '../views/service5.vue';
import Service6 from '../views/service6.vue';
import Service7 from '../views/service7.vue';
import Service8 from '../views/service8.vue';
import Service9 from '../views/service9.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homeview,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/termin',
      name: 'termin',
      component: Termin,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signOut',
      name: 'signOut',
      component: SignOut,
    },
    {
      path: '/service1',
      name: 'service1',
      component: Service1,
    },
    {
      path: '/service2',
      name: 'service2',
      component: Service2,
    },
    {
      path: '/service3',
      name: 'service3',
      component: Service3,
    },
    {
      path: '/service4',
      name: 'service4',
      component: Service4,
    },
    {
      path: '/service5',
      name: 'service5',
      component: Service5,
    },
    {
      path: '/service6',
      name: 'service6',
      component: Service6,
    },
    {
      path: '/service7',
      name: 'service7',
      component: Service7,
    },
    {
      path: '/service8',
      name: 'service8',
      component: Service8,
    },
    {
      path: '/service9',
      name: 'service9',
      component: Service9,
    },
    {
      path: '/dashboard/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/team',
      name: 'team',
      component: Team,
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: Kontakt,
    },
    {
      path: '/galerie',
      name: 'galerie',
      component: Galerie,
    },
  ],
});

export default router;
