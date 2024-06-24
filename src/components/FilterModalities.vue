<script setup>
import { ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import modalitiesEn from '../ressources/modalities_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])
const bus = useEventBus('reset')

const items = ref(
  Object.keys(modalitiesEn).map((k) => {
    return { key: k, checked: true }
  })
)

bus.on(() => {
  items.value.forEach((item) => (item.checked = true))
})

function onChange(param) {
  const index = items.value.findIndex((e) => e.key === param)
  items.value[index].checked = !items.value[index].checked
}

watchEffect(() => {
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      return { asl: { _contains: e.key } }
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.modalities')" :items="items" @toggle="onChange" />
</template>
