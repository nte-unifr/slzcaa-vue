<script setup>
import { ref, watchEffect } from 'vue'
import mediaEn from '../ressources/media_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])

const items = ref(
  Object.keys(mediaEn).map((k) => {
    return { key: k, checked: true }
  })
)

function onChange(param) {
  const index = items.value.findIndex((e) => e.key === param)
  items.value[index].checked = !items.value[index].checked
}

watchEffect(() => {
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      return { medium: { _contains: e.key } }
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.media')" :items="items" @toggle="onChange" />
</template>
