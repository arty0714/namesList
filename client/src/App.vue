<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <NavBar />
  <div class="views">
    <RouterView />
  </div>
</template>

<style scoped>
  .views {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
