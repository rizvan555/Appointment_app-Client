<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
import FooterBar from './components/FooterBar.vue';
import { useAuthStore } from './stores/useAuth';

const store = useAuthStore();

function logout() {
  store.logout();
}
</script>

<template>
  <div class="">
    <navigation-bar />
    <label for=""></label>
    <router-view class="mb-6" />
    <footer-bar />
  </div>
</template>
