<template>
  <Dialog :open="isOpen" class="relative z-50">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-dark-800/50" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel
        class="bg-white rounded-xl shadow shadow shadow-gray-400 max-w-md w-9/10"
      >
        <!-- <DialogTitle>Deactivate account</DialogTitle> -->
        <header class="px-4 pt-4 pb-3 border-b border-light-800">
          <p class="text-2xl font-semibold text-dark-700">Введите ваше имя</p>
        </header>
        <!-- <DialogDescription>
          Введите 
        </DialogDescription> -->

        <div class="inline-block p-4 pb-6">
          <!-- <div class="inline-block relative mt-5"> -->
          <form @submit.prevent="submitName" class="relative">
            <input
              v-model="name"
              type="text"
              min="3"
              class="block w-full max-w-sm border border-gray-500 p-3 pr-24 rounded-md focus:(border-gray-500/0 outline outline-2 outline-orange-400)"
              placeholder="Ваше имя.."
              @change="inputTouched = true"
            />

            <button
              class="block absolute right-0 top-0 bottom-0 p-3 bg-orange-500 overflow-hidden rounded-r-md text-lg font-semibold text-white leading-none focus:(outline outline-2 outline-blue-500)"
            >
              Войти
            </button>
          </form>

          <small v-if="!isValidName && inputTouched" class="text-red-500">
            Имя должно быть длиной не менее 3 символов
          </small>
          <!-- </div> -->
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emits = defineEmits<{
  (e: 'submit-name', name: string): void;
}>();

const isOpen = computed(() => {
  console.log('props.isOpen: ', props.isOpen);
  return props.isOpen;
});

/* function setIsOpen(value: boolean) {
  isOpen.value = value;
} */

const name = ref('');
const inputTouched = ref(false);

const isValidName = computed(() => name.value.length >= 3);

function submitName() {
  if (!isValidName) {
    return;
  }

  emits('submit-name', name.value);
}
</script>
