<script setup>
import { ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import FilterBool from './FilterBool.vue'

const emit = defineEmits(['toggle'])
const bus = useEventBus('reset')

const checked = ref(false)

bus.on(() => {
  checked.value = false
})

function onChange() {
  checked.value = !checked.value
}

watchEffect(() => {
  if (checked.value) {
    const param = JSON.stringify({ install: { _eq: true } })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterBool title="filter.only_preinstalled" :checked="checked" @toggle="onChange" />
</template>
