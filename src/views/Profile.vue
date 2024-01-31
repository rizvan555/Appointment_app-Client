<template>
  <div class="mb-10">
    <div
      class="flex flex-col my-24 mx-auto text-center border w-[40vw] h-[42vh] contact bg-slate-50 rounded"
      :class="{
        'h-[50vh]': updatedInfo.name || updatedInfo.phone || updatedInfo.email,
      }"
    >
      <div class="bg-indigo-50 rounded">
        <h1 class="font-bold text-3xl my-4">Mein Konto</h1>
      </div>
      <hr />

      <ul
        v-for="user in users"
        class="flex flex-col justify-center items-start text-center mx-auto leading-8 gap-4 mt-8"
      >
        <li class="flex gap-2 items-start justify-start w-[35vw]">
          <p class="font-bold w-[8vw] text-xl">Name:</p>
          <div class="flex items-center justify-between w-[25vw] gap-10">
            <p v-if="!updatedInfo.name" class="text-xl">{{ user.username }}</p>
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
            class="flex justify-center items-center w-8 h-8 mr-3"
          >
            <img :src="CloseIcon" alt="closeIcon" />
          </button>
        </li>

        <li class="flex gap-2 items-start justify-start w-[35vw]">
          <p class="font-bold w-[8vw] text-xl">Phone:</p>
          <div class="flex items-center justify-between w-[25vw] gap-10">
            <p v-if="!updatedInfo.phone" class="text-xl">{{ user.phone }}</p>
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
            class="flex justify-center items-center w-8 h-8 mr-3"
          >
            <img :src="CloseIcon" alt="closeIcon" />
          </button>
        </li>

        <li class="flex gap-2 items-start justify-start w-[35vw]">
          <p class="font-bold w-[8vw] text-xl">Email:</p>
          <div class="flex items-center justify-between w-[25vw] gap-10">
            <p v-if="!updatedInfo.email" class="text-xl">{{ user.email }}</p>
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
            class="flex justify-center items-center w-8 h-8 mr-3"
          >
            <img :src="CloseIcon" alt="closeIcon" />
          </button>
        </li>
        <button
          type="submit"
          v-if="updatedInfo.phone || updatedInfo.name || updatedInfo.email"
          class="border w-[100%] px-6 mt-4 mx-auto rounded bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white form-bold"
          @click="(e) => acceptInfo(e)"
        >
          Akzeptieren
        </button>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UpdatedInfo, User, UserNotService } from '@/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PenIcon from '../assets/Icons/PenIcon.vue';
import CloseIcon from '../assets/Icons/closeIcon.png';
import { getItem } from '../helper/persistanceStorage';

const users = ref<UserNotService[]>([]);
const updatedInfo = ref<UpdatedInfo>({
  name: false,
  phone: false,
  email: false,
});

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
      'An error occurred while retrieving existing user data:',
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
    console.log(response.data);

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