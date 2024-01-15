<template>
  <div class="py-2">
    <div
      v-if="!showSuccessMessage"
      class="flex justify-center items-center container my-[1vh] gap-5"
    >
      <div
        class="w-[50vw] calendar rounded-lg"
        v-if="userDetails.username !== ''"
      >
        <VDatePicker
          v-model="date"
          mode="date"
          is24hr
          expanded
          :attributes="attributes"
          :select-attribute="selectAttribute"
          :rules="rules"
          :disabled-dates="disabledDates"
          :disabled="userDetails.username === ''"
          :min-date="startDate"
          style="background-color: #f8f6f1"
        />
      </div>
    </div>
    <div
      class="flex flex-col justify-center items-center h-[50vh]"
      v-if="userDetails.username === ''"
    >
      <img :src="AttentionIcon" alt="AttentionIcon" class="w-20 mb-4" />
      <h1 class="text-red-500 text-center text-xl mb-4 font-bold">
        Sie müssen sich anmelden
      </h1>
    </div>

    <div
      class="flex justify-center items-center w-[50vw] mx-auto my-[10vh]"
      v-if="showSuccessMessage"
    >
      <div class="flex flex-col justify-center items-start py-4">
        <div class="mb-10 font-bold text-xl flex items-center gap-3">
          <OkIcon class="w-10 h-10 text-green-500" />
          <h1>Ihr Termin wurde bestätigt</h1>
        </div>

        <div class="">
          <div v-if="date" class="flex items-center gap-3 text-base">
            <div class="flex items-center gap-1">
              <calendar class="w-4 h-4"></calendar>
              <p class="font-semibold w-[5vw]">Datum:</p>
            </div>
            <p>{{ customDateFormatter(date.toString()) }}</p>
          </div>
          <div
            v-if="date"
            class="text-base flex gap-3"
            :class="{
              'text-red-600': !checkTime,
            }"
          >
            <div class="flex items-center gap-1">
              <clock1 class="w-4 h-4"></clock1>
              <p class="font-semibold w-[5vw]">Zeit:</p>
            </div>
            <p>
              {{
                userDetails.username ? formDataServices.selectedTimeStart : ''
              }}
            </p>
          </div>
          <div class="flex justify-center items-center gap-3">
            <div class="flex items-center gap-1">
              <service class="w-4 h-4"></service>
              <p class="font-semibold w-[5vw]">Service:</p>
            </div>
            <p>{{ userDetails.username ? selectedServiceName : '' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-lg w-[40vw] mx-auto bg-[#f8f6f1]">
      <div
        v-if="
          date && selectAttribute && !showSuccessMessage && userDetails.username
        "
        v-for="timeSlot in timeSlots"
        :key="timeSlot.start"
      >
        <div class="flex justify-between items-center">
          <div
            class="flex items-center gap-2 py-6 px-10"
            :class="{
              'text-gray-400':
                (getTimeAndDate && getTimeAndDate.includes(timeSlot.start)) ||
                new Date(date) < new Date(Date.now()),
            }"
          >
            <MaterialSymbolsAlarm class="w-5 h-5" />
            <div
              :class="{
                'text-gray-400':
                  (getTimeAndDate && getTimeAndDate.includes(timeSlot.start)) ||
                  new Date(date) < new Date(Date.now()),
              }"
            >
              {{ timeSlot.display }}
            </div>
          </div>

          <button
            ref="submitButton"
            @click="($event) => handleSubmit($event, timeSlot.id)"
            class="text-green-500 mr-10"
            :class="{
              ' text-red-500':
                (getTimeAndDate && getTimeAndDate.includes(timeSlot.start)) ||
                new Date(date) < new Date(Date.now()),
            }"
            :disabled="
              Boolean(
                getTimeAndDate && getTimeAndDate.includes(timeSlot.start)
              ) || new Date(date) < new Date(Date.now())
            "
          >
            <OkIcon
              class="w-7 h-7 okicon"
              v-if="
                !(getTimeAndDate && getTimeAndDate.includes(timeSlot.start)) &&
                new Date(date) >= new Date(Date.now())
              "
            />
            <Disabled
              class="w-7 h-7"
              v-if="
                (getTimeAndDate &&
                  getTimeAndDate.includes(timeSlot.start) &&
                  new Date() >= new Date(Date.now())) ||
                new Date(date) < new Date(Date.now())
              "
            />
          </button>
        </div>
        <hr class="w-[35vw] mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomerListProps, Errors, FormDateServices } from '@/types';
