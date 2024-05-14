<script setup>
import { ref, watchEffect } from 'vue'
import columnsEn from '../ressources/columns_en.json'
import langEn from '../ressources/label_lang_en.json'
import mediaEn from '../ressources/media_en.json'
import modalitiesEn from '../ressources/modalities_en.json'
import skillsEn from '../ressources/skills_en.json'
import subjectsEverydayEn from '../ressources/label_subjects_everyday_en.json'
import subjectsProEn from '../ressources/label_subjects_pro_en.json'
import FilterCheckList from './FilterCheckList.vue'

const columns = ref([])
const langSource = ref([])
const levels = ref([
  { key: 'A1', label: 'A1', checked: true },
  { key: 'A2', label: 'A2', checked: true },
  { key: 'B1', label: 'B1', checked: true },
  { key: 'B2', label: 'B2', checked: true },
  { key: 'C1', label: 'C1', checked: true },
  { key: 'C2', label: 'C2', checked: true }
])
const media = ref([])
const modalities = ref([])
const skills = ref([])
const subjectsEveryday = ref([])
const subjectsProfessional = ref([])

watchEffect(() => {
  skills.value = []
  for (const [k, v] of Object.entries(skillsEn)) {
    const element = { key: k, label: v, checked: true }
    skills.value.push(element)
  }

  subjectsEveryday.value = []
  for (const [k, v] of Object.entries(subjectsEverydayEn)) {
    const element = { key: k, label: v, checked: true }
    subjectsEveryday.value.push(element)
  }

  subjectsProfessional.value = []
  for (const [k, v] of Object.entries(subjectsProEn)) {
    const element = { key: k, label: v, checked: true }
    subjectsProfessional.value.push(element)
  }

  langSource.value = []
  for (const [k, v] of Object.entries(langEn)) {
    const element = { key: k, label: v, checked: true }
    langSource.value.push(element)
  }

  media.value = []
  for (const [k, v] of Object.entries(mediaEn)) {
    if (k != 'installed') {
      const element = { key: k, label: v, checked: true }
      media.value.push(element)
    }
  }

  modalities.value = []
  for (const [k, v] of Object.entries(modalitiesEn)) {
    const element = { key: k, label: v, checked: true }
    modalities.value.push(element)
  }

  columns.value = []
  const hiddenDefault = new Set(['fachbezug', 'medium', 'asl', 'autor', 'code'])
  for (const [k, v] of Object.entries(columnsEn)) {
    const element = { key: k, label: v, checked: !hiddenDefault.has(k) }
    columns.value.push(element)
  }
})

function handleLevel(param) {
  const index = levels.value.findIndex((e) => e.key === param)
  levels.value[index].checked = !levels.value[index].checked
}
function handleSkills(param) {
  const index = skills.value.findIndex((e) => e.key === param)
  skills.value[index].checked = !skills.value[index].checked
}
</script>

<template>
  <FilterCheckList title="Target levels" :items="levels" @toggle-filter="handleLevel" />
  <FilterCheckList title="Skills" :items="skills" @toggle-filter="handleSkills" />
  <p>TODO: Add tricks</p>
  <FilterCheckList title="Subject Areas (Everyday)" :items="subjectsEveryday" />
  <FilterCheckList title="Subject Areas (Professional)" :items="subjectsProfessional" />
  <FilterCheckList title="Source languages" :items="langSource" />
  <FilterCheckList title="Media" :items="media" />
  <p>TODO: add radio buttons</p>
  <FilterCheckList title="Modalities" :items="modalities" />
  <p>TODO: add boolean options</p>
  <FilterCheckList title="Displayed columns" :items="columns" />
  <p>TODO: search</p>
</template>
