<template>
  <div v-if="users.length > 0 && users[0].username === 'Rizvan'">
    <div class="mt-1 mb-6 h-[70vh]">
      <v-layout class="">
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          class=""
        >
          <v-list-item
            v-for="user in users"
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            nav
            @click.stop="rail = !rail"
            class="py-3 px-4"
          >
            <div v-if="user.username === 'rizvan'">
              <b>Hallo:</b> {{ user.username }}
            </div>
            <div v-else><b>Hallo,</b> {{ user.username }}</div>
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

            <v-list density="compact" nav>
              <v-list-item
                prepend-icon="mdi-home-city"
                title="Home"
                value="home"
                @click="updateValue('home')"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-account"
                title="Mein Konto"
                value="account"
                @click="updateValue('account')"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Benutzer"
                value="users"
                @click="updateValue('users')"
              ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <div class="">
          <div
            v-if="value === 'home'"
            class="w-[90vw] ml-28 border"
            :class="{ 'w-[76vw] ml-[22vw]': !rail }"
          >
            <customer-list></customer-list>
          </div>

          <div
            v-if="value === 'account'"
            class="ml-96"
            :class="{ 'w-[5vw] ml-[38vw]': !rail }"
          >
            <profile></profile>
          </div>
        </div>
      </v-layout>
    </div>
  </div>
  <div v-else>
    <ErrorPage />
  </div>
</template>

<script setup lang="ts">
import type { User, UserNotService } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {
  VBtn,
  VDivider,
  VLayout,
  VList,
  VListItem,
  VNavigationDrawer,
} from 'vuetify/components';
import CustomerList from '../../components/CustomerList.vue';
import { getItem } from '../../helper/persistanceStorage';
import { useUsersStore } from '../../stores/useAllUsers';
import Profile from '../../views/Profile.vue';
import ErrorPage from '../404.vue';

const drawer = ref(true);
const rail = ref(true);
const allUsers = ref<User[]>([]);
const users = ref<UserNotService[]>([]);
const value = ref('home');
const usersStore = useUsersStore();
console.log(usersStore);
const token = getItem('token');

const updateValue = (newValue: any) => {
  value.value = newValue;
};

onMounted(async () => {
  try {
    const token = getItem('token');

    const response = await axios.get('/api/api/users/authUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      const userData = response.data;
      users.value = [userData];
    }
  } catch (error) {
    console.error(
      'An error occurred while retrieving existing user data:',
      error
    );
  }
});
</script>
