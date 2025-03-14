<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column align-items-center p-4">
    <!-- <nav>
      <RouterLink to="/">Inicio</RouterLink> |
      <RouterLink to="/resultados">Resultados</RouterLink>
    </nav> -->
    <RouterView />
  </div>
</template>
