<script setup>
import { ref, watch } from 'vue'
import LanguageList from './components/LanguageList.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import SearchFilter from './components/SearchFilter.vue'
import SimpleTable from './components/SimpleTable.vue'
import TablePagination from './components/TablePagination.vue'
import { useFetch } from './fetch.js'

const BASE_URL = 'https://eddb.unifr.ch/slzcaa-admin/items/materials'
const NB_ELEMENT_PER_PAGE = 50

function generateUrlCountTotal() {
  return `${BASE_URL}?aggregate[count]=*`
}

function generateUrlTable(page) {
  let base = BASE_URL
  base += `?limit=${NB_ELEMENT_PER_PAGE}`
  base += `&page=${page}`
  return base
}

const page = ref(1)
const nbRowsFound = ref(0)
const nbRowsInDatabase = ref(0)
const rows = ref([])

const { data: dataCountTotal, error: errorCountTotal } = useFetch(generateUrlCountTotal())

const { data: dataTable, error: tableError } = useFetch(generateUrlTable(page.value))

watch(dataCountTotal, () => {
  nbRowsInDatabase.value = dataCountTotal._rawValue.data[0].count
})
watch(dataTable, () => {
  rows.value = dataTable._rawValue.data
})
</script>

<template>
  <PageHeader />
  <main class="mb-8 mx-4">
    <LanguageList />
    <div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <SearchFilter />
      </div>
      <div>
        <div role="alert" class="alert">
          <p>
            {{ page }}
            to
            {{ Math.min(page * NB_ELEMENT_PER_PAGE, nbRowsInDatabase) }}
            of XXXX entries (filtered from {{ nbRowsInDatabase }} total entries)
          </p>
        </div>
        <div v-if="tableError">Oops! Error encountered: {{ tableError.message }}</div>
        <div v-else-if="rows">
          <SimpleTable :rows="rows" :page="page" />
          <TablePagination />
        </div>
        <div v-else>Loading...</div>
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
