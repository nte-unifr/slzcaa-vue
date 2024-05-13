<script setup>
import { ref } from 'vue'
import FilterCheckList from './FilterCheckList.vue'

const columns = ref([])
const langSource = ref([])
const levels = ref([
  { name: 'A1', checked: false },
  { name: 'A2', checked: true },
  { name: 'B1', checked: true },
  { name: 'B2', checked: true },
  { name: 'C1', checked: true },
  { name: 'C2', checked: true }
])
const media = ref([])
const modalities = ref([])
const skills = ref([
  { name: 'All', checked: true },
  { name: 'Grammar', checked: true },
  { name: 'Learning strategies', checked: true },
  { name: 'Listening', checked: true },
  { name: 'Mediation', checked: true },
  { name: 'Pronunciation', checked: true },
  { name: 'Reading', checked: true },
  { name: 'Speaking', checked: true },
  { name: 'Spelling', checked: true },
  { name: 'Tests', checked: true },
  { name: 'Vocabulary', checked: true },
  { name: 'Writing', checked: true }
])
const subjectsEveryday = ref([])
const subjectsProfessional = ref([])

function handleLevel(param) {
  const index = levels.value.findIndex((e) => e.name === param)
  levels.value[index].checked = !levels.value[index].checked
}
function handleSkills(param) {
  const index = skills.value.findIndex((e) => e.name === param)
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
  <FilterCheckList title="Display columns" :items="columns" />
  <p>TODO: search</p>
</template>
