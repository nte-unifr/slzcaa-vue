<script setup>
import { ref, watchEffect } from 'vue'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])

const items = ref([
  { key: 'A1', label: 'A1', checked: true },
  { key: 'A2', label: 'A2', checked: true },
  { key: 'B1', label: 'B1', checked: true },
  { key: 'B2', label: 'B2', checked: true },
  { key: 'C1', label: 'C1', checked: true },
  { key: 'C2', label: 'C2', checked: true }
])

function onChange(param) {
  const index = items.value.findIndex((e) => e.key === param)
  items.value[index].checked = !items.value[index].checked
}

watchEffect(() => {
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      return { sprachniveau: { _contains: e.key } }
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList title="Target levels" :items="items" @toggle="onChange" />
</template>
