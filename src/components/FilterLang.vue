<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import langEn from '../ressources/label_lang_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])
const bus = useEventBus('reset')
const { t } = useI18n()

const items = ref([])

bus.on(() => {
  items.value.forEach((item) => (item.checked = true))
})

function onChange(param) {
  const index = items.value.findIndex((e) => e.key === param)
  items.value[index].checked = !items.value[index].checked
}

onMounted(() => {
  const tmp = Object.keys(langEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  tmp.sort((a, b) => a.value.localeCompare(b.value))
  const otherIndex = tmp.findIndex((e) => e.key === 'other')
  tmp.push(tmp.splice(otherIndex, 1)[0])
  items.value = tmp
})

watchEffect(() => {
  // TODO: add a boolean field `isAnotherLangSrc` using a hook.
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      const key = e.key.charAt(0).toUpperCase() + e.key.slice(1)
      return `(ausgangssprache,like,${key})`
    })
    const param = `(${rows.join('~or')})`
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.source_languages')" :items="items" @toggle="onChange" />
</template>
