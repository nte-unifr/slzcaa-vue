<script setup>
import { ref, watchEffect } from 'vue'
import langEn from '../ressources/label_lang_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])

const items = ref(
  Object.entries(langEn).map((r) => {
    return { key: r[0], label: r[1], checked: true }
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
    const rows = selected.map((e) => e.key)
    const param = JSON.stringify({ ausgangssprache: { _in: rows } })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList title="Source Languages" :items="items" @toggle="onChange" />
</template>
