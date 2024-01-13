<template>
  <div class="">
    <v-table density="compact" class="">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">E-Mail</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Service</th>
          <th class="text-left">Datum</th>
          <th class="text-left">Uhr</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUserList" :key="user.username">
          <td class="text-[13px] w-[20vw]">{{ user.username }}</td>
          <td class="text-[13px]">{{ user.email }}</td>
          <td class="text-[13px]">{{ user.phone }}</td>
          <!-- <td class="text-[13px] w-[26vw]">{{ user.selectedService }}</td> -->
          <td class="text-[13px] w-[17vw]">
            {{ user.createTime.split('T')[0] }}
          </td>
          <td class="text-[13px] w-[8vw]">
            {{ user.createTime.split('T')[1].split('.')[0].slice(0, 5) }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { CustomerListProps } from '@/types';
import { computed, onMounted, ref } from 'vue';
import { VTable } from 'vuetify/components';

const userList = ref<CustomerListProps[]>([]);

const sortedUserList = computed(() => {
  return userList.value.sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
});

onMounted(async () => {
  try {
    const response = await fetch('/api/api/users/allUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user list');
    }

    const data = await response.json();
    userList.value = data;
    console.log(userList.value);
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
});
</script>
