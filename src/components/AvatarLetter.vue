<template>
  <div
    v-for="user in users"
    :key="user.email"
    class="flex justify-center items-center text-center text-black font-semibold font-serif text-3xl"
  >
    {{ user.username.split('')[0] }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '../api/axios';
import { getItem } from '../helper/persistanceStorage';
import { useServiceStore } from '../stores/useServiceStore';
import type { User } from '../types';

const users = ref<User[]>([]);
const serviceStore = useServiceStore();

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get('/api/api/users/allUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data && Array.isArray(response.data)) {
      users.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});
</script>
