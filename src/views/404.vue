<template>
  <div class="flex justify-center items-center mx-auto gap-10">
    <div class="flex w-[35vw]">
      <Barber404 />
    </div>
    <div class="flex flex-col w-[30vw]">
      <div class="flex flex-col mb-6">
        <p class="font-bold text-4xl mb-1">HOPLAAA .....</p>
        <p class="font-bold text-4xl">SEITE NICHT GEFUNDEN</p>
      </div>
      <p class="font-normal text-[18px]">
        Du muss dich für die falsche Tür entschieden haben, denn ich kann die
        Seite nicht finden, nach der du suchst
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Barber404 from '../assets/Icons/Barber404.vue';
</script>
