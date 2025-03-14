<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Inicio</RouterLink> |
      <RouterLink to="/resultados">Resultados</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
