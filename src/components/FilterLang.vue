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
  // TODO: add a boolean field `isAnotherLangSrc` using a hook.
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      const key = e.key.charAt(0).toUpperCase() + e.key.slice(1)
      return { ausgangssprache: { _contains: key } }
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.source_languages')" :items="items" @toggle="onChange" />
</template>
