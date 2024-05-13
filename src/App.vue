<script setup>
import { ref, watch } from 'vue'
import LanguageList from './components/LanguageList.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import FiltersNav from './components/FiltersNav.vue'
import SimpleTable from './components/SimpleTable.vue'
import TablePagination from './components/TablePagination.vue'
import { useFetch } from './fetch.js'

const BASE_URL = 'https://eddb.unifr.ch/slzcaa-admin/items/materials'
const NB_ELEMENT_PER_PAGE = 50

const page = ref(1)
const nbRowsFound = ref(0)
const nbRowsInDatabase = ref(0)
const rows = ref([])
const urlDataTable = ref(generateUrlTable(page.value))

const { data: dataCountTotal, error: errorCountTotal } = useFetch(generateUrlCountTotal())
const { data: dataTable, error: tableError } = useFetch(urlDataTable)

watch(page, () => {
  urlDataTable.value = generateUrlTable(page.value)
})

watch(dataCountTotal, () => {
  nbRowsInDatabase.value = dataCountTotal._rawValue.data[0].count
})

watch(dataTable, () => {
  rows.value = dataTable._rawValue?.data
})

function changePage(newPage) {
  page.value = newPage
}

function generateUrlCountTotal() {
  return `${BASE_URL}?aggregate[count]=*`
}

function generateUrlTable(page) {
  let base = BASE_URL
  base += `?limit=${NB_ELEMENT_PER_PAGE}`
  base += `&page=${page}`
  return base
}
</script>

<template>
  <PageHeader />
  <main class="mb-8 mx-4">
    <LanguageList />
    <div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <FiltersNav />
      </div>
      <div>
        <div role="alert" class="alert">
          <p>
            {{ 1 + (page - 1) * NB_ELEMENT_PER_PAGE }}
            to
            {{ Math.min(page * NB_ELEMENT_PER_PAGE, nbRowsInDatabase) }}
            of XXXX entries (filtered from {{ nbRowsInDatabase }} total entries)
          </p>
        </div>
        <div v-if="tableError">Oops! Error encountered: {{ tableError.message }}</div>
        <div v-else-if="rows">
          <SimpleTable :rows="rows" />
          <TablePagination
            :page="page"
            :nbPage="Math.ceil(nbRowsInDatabase / NB_ELEMENT_PER_PAGE)"
            @change-page="changePage"
          />
        </div>
        <div v-else>Loading...</div>
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
