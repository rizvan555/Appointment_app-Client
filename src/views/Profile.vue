<template>
  <div v-if="token">
    <div class="mb-16 h-[60vh]">
      <div
        class="flex flex-col my-24 pb-10 mx-auto text-center border w-[40vw] contact bg-slate-50 rounded"
        :class="{
          'h-[60vh]':
            updatedInfo.name || updatedInfo.phone || updatedInfo.email,
        }"
      >
        <div class="bg-slate-900 rounded-t">
          <h1 class="font-bold text-3xl bg-slate-900 text-indigo-50 my-4">
            Mein Konto
          </h1>
        </div>
        <hr />

        <ul
          v-for="user in users"
          class="flex flex-col justify-center items-start text-center mx-auto leading-6 gap-3 mt-8"
        >
          <li class="flex gap-2 items-start justify-start w-[35vw]">
            <p class="font-bold w-[8vw] text-[18px]">Name:</p>
            <div class="flex items-center justify-between w-[45vw] gap-10">
              <p v-if="!updatedInfo.name" class="text-[18px]">
                {{ user.username }}
              </p>
              <form v-if="updatedInfo.name" class="input-border">
                <input type="text" class="outline-none" name="name" />
              </form>
              <button
                type="button"
                @click="() => toggleUpdatedInfo('name')"
                v-if="!updatedInfo.name"
              >
                <PenIcon />
              </button>
            </div>

            <button
              type="button"
              v-if="updatedInfo.name"
              @click="reloadButton"
              class="flex justify-center items-center w-8 h-8"
            >
              <img :src="CloseIcon" alt="closeIcon" />
            </button>
          </li>

          <li class="flex gap-2 items-start justify-start w-[35vw]">
            <p class="font-bold w-[8vw] text-[18px]">Phone:</p>
            <div class="flex items-center justify-between w-[45vw] gap-10">
              <p v-if="!updatedInfo.phone" class="text-[16px]">
                {{ user.phone }}
              </p>
              <form v-if="updatedInfo.phone" class="input-border">
                <input type="number" class="outline-none" name="phone" />
              </form>
              <button
                type="button"
                @click="() => toggleUpdatedInfo('phone')"
                v-if="!updatedInfo.phone"
              >
                <PenIcon />
              </button>
            </div>
            <button
              type="button"
              v-if="updatedInfo.phone"
              @click="reloadButton"
              class="flex justify-center items-center w-8 h-8"
            >
              <img :src="CloseIcon" alt="closeIcon" />
            </button>
          </li>

          <li
            class="flex gap-2 items-start justify-start w-[35vw] pb-8 border-bottom border-black"
          >
            <p class="font-bold w-[8vw] text-[18px]">E-Mail:</p>
            <div class="flex items-center justify-between w-[45vw] gap-10">
              <p v-if="!updatedInfo.email" class="text-[18px]">
                {{ user.email }}
              </p>
              <form v-if="updatedInfo.email" class="input-border">
                <input type="text" class="outline-none" name="email" />
              </form>
              <button
                type="button"
                @click="() => toggleUpdatedInfo('email')"
                v-if="!updatedInfo.email"
              >
                <PenIcon />
              </button>
            </div>

            <button
              type="button"
              v-if="updatedInfo.email"
              @click="reloadButton"
              class="flex justify-center items-center w-8 h-8"
            >
              <img :src="CloseIcon" alt="closeIcon" />
            </button>
          </li>

          <li class="flex flex-col items-start justify-start text-start gap-2">
            <div class="flex items-start justify-start">
              <p class="font-bold w-[6vw] text-l">Termin:</p>
              <p class="text-l text-start">
                {{ services[0].date }} / {{ services[0].selectedTimeStart }} Uhr
              </p>
            </div>
            <div class="flex items-start justify-start">
              <p class="font-bold w-[6vw] text-l">Service:</p>
              <p class="text-l">
                {{ services[0].selectedService }}
              </p>
            </div>
          </li>
          <button
            type="submit"
            v-if="updatedInfo.phone || updatedInfo.name || updatedInfo.email"
            class="border w-[100%] px-6 py-2 mt-4 mx-auto rounded bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white form-bold"
            @click="(e) => acceptInfo(e)"
          >
            Akzeptieren
          </button>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <ErrorPage />
  </div>
</template>

<script setup lang="ts">
import type { Services, UpdatedInfo, UserNotService } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PenIcon from '../assets/Icons/PenIcon.vue';
import CloseIcon from '../assets/Icons/closeIcon.png';
import { getItem } from '../helper/persistanceStorage';
import ErrorPage from './404.vue';

const users = ref<UserNotService[]>([]);
const services = ref<Services[]>([]);
const updatedInfo = ref<UpdatedInfo>({
  name: false,
  phone: false,
  email: false,
});
const token = getItem('token');

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
      users.value = [userData];
    }
  } catch (error) {
    console.error(
      'An error occurred while retrieving the current user data:',
      error
    );
  }

  try {
    const token = getItem('token');
    const serviceId = users.value[0]?.id;
    console.log(serviceId);

    const response = await axios.get(
      `/api/api/services/allServices/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      const serviceData = response.data;
      console.log(serviceData.selectedService);

      services.value = [serviceData];
    }
  } catch (error) {
    console.error(
      'Mevcut kullanıcı verileri alınırken bir hata oluştu:',
      error
    );
  }
});

const toggleUpdatedInfo = (propertyName: keyof UpdatedInfo) => {
  updatedInfo.value[propertyName] = !updatedInfo.value[propertyName];
};

const acceptInfo = async (e: any) => {
  e.preventDefault();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const userId = users.value[0].id;

    if (!userId) {
      console.error('User ID is undefined.');
      return;
    }

    let updatedFields: Record<string, string> = {};

    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput && updatedInfo.value.name) {
      updatedFields['username'] = (nameInput as HTMLInputElement).value;
    }

    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput && updatedInfo.value.phone) {
      updatedFields['phone'] = (phoneInput as HTMLInputElement).value;
    }

    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput && updatedInfo.value.email) {
      updatedFields['email'] = (emailInput as HTMLInputElement).value;
    }

    const response = await axios.put(
      `/api/api/users/update/${userId}`,
      updatedFields,
      config
    );
    window.location.reload();
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

const reloadButton = () => {
  updatedInfo.value.name = false;
  updatedInfo.value.phone = false;
  updatedInfo.value.email = false;
};
</script>
