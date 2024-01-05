<template>
  <div class="pb-8">
    <h1 class="mx-auto text-center text-3xl my-4 font-bold">Unsere Team</h1>

    <ul class="grid grid-cols-3 gap-4 px-10 py-2 text-center">
      <div data-aos="fade-up-right">
        <li class="border rounded pb-4 bg-white">
          <img
            :src="profileAvatar"
            alt="profileAvatar"
            class="w-[20vw] px-4 py-4 mx-auto"
          />
          <h1 class="text-2xl font-semibold">Claudio Berrafato</h1>
          <h5 class="text-l pb-3 font-serif">Senior Barber</h5>
        </li>
      </div>

      <div data-aos="flip-up">
        <li class="border rounded pb-4 bg-white">
          <img
            :src="profileAvatar"
            alt="profileAvatar"
            class="w-[20vw] px-4 py-4 mx-auto"
          />
          <h1 class="text-2xl font-semibold">Harun Ademoglu</h1>
          <h5 class="text-l font-serif">Barber</h5>
        </li>
      </div>

      <div data-aos="fade-up-left">
        <li class="border rounded pb-4 bg-white">
          <img
            :src="profileAvatar"
            alt="profile"
            class="w-[20vw] px-4 py-4 mx-auto"
          />
          <h1 class="text-2xl font-semibold">Patrik Müller</h1>
          <h5 class="text-l font-serif">Barber</h5>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import profileAvatar from '../assets/images/profileAvatar.png';
</script>
