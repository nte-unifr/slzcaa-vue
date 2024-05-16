<script setup>
import { ref } from 'vue'
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
import FilterYear from './FilterYear.vue'

const hiddenByDefault = new Set(['fachbezug', 'medium', 'asl', 'autor', 'code'])
const columns = ref(
  Object.entries(columnsEn).map((r) => {
    return { key: r[0], label: r[1], checked: !hiddenByDefault.has(r[0]) }
  })
)

function handleLang(param) {
  console.log(param)
}

function handleLevel(param) {
  console.log(param)
}

function handleLoanable(param) {
  console.log(param)
}

function handleMedia(param) {
  console.log(param)
}

function handleModalities(param) {
  console.log(param)
}

function handlePreinstalled(param) {
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
  <p>TODO: search</p>
</template>
