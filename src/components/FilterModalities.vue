<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import modalitiesEn from '../ressources/modalities_en.json'
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
  const tmp = Object.keys(modalitiesEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  tmp.sort((a, b) => a.value.localeCompare(b.value))
  items.value = tmp
})

watchEffect(() => {
  const selected = items.value.filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < items.value.length
  if (paramRequired) {
    const rows = selected.map((e) => {
      return `(asl,like,${e.key})`
    })
    const param = `(${rows.join('~or')})`
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList :title="$t('filter.modalities')" :items="items" @toggle="onChange" />
</template>
