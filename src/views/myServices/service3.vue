<template>
  <div class="w-[60vw] mx-auto mb-2 pt-1 pb-4 bg-white calendar">
    <div class="" v-if="!showSuccessMessage && userDetails.username">
      <!-- <div class="flex justify-center items-center gap-2 mb-[-25px] mx-auto">
        <p class="text-l">Hallo</p>
        <user-name />
      </div> -->
      <div class="flex justify-center items-center gap-2">
        <p class="text-l text-indigo-950">Ihre Wahl ist</p>
        <NameService :serviceId="3" />
      </div>
    </div>

    <div
      class="flex flex-col justify-center items-center mt-2 gap-3"
      v-if="!showSuccessMessage && userDetails.username"
    >
      <h6 class="text-indigo-950 font-bold">Wählen Sie Ihren Termin</h6>
      <img :src="DownArrow" alt="Down Arrow" class="" />
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
import UserName from '../../components/Username.vue';
import DownArrow from '../../assets/Icons/down-arrow.gif';

const showSuccessMessage = ref(false);
const userDetails = ref({ username: '', email: '' });

provide('userDetails', userDetails);
provide('showSuccessMessage', showSuccessMessage);
</script>
