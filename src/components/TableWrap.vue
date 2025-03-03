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

const BASE_URL = import.meta.env.VITE_APP_BASE_API

const page = ref(1)
const nbRowsFound = ref(0)
const nbRowsInDatabase = ref(0)
const sort = ref({ field: 'titel', ascending: true })

const urlDataTable = computed(() => {
  const limitArg = `limit=${NB_ELEMENT_PER_PAGE}`
  const offsetArg = `offset=${NB_ELEMENT_PER_PAGE * (page.value - 1)}`
  const ascArg = sort.value.ascending ? '' : '-'
  const sortArg = `sort=${ascArg}${sort.value.field}`
  const whereArg = `where=${props.filterParam}`
  return `${BASE_URL}?${limitArg}&${offsetArg}&${sortArg}&${whereArg}`
})
const urlNbTotal = `${BASE_URL}/count`

const { data: dataCountTotal, error: errorCountTotal } = useFetch(urlNbTotal)
const { data: dataTable, error: errorTable } = useFetch(urlDataTable)

watch(
  () => props.filterParam,
  () => {
    page.value = 1
  }
)

watch(dataCountTotal, () => {
  const tmp = dataCountTotal.value?.count
  if (tmp) {
    nbRowsInDatabase.value = tmp
  }
})

watch(dataTable, () => {
  const tmp = dataTable.value?.pageInfo.totalRows
  if (tmp) {
    nbRowsFound.value = tmp
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
  const row = dataTable.value.list.find((item) => item.Id == id)
  const isChecked = props.selectedRows.has(row.Id)
  emit('selectRow', row, isChecked)
}

function setSort(field, isAscending) {
  sort.value.field = field
  sort.value.ascending = isAscending
  page.value = 1
}
</script>

<template>
  <div v-if="errorCountTotal">Oops! Error encountered: {{ errorCountTotal.message }}</div>
  <div v-else-if="dataTable && dataCountTotal">
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
      :rows="dataTable.list"
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
