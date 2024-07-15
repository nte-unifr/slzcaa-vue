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

import { PAGE_RANGE } from '../config.js'

const emit = defineEmits(['changePage'])

import { ref, watchEffect } from 'vue'

const pages = ref([])

function changePage(p) {
  if (p != props.page) {
    emit('changePage', p)
  }
}

watchEffect(() => {
  const rangeWithoutExtrem = PAGE_RANGE - 1
  const start = Math.max(1, props.page - rangeWithoutExtrem)
  const end = Math.min(props.nbPage, props.page + rangeWithoutExtrem)
  const buttons = []
  if (start > 1) {
    buttons.push(1)
  }
  for (let i = start; i <= end; ++i) {
    buttons.push(i)
  }
  if (end < props.nbPage) {
    buttons.push(props.nbPage)
  }
  pages.value = buttons
})
</script>

<template>
  <div class="my-8 text-center">
    <div class="join">
      <input
        v-for="(p, i) in pages"
        :key="i"
        data-test="page-button"
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
