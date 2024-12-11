<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import subjectsMatch from '../ressources/label_subjects_match.json'
import subjectsEverydayEn from '../ressources/label_subjects_everyday_en.json'
import subjectsProEn from '../ressources/label_subjects_pro_en.json'
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
  const everydayTmp = Object.keys(subjectsEverydayEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  const proTmp = Object.keys(subjectsProEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  const tmp = everydayTmp.concat(proTmp)
  tmp.sort((a, b) => a.value.localeCompare(b.value))
  items.value = tmp
})

watchEffect(() => {
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = []
    selected.forEach((e) => {
      subjectsMatch[e.key].forEach((keyword) => {
        if (keyword) {
          rows.push({ fachbezug: { _contains: keyword } })
        } else {
          rows.push({ fachbezug: { _null: true } })
        }
      })
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.subject_areas')" :items="items" @toggle="onChange" />
</template>
