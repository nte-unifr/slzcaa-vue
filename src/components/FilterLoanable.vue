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
    const param = '(ausleihe_ble,is,true)'
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterBool title="filter.only_loanable" :checked="checked" @toggle="onChange" />
</template>
