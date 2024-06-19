<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import pdfMake from 'pdfmake/build/pdfmake'
import { i18n } from './i18n'
import LanguageList from './components/LanguageList.vue'
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import FiltersNav from './components/FiltersNav.vue'
import TableWrap from './components/TableWrap.vue'
import { DEBOUNCE_MAX_WAIT, DEBOUNCE_TIME } from './config.js'
import { fonts } from './fonts.js'

const itemsSelected = ref(new Set([]))
const columnsChecked = ref(new Set([]))
const filterLang = ref('EFL')
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
              i18n.global.t('table.title'),
              i18n.global.t('filter.target_levels'),
              i18n.global.t('filter.skills'),
              i18n.global.t('table.subject_areas'),
              i18n.global.t('filter.source_languages'),
              i18n.global.t('filter.media'),
              i18n.global.t('filter.year'),
              i18n.global.t('filter.modalities'),
              i18n.global.t('table.author'),
              'Code', // TODO
              i18n.global.t('table.loanable'),
              i18n.global.t('table.description')
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
  pdfMake.fonts = fonts
  pdfMake.createPdf(docDefinition).open()
}

function filterLanguage(lang) {
  filterLang.value = lang
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
    <div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <FiltersNav
          :language="filterLang"
          @columns-checked="changeColumns"
          @filter="changeFilter"
        />
      </div>
      <div v-if="filterParam">
        <TableWrap
          :columnsChecked="columnsChecked"
          :filterParam="filterParam"
          :selectedRows="new Set([...itemsSelected].map((x) => x.id))"
          @download-pdf="downloadPdf"
          @select-row="selectRow"
          @resetSelection="resetSelection"
        />
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
