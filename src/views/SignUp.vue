<template>
  <div
    class="auth-page reg-container pb-10 w-[35vw] my-[6vh] mx-auto rounded bg-slate-50"
  >
    <div class=" ">
      <div class="">
        <div class="flex flex-col gap-2 px-6 py-2">
          <h1 class="text-xs-center text-center text-2xl my-10 font-bold">
            SIGN UP
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'signIn' }">
              Have an account?
            </router-link>
          </p>

          <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
            <fieldset class="form-group">
              <input
                v-model="formData.username"
                class="form-control form-control-lg"
                :class="{ 'border-red-500': errors.username }"
                type="text"
                placeholder="Username"
                @input="clearError('username')"
              />
              <div v-if="errors.username" class="text-red-500">
                {{ errors.username }}
              </div>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formData.email"
                class="form-control form-control-lg"
                :class="{ 'border-red-500': errors.email }"
                type="text"
                placeholder="E-Mail"
                autocomplete="email"
                @input="clearError('email')"
              />
              <div v-if="errors.email" class="text-red-500">
                {{ errors.email }}
              </div>
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="formData.phone"
                class="form-control form-control-lg"
                :class="{ 'border-red-500': errors.phone }"
                type="text"
                placeholder="Telephone"
                @input="clearError('phone')"
              />
              <div v-if="errors.phone" class="text-red-500">
                {{ errors.phone }}
              </div>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formData.password"
                class="form-control form-control-lg"
                :class="{ 'border-red-500': errors.password }"
                type="password"
                placeholder="Password"
                autocomplete="current-password"
                @input="clearError('password')"
              />
              <div v-if="errors.password" class="text-red-500">
                {{ errors.password }}
              </div>
            </fieldset>

            <button
              :disabled="isSubmitting"
              class="bg-indigo-950 text-white rounded py-3 px-2 font-semibold hover:bg-slate-600 active:scale-95 transition-all"
              type="submit"
            >
              SIGNUP
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { setItem } from '../helper/persistanceStorage';
import router from '../router/index';
import * as Yup from 'yup';
import axios from '../api/axios';
import type { Errors, FormData } from '@/types';

const model = ref('');

const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  phone: '',
});

const isSubmitting = ref(false);

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .min(10, 'Phone must be at least 10 characters')
    .required('Phone is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const errors = ref<Errors>({});

const clearError = (field: keyof Errors) => {
  errors.value[field] = '';
};

const onSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    isSubmitting.value = true;
    await schema.validate(formData.value, { abortEarly: false });

    const response = await axios.post('/api/users', formData.value, config);

    console.log('Server Response:', response.data);

    setItem('token', response.data.token);
    router.push({ name: 'signIn' });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      errors.value = error.inner.reduce((acc: Errors, err: any) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      isSubmitting.value = false;
    }
    console.error('Registration Error:', error);
  }
};
</script>
