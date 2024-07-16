<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import LanguageList from './components/LanguageList.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import FiltersNav from './components/FiltersNav.vue'
import TableWrap from './components/TableWrap.vue'
import { DEBOUNCE_MAX_WAIT, DEBOUNCE_TIME } from './config.js'
import downloadPdf from './download.js'

const itemsSelected = ref(new Set([]))
const columnsChecked = ref(new Set([]))
const filterLang = ref('')
const filterParam = ref('')

const changeFilter = useDebounceFn(
  (param) => {
    filterParam.value = param
  },
  DEBOUNCE_TIME,
  { maxWait: DEBOUNCE_MAX_WAIT }
)

function changeColumns(param) {
  columnsChecked.value = param
}

function filterLanguage(lang) {
  filterLang.value = lang
}

function requestDownload() {
  downloadPdf(itemsSelected.value)
}

function resetSelection() {
  itemsSelected.value.clear()
}

function selectRow(row, isChecked) {
  if (isChecked) {
    itemsSelected.value.delete(row)
  } else {
    itemsSelected.value.add(row)
  }
}
</script>

<template>
  <PageHeader />
  <main class="mb-8 mx-4">
    <LanguageList @on-change="filterLanguage" />
    <div class="md:flex gap-8">
      <div class="md:w-1/5">
        <FiltersNav
          :language="filterLang"
          @columns-checked="changeColumns"
          @filter="changeFilter"
        />
      </div>
      <div class="md:w-4/5" v-if="filterParam">
        <TableWrap
          :columnsChecked="columnsChecked"
          :filterParam="filterParam"
          :selectedRows="new Set([...itemsSelected].map((x) => x.id))"
          @download-pdf="requestDownload"
          @select-row="selectRow"
          @resetSelection="resetSelection"
        />
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
