import './assets/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { setupCalendar } from 'v-calendar';


const app = createApp(App);
const vuetify = createVuetify();

app.use(createPinia());
app.use(router);

app.component('VueDatePicker', VueDatePicker);

app.use(vuetify).mount('#app');

app.use(VCalendar, {});
app.use(setupCalendar, {});
