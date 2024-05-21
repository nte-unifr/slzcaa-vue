<script setup>
import { ref, watchEffect } from 'vue'
import columnsEn from '../ressources/columns_en.json'
import FilterCheckList from './FilterCheckList.vue'
import FilterLang from './FilterLang.vue'
import FilterLevels from './FilterLevels.vue'
import FilterLoanable from './FilterLoanable.vue'
import FilterMedia from './FilterMedia.vue'
import FilterModalities from './FilterModalities.vue'
import FilterPreinstalled from './FilterPreinstalled.vue'
import FilterSkills from './FilterSkills.vue'
import FilterSubjects from './FilterSubjects.vue'
import FilterText from './FilterText.vue'
import FilterYear from './FilterYear.vue'

const emit = defineEmits(['filter'])

const hiddenByDefault = new Set(['fachbezug', 'medium', 'asl', 'autor', 'code'])
const columns = ref(
  Object.entries(columnsEn).map((r) => {
    return { key: r[0], label: r[1], checked: !hiddenByDefault.has(r[0]) }
  })
)
const filterLang = ref('')
const filterLevels = ref('')
const filterLoanable = ref('')
const filterMedia = ref('')
const filterModalities = ref('')
const filterPreinstalled = ref('')
const filterSearch = ref('')
const filterSkills = ref('')
const filterSubjects = ref('')

function handleLang(param) {
  filterLang.value = param
}

function handleLevel(param) {
  filterLevels.value = param
}

function handleLoanable(param) {
  filterLoanable.value = param
}

function handleMedia(param) {
  filterMedia.value = param
}

function handleModalities(param) {
  filterModalities.value = param
}

function handlePreinstalled(param) {
  filterPreinstalled.value = param
}

function handleSearch(param) {
  filterSearch.value = param
}

function handleSkills(param) {
  filterSkills.value = param
}

function handleSubjects(param) {
  filterSubjects.value = param
}

watchEffect(() => {
  const conditions = [
    filterLang.value,
    filterLevels.value,
    filterLoanable.value,
    filterMedia.value,
    filterModalities.value,
    filterPreinstalled.value,
    filterSearch.value,
    filterSkills.value,
    filterSubjects.value
  ]
  const param = conditions.filter((c) => c).join(',')
  if (param) {
    const tmp = `{"_and":[${param}]}`
    emit('filter', tmp)
  } else {
    emit('filter', '')
  }
})
</script>

<template>
  <FilterLevels @toggle="handleLevel" />
  <FilterSkills @toggle="handleSkills" />
  <div role="alert" class="alert">
    <span
      ><b>Trick!</b> Different combinations of skills and target levels (e.g. Reading B2 + Speaking
      A2) require separate search operations.</span
    >
  </div>
  <FilterSubjects @toggle="handleSubjects" />
  <FilterLang @toggle="handleLang" />
  <FilterMedia @toggle="handleMedia" />
  <FilterYear />
  <FilterModalities @toggle="handleModalities" />
  <FilterPreinstalled @toggle="handlePreinstalled" />
  <FilterLoanable @toggle="handleLoanable" />
  <FilterCheckList title="Displayed columns" :items="columns" />
  <FilterText @search="handleSearch" />
</template>
