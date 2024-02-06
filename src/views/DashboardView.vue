<script lang="ts" setup>
import { getItem } from '@/helper/persistanceStorage';
import { onMounted, ref } from 'vue';

const token = getItem('token');
const data = ref('');

onMounted(async () => {
  const response = await fetch('http://localhost:8080/api/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = await response.text();
});
</script>

<template>
  <h1 class="text-3xl mb-8">Dashboard</h1>
  <p>{{ data }}</p>
</template>
