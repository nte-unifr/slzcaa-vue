<script setup>
import { ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import LanguageList from './components/LanguageList.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import FiltersNav from './components/FiltersNav.vue'
import SimpleTable from './components/SimpleTable.vue'
import TableInfo from './components/TableInfo.vue'
import TablePagination from './components/TablePagination.vue'
import { NB_ELEMENT_PER_PAGE } from './config.js'
import { useFetch } from './fetch.js'

const BASE_URL = 'https://eddb.unifr.ch/slzcaa-admin/items/materials'
const DEBOUNCE_TIME = 512
const DEBOUNCE_MAX_WAIT = 1024

const columnsChecked = ref(new Set([]))
const filterLang = ref('EFL')
const filterParam = ref('')
const itemsSelected = ref(new Set([]))
const page = ref(1)
const nbRowsFound = ref(0)
const nbRowsInDatabase = ref(0)
const urlDataTable = ref(`${BASE_URL}?limit=${NB_ELEMENT_PER_PAGE}&page=${page.value}`)
const urlNbFound = ref(`${BASE_URL}?aggregate[count]=*`)
const urlNbTotal = ref(`${BASE_URL}?aggregate[count]=*`)

const { data: dataCountFound, error: errorCountFound } = useFetch(urlNbFound)
const { data: dataCountTotal, error: errorCountTotal } = useFetch(urlNbTotal)
const { data: dataTable, error: errorTable } = useFetch(urlDataTable)

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

watchDebounced(
  [filterParam, page],
  () => {
    let url = BASE_URL
    url += `?limit=${NB_ELEMENT_PER_PAGE}`
    url += `&page=${page.value}`
    url += `&filter=${filterParam.value}`
    urlDataTable.value = url
  },
  { debounce: DEBOUNCE_TIME, maxWait: DEBOUNCE_MAX_WAIT }
)

watchDebounced(
  filterParam,
  () => {
    urlNbFound.value = `${BASE_URL}?filter=${filterParam.value}&aggregate[count]=*`
  },
  { debounce: DEBOUNCE_TIME, maxWait: DEBOUNCE_MAX_WAIT }
)

function changeColumns(param) {
  columnsChecked.value = param
}

function changeFilter(param) {
  filterParam.value = param
  page.value = 1
}

function changePage(newPage) {
  page.value = newPage
  window.scrollTo({ top: 0 })
}

function downloadPdf() {
  const docDefinition = {
    pageOrientation: 'landscape',
    defaultStyle: {
      fontSize: 9
    },
    content: [
      { text: 'This is a header', style: 'header' },
      {
        table: {
          body: [
            [
              'Title',
              'Level',
              'Skills',
              'Subject',
              'Source',
              'Media',
              'Year',
              'Modalities',
              'Author',
              'Code',
              'Loanable',
              'Description'
            ],
            ...Array.from(itemsSelected.value).map((item) => {
              return [
                item.titel,
                item.sprachniveau,
                item.fertigkeit,
                item.fachbezug,
                item.ausgangssprache,
                item.medium,
                item.jahr,
                item.asl,
                item.autor,
                'TODO', // item.code,
                item.ausleihe_ble,
                item.kommentar
              ]
            })
          ]
        }
      }
    ]
  }
  pdfMake.vfs = pdfFonts.pdfMake.vfs
  pdfMake.createPdf(docDefinition).open()
}

function filterLanguage(lang) {
  filterLang.value = lang
}

function selectRow(id, isChecked) {
  const item = dataTable.value.data.find((item) => item.id == id)
  if (isChecked) {
    itemsSelected.value.add(item)
  } else {
    itemsSelected.value.delete(item)
  }
}
</script>

<template>
  <PageHeader />
  <main class="mb-8 mx-4">
    <LanguageList @on-change="filterLanguage" />
    <div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <FiltersNav
          :language="filterLang"
          @columns-checked="changeColumns"
          @filter="changeFilter"
        />
      </div>
      <div>
        <TableInfo
          :currentPage="page"
          :nbEntriesFound="nbRowsFound"
          :nbEntriesTotal="nbRowsInDatabase"
          @download-pdf="downloadPdf"
        />
        <div v-if="errorTable">Oops! Error encountered: {{ errorTable.message }}</div>
        <div v-else-if="dataTable">
          <SimpleTable :cols="columnsChecked" :rows="dataTable.data" @select-row="selectRow" />
          <TablePagination
            :page="page"
            :nbPage="Math.ceil(nbRowsFound / NB_ELEMENT_PER_PAGE)"
            @change-page="changePage"
          />
        </div>
        <div v-else>
          <div class="skeleton h-128 w-full"></div>
        </div>
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
