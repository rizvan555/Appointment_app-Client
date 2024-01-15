<template>
  <div
    class="flex flex-col pt-2 my-28 mx-auto text-center border w-[40vw] h-[42vh] contact"
  >
    <div class="my-2">
      <h1 class="font-bold text-2xl mb-6">Mein Konto</h1>
    </div>

    <ul
      v-for="user in users"
      class="flex flex-col justify-center items-start text-center mx-auto leading-8 gap-2"
    >
      <li class="flex gap-2 items-start justify-start w-[35vw]">
        <p class="font-bold w-[8vw]">Name:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.name">{{ user.username }}</p>
          <form v-if="updatedInfo.name" class="input-border">
            <input
              type="text"
              placeholder="Name"
              class="pl-3 w-[20vw] outline-none"
              name="name"
            />
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
        <p class="font-bold w-[8vw]">Phone:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.phone">{{ user.phone }}</p>
          <form v-if="updatedInfo.phone" class="input-border">
            <input
              type="number"
              placeholder="Phone"
              class="pl-3 w-[20vw] outline-none"
              name="phone"
            />
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

      <li class="flex gap-2 items-start justify-start w-[35vw]">
        <p class="font-bold w-[8vw]">Email:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.email">{{ user.email }}</p>
          <form v-if="updatedInfo.email" class="input-border">
            <input
              type="text"
              placeholder="E-Mail"
              name="email"
              class="pl-3 w-[20vw] outline-none"
            />
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
      <button
        type="submit"
        v-if="updatedInfo.phone || updatedInfo.name || updatedInfo.email"
        class="border px-4 mt-6 rounded bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white form-bold"
        @click="acceptInfo"
      >
        Akzeptieren
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { UpdatedInfo, User } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PenIcon from '../assets/Icons/PenIcon.vue';
import CloseIcon from '../assets/Icons/closeIcon.png';
import { getItem } from '../helper/persistanceStorage';

const users = ref<User[]>([]);
const user = ref<User>({
  id: '',
  username: '',
  email: '',
  phone: '',
  services: [],
});
const updatedInfo = ref<UpdatedInfo>({
  name: false,
  phone: false,
  email: false,
});

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get(
      '/api/api/users/dashboard/admin/allUsers',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data && Array.isArray(response.data)) {
      users.value = response.data;
      user.value = response.data[0];
      console.log('user', user.value);
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
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

    let updatedUsername = '';
    let updatePhone = '';
    let updatedEmail = '';

    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
      updatedUsername = (nameInput as HTMLInputElement).value;
      console.log(updatedUsername);
    }

    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
      updatePhone = (phoneInput as HTMLInputElement).value;
      console.log(updatePhone);
    }

    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
      updatedEmail = (emailInput as HTMLInputElement).value;
      console.log(updatedEmail);
    }

    const response = await axios.put(
      `/api/users/${userId}`,
      {
        username: updatedUsername,
        phone: updatePhone,
        email: updatedEmail,
      },
      config
    );
    window.location.reload();

    console.log('Update response:', response.data);
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
