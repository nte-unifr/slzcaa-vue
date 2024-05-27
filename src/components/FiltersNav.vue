<script setup>
import { ref, watchEffect } from 'vue'
import FilterColumns from './FilterColumns.vue'
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

const props = defineProps({
  language: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['columnsChecked', 'filter'])

const filterLangSrc = ref('')
const filterLevels = ref('')
const filterLoanable = ref('')
const filterMedia = ref('')
const filterModalities = ref('')
const filterPreinstalled = ref('')
const filterSearch = ref('')
const filterSkills = ref('')
const filterSubjects = ref('')

function handleColumns(param) {
  emit('columnsChecked', param)
}

function handleLang(param) {
  filterLangSrc.value = param
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
    JSON.stringify({ spr: { _contains: props.language } }), // field in the header
    filterLangSrc.value,
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
  const tmp = `{"_and":[${param}]}`
  emit('filter', tmp)
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
  <FilterColumns @toggle="handleColumns" />
  <FilterText @search="handleSearch" />
</template>
