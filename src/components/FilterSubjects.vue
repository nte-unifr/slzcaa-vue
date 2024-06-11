<script setup>
import { ref, watchEffect } from 'vue'
import FilterCheckList from './FilterCheckList.vue'
import subjectsEverydayEn from '../ressources/label_subjects_everyday_en.json'
import subjectsProEn from '../ressources/label_subjects_pro_en.json'

const emit = defineEmits(['toggle'])

const itemsEveryday = ref(
  Object.keys(subjectsEverydayEn).map((k) => {
    return { key: k, checked: true }
  })
)
const itemsPro = ref(
  Object.keys(subjectsProEn).map((k) => {
    return { key: k, checked: true }
  })
)

function onChangeEveryday(param) {
  const index = itemsEveryday.value.findIndex((e) => e.key === param)
  itemsEveryday.value[index].checked = !itemsEveryday.value[index].checked
}

function onChangePro(param) {
  const index = itemsPro.value.findIndex((e) => e.key === param)
  itemsPro.value[index].checked = !itemsPro.value[index].checked
}

watchEffect(() => {
  const nbSubject = itemsEveryday.value.length + itemsPro.value.length
  const selected = itemsEveryday.value.concat(itemsPro.value).filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < nbSubject
  if (paramRequired) {
    const rows = selected.map((e) => {
      return { fachbezug: { _contains: e.key } }
    })
    rows.push({ fachbezug: { _null: true } })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <FilterCheckList
    :title="$t('filter.subject_everyday')"
    :items="itemsEveryday"
    @toggle="onChangeEveryday"
  />
  <FilterCheckList :title="$t('filter.subject_pro')" :items="itemsPro" @toggle="onChangePro" />
</template>