import axios from 'axios';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { VDatePicker } from 'vuetify/components';
import calendar from '../assets/Icons/Calendar.vue';
import MaterialSymbolsAlarm from '../assets/Icons/Clock.vue';
import clock1 from '../assets/Icons/Clock1.vue';
import Disabled from '../assets/Icons/Disabled.vue';
import OkIcon from '../assets/Icons/OkIcon.vue';
import service from '../assets/Icons/Service.vue';
import AttentionIcon from '../assets/Icons/icons8-attention.gif';
import { getItem, setItem } from '../helper/persistanceStorage';
import { useServiceStore } from '../stores/useServiceStore';

type BlockedTimes = string[];
const formDataServices = ref<FormDateServices>({
  create_time: '',
  selectedTimeStart: '',
});

const date = ref<Date>(new Date());
const checkTime = ref(true);
const router = useRouter();
const isSubmitting = ref(false);
const showSuccessMessage = inject('showSuccessMessage', ref(false));
const errors = ref<Errors>({});
const userDetails = inject(
  'userDetails',
  ref({ username: '', email: '', phone: '' })
);
const token = getItem('token');
const serviceStore = useServiceStore();
const userLists = ref<CustomerListProps[]>([]);
const selectAttribute = ref({});
const position = ref(true);
const startDate = ref(new Date(Date.now() + 24 * 60 * 60 * 1000));
const attributes = ref([
  {
    key: 'weekend',
    dot: 'red',
    dates: {
      repeat: {
        weekdays: [1],
      },
    },
  },
  {
    key: 'today',
    highlight: 'true',
    dot: 'green',
  },
]);
const rules = ref([
  {
    hours: {
      min: 8,
      max: 20,
    },
    minutes: { interval: 30 },
  },
]);

const disabledDates = ref([
  {
    repeat: {
      weekdays: [1],
    },
  },
]);

const selectedServiceName = computed(() => {
  if (router.currentRoute.value.path === '/service1') {
    return 'Trocken schneiden & Styling / Cutting & Styling';
  } else if (router.currentRoute.value.path === '/service2') {
    return 'Basis Paket / Basic Package';
  } else if (router.currentRoute.value.path === '/service3') {
    return 'Kinderhaarschnitt / Children Haircut';
  } else if (router.currentRoute.value.path === '/service4') {
    return 'Augenbrauen zupfen(Faden) / Eyebrow plucking(thread)';
  } else if (router.currentRoute.value.path === '/service5') {
    return 'Bartschnitt  & Kontur(Maschine) / Beard Cut & Contour(Machine)';
  } else if (router.currentRoute.value.path === '/service6') {
    return 'Bartpflege Classic / Classic Beard Care';
  } else if (router.currentRoute.value.path === '/service7') {
    return 'Deluxe Paket / Deluxe Package';
  } else if (router.currentRoute.value.path === '/service8') {
    return 'Premium Paket / Deluxe Package';
  } else if (router.currentRoute.value.path === '/service9') {
    return 'Nassrasur Model / Wet Shave model';
  }
});

