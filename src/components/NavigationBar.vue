<template>
  <div class="flex items-center justify-between gap-4 pr-10 py-1 bg-slate-900">
    <div class="flex items-center gap-[22vw]">
      <div class="flex items-center">
        <div class="flex flex-col items-center justify-center relative">
          <div class="flex items-center z-20 font-serif">
            <h1 class="text-xl font-semibold text-white text-[20px] ml-8">
              <a href="/">
                <h1 class="w-16 my-6 z-0 rounded-full ml-8">BARBERSHOP</h1>
              </a>
            </h1>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-[32px]">
        <button class="font-bold nav-buttons text-[17px]">
          <a href="/">Home</a>
        </button>
        <button class="font-bold nav-buttons text-[17px]">
          <a href="/about">Über uns</a>
        </button>

        <div class="flex" v-for="nav in allNavs.navs">
          <a
            href="termin"
            class="px-2 py-1 font-bold active:scale-95 transition-all nav-buttons text-[17px]"
          >
            Termin
          </a>
        </div>

        <button class="font-bold nav-buttons text-[17px]">
          <a href="team">Team</a>
        </button>
        <button class="font-bold nav-buttons text-[17px]">
          <a href="galerie">Galerie</a>
        </button>
        <button class="font-bold nav-buttons text-[17px]">
          <a href="kontakt">Kontakt</a>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 text-white ml-4">
      <div class="flex items-center gap-1 mr-2" v-if="hasToken">
        <h1>Hallo,</h1>
        <div class="">
          <Username />
        </div>
      </div>
      <div class="d-flex justify-space-around">
        <v-menu ref="menu">
          <template v-slot:activator="{ props }">
            <button
              class="avatarLetter border border-gray-800 rounded-full w-[36px] h-[36px] flex justify-center items-center logout-button bg-slate-200"
              v-bind="props"
              v-if="hasToken"
            >
              <AvatarLetter />
            </button>

            <button
              v-if="!hasToken"
              class="z-30 active:scale-95 transition-all"
              v-bind="props"
            >
              Anmelden
            </button>
          </template>
          <v-list>
            <v-list-item
              v-for="myMenu in filteredMenu"
              :key="myMenu.id"
              :value="myMenu.id"
            >
              <v-list-item-title class="flex justify-center items-center gap-3">
                <component :is="myMenu.icon" class="w-[20px] h-[25px]" />
                <a :href="myMenu.path" class="w-[70px] font-semibold">
                  {{ myMenu.name }}</a
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserNotService } from '@/types';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { VList, VListItem, VListItemTitle, VMenu } from 'vuetify/components';
import { getItem } from '../helper/persistanceStorage';
import { useNavbarStore } from '../stores/useNavbar';
import AvatarLetter from './AvatarLetter.vue';
import Username from './Username.vue';

const allNavs = useNavbarStore();
const users = ref<UserNotService[]>([]);
const token = getItem('token');
const hasToken = ref(token !== null);

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get('/api/api/users/authUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ((response && response.data, Array.isArray(response.data))) {
      users.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});

const filteredMenu = computed(() => {
  return allNavs.menu.filter((myMenu) => {
    return token ? myMenu.isLogged : !myMenu.isLogged;
  });
});
</script>
