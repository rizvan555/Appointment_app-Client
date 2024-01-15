<template>
  <div
    class="flex w-[45vw] my-28 py-10 px-10 rounded mx-auto items-center justify-center reg-container"
  >
    <div class="text-center">
      <h3 class="text-xl font-bold mb-6">
        Sind Sie sicher, dass Sie sich abmelden möchten?
      </h3>
      <div class="flex justify-center items-center gap-4">
        <button
          @click="signOut"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ja, abmelden
        </button>
        <button
          @click="toHomePage"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Nein, abbrechen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps([]);
const router = useRouter();

const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Signing out...');
  router.push('/');
};

const toHomePage = () => {
  router.push('/');
};
</script>
