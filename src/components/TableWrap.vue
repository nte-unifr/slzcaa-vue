<script setup>
import { computed, ref, watch } from 'vue'
import TableBody from './TableBody.vue'
import TableInfo from './TableInfo.vue'
import TablePagination from './TablePagination.vue'
import { NB_ELEMENT_PER_PAGE } from '../config.js'
import { useFetch } from '../fetch.js'

const props = defineProps({
  columnsChecked: {
    type: Set,
    required: true
  },
  filterParam: {
    type: String,
    required: true
  },
  selectedRows: {
    type: Set,
    required: true
  }
})

const emit = defineEmits(['downloadPdf', 'resetSelection', 'selectRow'])

const BASE_URL = 'https://eddb.unifr.ch/slzcaa-admin/items/materials'

const page = ref(1)
const nbRowsFound = ref(0)
const nbRowsInDatabase = ref(0)
const sort = ref({ field: 'titel', ascending: true })

const urlDataTable = computed(() => {
  const limitArg = `limit=${NB_ELEMENT_PER_PAGE}`
  const pageArg = `page=${page.value}`
  const filterArg = `filter=${props.filterParam}`
  const ascArg = sort.value.ascending ? '' : '-'
  const sortArg = `sort=${ascArg}${sort.value.field}`
  return `${BASE_URL}?${limitArg}&${pageArg}&${filterArg}&${sortArg}`
})
const urlNbFound = computed(() => {
  return `${BASE_URL}?filter=${props.filterParam}&aggregate[count]=*`
})
const urlNbTotal = `${BASE_URL}?aggregate[count]=*`

const { data: dataCountFound, error: errorCountFound } = useFetch(urlNbFound)
const { data: dataCountTotal, error: errorCountTotal } = useFetch(urlNbTotal)
const { data: dataTable, error: errorTable } = useFetch(urlDataTable)

watch(
  () => props.filterParam,
  () => {
    page.value = 1
  }
)

watch(dataCountFound, () => {
  if (dataCountFound.value?.data[0]) {
    nbRowsFound.value = dataCountFound.value.data[0].count
  }
})

watch(dataCountTotal, () => {
  if (dataCountTotal.value?.data[0]) {
    nbRowsInDatabase.value = dataCountTotal.value.data[0].count
  }
})

function changePage(newPage) {
  page.value = newPage
  window.scrollTo({ top: 0 })
}

function downloadPdf() {
  emit('downloadPdf')
}

function resetSelection() {
  emit('resetSelection')
}

function selectRow(id) {
  const row = dataTable.value.data.find((item) => item.id == id)
  const isChecked = props.selectedRows.has(row.id)
  emit('selectRow', row, isChecked)
}

function setSort(field, isAscending) {
  sort.value.field = field
  sort.value.ascending = isAscending
  page.value = 1
}
</script>

<template>
  <div v-if="errorCountFound">Oops! Error encountered: {{ errorCountFound.message }}</div>
  <div v-if="errorCountTotal">Oops! Error encountered: {{ errorCountTotal.message }}</div>
  <div v-else-if="dataCountFound && dataCountTotal">
    <TableInfo
      :currentPage="page"
      :nbEntriesFound="nbRowsFound"
      :nbEntriesTotal="nbRowsInDatabase"
      :nbSelectedElements="props.selectedRows.size"
      @download-pdf="downloadPdf"
      @reset="resetSelection"
    />
  </div>
  <div v-else>
    <div class="skeleton h-16 w-full"></div>
  </div>

  <div v-if="errorTable">Oops! Error encountered: {{ errorTable.message }}</div>
  <div v-else-if="dataTable">
    <TableBody
      :cols="columnsChecked"
      :rows="dataTable.data"
      :sort="sort"
      :selectedRows="selectedRows"
      @select-row="selectRow"
      @setSort="setSort"
    />
    <TablePagination
      :page="page"
      :nbPage="Math.ceil(nbRowsFound / NB_ELEMENT_PER_PAGE)"
      @change-page="changePage"
    />
  </div>
  <div v-else>
    <div class="skeleton h-128 w-full"></div>
  </div>
</template>
