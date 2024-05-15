<script setup>
import { ref } from 'vue'
import columnsEn from '../ressources/columns_en.json'
import FilterBool from './FilterBool.vue'
import FilterCheckList from './FilterCheckList.vue'
import FilterLang from './FilterLang.vue'
import FilterLevels from './FilterLevels.vue'
import FilterMedia from './FilterMedia.vue'
import FilterModalities from './FilterModalities.vue'
import FilterSkills from './FilterSkills.vue'
import FilterSubjects from './FilterSubjects.vue'

const boolMaterial = ref(false)
const boolLoanable = ref(false)
const hiddenByDefault = new Set(['fachbezug', 'medium', 'asl', 'autor', 'code'])
const columns = ref(
  Object.entries(columnsEn).map((r) => {
    return { key: r[0], label: r[1], checked: !hiddenByDefault.has(r[0]) }
  })
)

function handleBoolLoanable() {
  boolLoanable.value = !boolLoanable.value
}

function handleBoolMaterial() {
  boolMaterial.value = !boolMaterial.value
}

function handleLang(param) {
  console.log(param)
}

function handleLevel(param) {
  console.log(param)
}

function handleMedia(param) {
  console.log(param)
}

function handleModalities(param) {
  console.log(param)
}

function handleSkills(param) {
  console.log(param)
}

function handleSubjects(param) {
  console.log(param)
}
</script>

<template>
  <FilterLevels @toggle="handleLevel" />
  <FilterSkills @toggle="handleSkills" />
  <p>TODO: Add tricks</p>
  <FilterSubjects @toggle="handleSubjects" />
  <FilterLang @toggle="handleLang" />
  <FilterMedia @toggle="handleMedia" />
  <p>TODO: add radio buttons</p>
  <FilterModalities @toggle="handleModalities" />
  <FilterBool
    title="Material preinstalled on the PCs"
    :checked="boolMaterial"
    @toggle="handleBoolMaterial"
  />
  <FilterBool title="Only loanable material" :checked="boolLoanable" @toggle="handleBoolLoanable" />
  <FilterCheckList title="Displayed columns" :items="columns" />
  <p>TODO: search</p>
</template>
