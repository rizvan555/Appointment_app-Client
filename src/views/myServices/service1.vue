<template>
  <div class="w-[60vw] mx-auto mb-2 pt-1 pb-4 bg-white calendar">
    <div class="" v-if="!showSuccessMessage && userDetails.username">
      <div class="flex justify-center items-center gap-2">
        <p class="text-l text-indigo-950">Ihre Wahl ist</p>
        <NameService :serviceId="1" />
      </div>
    </div>
    <div class="">
      <select-date :showSuccessMessage="showSuccessMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import NameService from '../../components/NameService.vue';
import SelectDate from '../../components/SelectDate.vue';

const showSuccessMessage = ref(false);
const userDetails = ref({ username: '', email: '', phone: '' });

provide('userDetails', userDetails);
provide('showSuccessMessage', showSuccessMessage);
</script>
