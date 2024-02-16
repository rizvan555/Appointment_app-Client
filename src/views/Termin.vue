<script setup lang="ts">
import type { User } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Service from '../components/Service.vue';
import { getItem } from '../helper/persistanceStorage';

const users = ref<User[]>([]);

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get('/api/api/users/allUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      users.value = [response.data];
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});
</script>

<template>
  <main class="flex flex-col justify-center items-center rounded mb-10">
    <div class="flex flex-col">
      <h1 class="flex justify-center text-3xl mt-7 mb-10 font-bold">
        Unsere Angebote
      </h1>
    </div>

    <div class="service_component">
      <Service />
    </div>
  </main>
</template>
