<template>
  <div
    v-for="user in users"
    :key="user.email"
    class="text-center my-2 text-l text-black font-semibold font-serif"
  >
    {{ user.username.split('')[0] }}
  </div>
</template>

<script setup lang="ts">
import { getItem } from '../helper/persistanceStorage';
import { useServiceStore } from '../stores/useServiceStore';
import type { User } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);
const serviceStore = useServiceStore();

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get('/api/users', {
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
