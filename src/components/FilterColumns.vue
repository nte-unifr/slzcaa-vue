<script setup>
import { onMounted, ref } from 'vue'
import columnsEn from '../ressources/columns_en.json'
import FilterCheckList from './FilterCheckList.vue'

const emit = defineEmits(['toggle'])

const columnsVisible = ref(
  new Set(['titel', 'sprachniveau', 'fertigkeit', 'ausgangssprache', 'jahr', 'kommentar', 'ble'])
)
const items = ref(
  Object.entries(columnsEn).map((r) => {
    return { key: r[0], label: r[1], checked: columnsVisible.value.has(r[0]) }
  })
)

function onChange(param) {
  const index = items.value.findIndex((e) => e.key === param)
  items.value[index].checked = !items.value[index].checked
  if (items.value[index].checked) {
    columnsVisible.value.add(param)
  } else {
    columnsVisible.value.delete(param)
  }
  emit('toggle', columnsVisible.value)
}

onMounted(() => {
  emit('toggle', columnsVisible.value)
})
</script>

<template>
  <FilterCheckList :title="$t('filter.displayed_columns')" :items="items" @toggle="onChange" />
</template>