const timeSlots = ref([
  {
    id: 1,
    start: '08:00',
    end: '08:30',
    display: '08:00 am - 08:30 am',
    position: true,
  },
  {
    id: 2,
    start: '09:00',
    end: '09:30',
    display: '09:00 am - 09:30 am',
    position: true,
  },
  {
    id: 3,
    start: '10:00',
    end: '10:30',
    display: '10:00 am - 10:30 am',
    position: true,
  },
  {
    id: 4,
    start: '11:00',
    end: '11:30',
    display: '11:00 am - 11:30 am',
    position: true,
  },
  {
    id: 5,
    start: '12:00',
    end: '12:30',
    display: '12:00 pm - 12:30 pm',
    position: true,
  },
  {
    id: 6,
    start: '13:00',
    end: '13:30',
    display: '13:00 pm - 13:30 pm',
    position: true,
  },
  {
    id: 7,
    start: '14:00',
    end: '14:30',
    display: '14:00 pm - 14:30 pm',
    position: true,
  },
  {
    id: 8,
    start: '15:00',
    end: '15:30',
    display: '15:00 pm - 15:30 pm',
    position: true,
  },
  {
    id: 9,
    start: '16:00',
    end: '16:30',
    display: '16:00 pm - 16:30 pm',
    position: true,
  },
  {
    id: 10,
    start: '17:00',
    end: '17:30',
    display: '17:00 pm - 17:30 pm',
    position: true,
  },
  {
    id: 11,
    start: '18:00',
    end: '18:30',
    display: '18:00 pm - 18:30 pm',
    position: true,
  },
  {
    id: 12,
    start: '19:00',
    end: '19:30',
    display: '19:00 pm - 19:30 pm',
    position: true,
  },
  {
    id: 13,
    start: '20:00',
    end: '20:30',
    display: '20:00 pm - 20:30 pm',
    position: true,
  },
]);

const getTimeAndDate = computed(() => {
  const selectedDate = new Date(date.value);
  const blockedTimes: BlockedTimes = [];

  if (userLists.value.length > 0) {
    userLists.value.forEach((user: any) => {
      const userServiceDate = new Date(user.date);
      const userServiceTime = user.selectedTimeStart;

      if (userServiceDate.toDateString() === selectedDate.toDateString()) {
        blockedTimes.push(userServiceTime);
      }
    });
  }

  return blockedTimes;
});

watch(userLists, () => {
  getTimeAndDate.value;
  formDataServices.value.selectedTimeStart = '';
});

onMounted(async () => {
  try {
    const token = getItem('token');

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.get('/api/api/users/allUsers', config);
      userDetails.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});

onMounted(async () => {
  try {
    const response = await fetch('/api/api/services/getAllServices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user list');
    }
    const data = await response.json();
    userLists.value = data;
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
});

const handleSubmit = async (e: any, timeSlotId: number) => {
  e.preventDefault();
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    isSubmitting.value = true;
    position.value = true;

    const dateWithoutTime = new Date(date.value);
    dateWithoutTime.setHours(0, 0, 0, 0);
    formDataServices.value.date = dateWithoutTime.toISOString();

    const selectedDate = new Date(String(formDataServices.value.date));
    selectedDate.setHours(selectedDate.getHours() + 1);

    const selectedTimeSlot = timeSlots.value.find(
      (slot) => slot.id === timeSlotId
    );
    formDataServices.value.selectedTimeStart = selectedTimeSlot
      ? selectedTimeSlot.start
      : '';

    const response = await axios.post(
      '/api/api/services/addService',
      {
        date: selectedDate.toISOString().split('T')[0],
        email: userDetails.value.email,
        username: userDetails.value.username,
        phone: userDetails.value.phone,
        selectedService: selectedServiceName.value,
        selectedTimeStart: formDataServices.value.selectedTimeStart,
      },
      config
    );

    if (response.data.token) {
      setItem('token', response.data.token);
    }
    showSuccessMessage.value = true;
    console.log('Success:', response.data);
  } catch (error: any) {
    console.log('Server Error:', error.response.data);
  } finally {
    isSubmitting.value = false;
    position.value = false;
  }
  console.error('Registration Error:', errors.value);
};

const customDateFormatter = (date: string | null) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date
    ? new Date(date).toLocaleDateString(
        'en-GB',
        options as Intl.DateTimeFormatOptions
      )
    : '';
};

const customerTime = (date: string | null) => {
  if (!date) {
    return '';
  }
  const selectedDate = new Date(date);
  selectedDate.setHours(selectedDate.getHours() + 1);

  const timezoneOffset = selectedDate.getTimezoneOffset() / 60;
  selectedDate.setHours(selectedDate.getHours() + timezoneOffset);

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(8, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(20, 0, 0);

  checkTime.value = selectedDate >= startOfDay && selectedDate <= endOfDay;

  if (checkTime.value) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return selectedDate.toLocaleTimeString(
      'en-GB',
      options as Intl.DateTimeFormatOptions
    );
  } else {
    return 'Please select a valid time range (8:00 - 20:00)';
  }
};
</script>
