<script setup>
import { ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import levelsEn from '../ressources/levels_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])
const bus = useEventBus('reset')
const { t } = useI18n()
const url = 'https://www.coe.int/en/web/portfolio/self-assessment-grid'
const footer = `<a href="${url}">${t('filter.level_description')}</a>`

const items = ref(
  Object.keys(levelsEn).map((k) => {
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
  <FilterCheckList
    :title="$t('filter.target_levels')"
    :items="items"
    :footer="footer"
    @toggle="onChange"
  />
</template>
