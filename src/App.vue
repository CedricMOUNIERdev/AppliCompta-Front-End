<template>
  <header>
    <router-view v-slot="{ Component }">

<suspense>

  <component :is="Component" />

</suspense>

</router-view>
    <!-- Le composant <Routerview/> agit comme un placeholder (espace réservé) où le contenu de la route active sera rendu ici.-->
  </header>
</template>

<script setup lang="ts">

</script>


<style>





</style>
