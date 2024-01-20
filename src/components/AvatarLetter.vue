<template>
  <div
    v-for="user in users"
    :key="user.id"
    class="flex justify-center items-center text-center text-black font-semibold font-serif text-3xl"
  >
    {{ user.username.split('')[0] }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '../api/axios';
import { getItem } from '../helper/persistanceStorage';
import type { UserNotService } from '../types';

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
      'Mevcut kullanıcı verileri getirilirken bir hata oluştu:',
      error
    );
  }
});
</script>
