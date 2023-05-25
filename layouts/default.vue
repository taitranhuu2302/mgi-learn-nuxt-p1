<script setup lang="ts">

</script>

<template>
  <div id="root">
    <slot/>
  </div>
</template>

<style scoped>
#root {
  @apply bg-gradient-to-tl from-primary-500 to-primary h-screen flex items-center justify-center;
}
</style>