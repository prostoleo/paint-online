<template>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
:global(.container) {
  @apply mx-auto;
}

.wrapper {
}

:deep(.palette) {
  // -webkit-background-clip: text;
  // -webkit
  // -webkit-text-fill-color: red;
  // @apply bg-transparent !text-transparent hover:(text-orange-500)
  @apply relative;

  & > * {
    // color: transparent;
    background: -webkit-linear-gradient(
      -45deg,
      rgb(210, 33, 250),
      rgb(35, 215, 206)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    & > div {
      background: orange;
    }
  }

  input[type='color'] {
    @apply absolute appearance-none visibility-hidden opacity-0 bg-tranparent inset-0 z-1 w-full h-full cursor-pointer;
  }
}
</style>
