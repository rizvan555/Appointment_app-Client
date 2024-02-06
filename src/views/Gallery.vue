<template>
  <div
    class="flex flex-col justify-center items-center text-3xl font-bold pt-10 pb-16"
  >
    <h1 class="mb-12">FOTOS UNSERER VERANSTALTUNGEN</h1>

    <div class="grid grid-cols-3 gap-x-10 gap-y-5">
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>

      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>

      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <img :src="profileAvatar" alt="profileAvatar" class="w-72 border" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import profileAvatar from '../assets/images/profileAvatar.png';
</script>
