<template>
  <div class="w-[96vw] grid grid-cols-2 gap-3">
    <div v-for="service in services" :key="service.id">
    <div data-aos="fade-right">
        <router-link :to="service.path">
          <div
            class="flex justify-center items-center border border-indigo-950 px-2 py-3 mb-2 rounded service-card"
          >
            <div class="w-[48vw] flex justify-center items-center">
              <img
                :src="service.image"
                alt="haarImage"
                class="w-[60px] h-[60px] rounded-full"
              />
            </div>
            <div class="flex flex-col gap-1 ml-4">
              <h3 class="text-[17px] w-[36vw]">{{ service.name }}</h3>
              <p class="text-[14px] text-red-500 font-semibold">
                {{ service.price }}
              </p>
            </div>
            <div class="w-[15vw]">
              <right-arrow />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RightArrow from '../assets/Icons/RightArrow.vue';
import { useServiceStore } from '../stores/useServiceStore';

const serviceStore = useServiceStore();
const services = serviceStore.services;
</script>
