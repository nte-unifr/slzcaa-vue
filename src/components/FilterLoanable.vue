<script setup>
import { ref, watchEffect } from 'vue'
import FilterBool from './FilterBool.vue'

const emit = defineEmits(['toggle'])

const checked = ref(false)

function onChange() {
  checked.value = !checked.value
}

watchEffect(() => {
  if (checked.value) {
    const param = JSON.stringify({ ausleihe_ble: { _eq: true } })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterBool title="Only loanable material" :checked="checked" @toggle="onChange" />
</template>
