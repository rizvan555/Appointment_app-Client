<template>
  <div class="text-center my-2 text-l font-semibold font-serif text-white">
    <div v-for="user in users" :key="user.id">
      {{ user.username }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserNotService } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getItem } from '../helper/persistanceStorage';

const users = ref<UserNotService[]>([]);

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
      console.log(userData);
      users.value = [userData];
      console.log(users.value[0].username.split('')[0]);
    }
  } catch (error) {
    console.error(
      'An error occurred while retrieving existing user data:',
      error
    );
  }
});
</script>
