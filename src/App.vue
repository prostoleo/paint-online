<template>
  <div class="wrapper w-full h-screen max-h-screen bg-slate-50">
    <Toolbar />
    <SettingBar />
    <Canvas />
  </div>
</template>

<script setup lang="ts">
import Canvas from './components/Canvas.vue';
import Toolbar from './components/Toolbar.vue';
import SettingBar from './components/SettingBar.vue';
</script>

<style scoped lang="scss">
:global(.container) {
  @apply mx-auto;
}

.wrapper {
}
</style>
