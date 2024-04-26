<script setup>
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  nbPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['changePage'])

import { ref, watchEffect } from 'vue'

const pages = ref([])

function changePage(p) {
  emit('changePage', p)
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
}

watchEffect(() => {
  const start = Math.max(1, props.page - 3)
  const end = Math.min(props.nbPage, props.page + 3)
  pages.value = range(start, end)
})
</script>

<template>
  <div class="my-8 text-center">
    <div class="join">
      <input
        v-for="(p, i) in pages"
        :key="i"
        class="join-item btn btn-square"
        type="radio"
        name="options"
        :aria-label="p"
        :checked="props.page === p"
        @click="changePage(p)"
      />
    </div>
  </div>
</template>
