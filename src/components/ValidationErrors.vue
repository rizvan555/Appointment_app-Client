<template>
  <ul class="error-messages">
    <li v-for="(error, index) in errorMessages" :key="index">
      {{ error.name }} {{ error.messages }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Error {
  name: string;
  messages: string;
}

const props = defineProps(['validationErrors']);
const errorMessages = ref<Array<Error>>([]);

computed(() => {
  errorMessages.value = Object.entries(props.validationErrors).map(
    ([name, messages]) => {
      return { name, messages: '' };
    }
  );
});
</script>
