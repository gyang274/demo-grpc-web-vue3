<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="home" to="/"></q-breadcrumbs-el>
        <q-breadcrumbs-el label="About" icon="widgets" to="/about"></q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <RouterView />
  </div>
</template>

<style>
.app {
  font-family: Fira Sans;
}
</style>
