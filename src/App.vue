<script setup lang="ts">
import FooterBar from './components/FooterBar.vue';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="">
    <navigation-bar />
    <label for=""></label>
    <router-view class="mb-6" />
    <footer-bar />
  </div>
</template>
