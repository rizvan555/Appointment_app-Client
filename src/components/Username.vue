<template>
  <div
    v-for="user in users"
    :key="user.email"
    class="text-center my-2 text-l font-semibold font-serif"
  >
    {{ user.username }}
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getItem } from '../helper/persistanceStorage';

const users = ref<User[]>([]);

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
    // console.error('Error fetching users data:', error);
  }
});
</script>
