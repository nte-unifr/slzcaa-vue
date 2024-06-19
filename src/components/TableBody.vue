<script setup>
import { fmtBoolean, fmtLanguage, fmtSplitAndLower, fmtSubject } from '../helper.js'

const props = defineProps({
  cols: {
    type: Set,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  selectedRows: {
    type: Set,
    required: true
  }
})

const emit = defineEmits(['selectRow'])

function displayCode(row) {
  return [row.bereich, row.spr, row.sb, row.sm2].filter((element) => element).join(' | ')
}

function onChange(e) {
  const id = e.target.value
  emit('selectRow', id)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-show="props.cols.has('titel')">{{ $t('table.title') }}</th>
          <th v-show="props.cols.has('sprachniveau')">{{ $t('filter.target_levels') }}</th>
          <th v-show="props.cols.has('fertigkeit')">{{ $t('filter.skills') }}</th>
          <th v-show="props.cols.has('fachbezug')">{{ $t('table.subject_areas') }}</th>
          <th v-show="props.cols.has('ausgangssprache')">{{ $t('filter.source_languages') }}</th>
          <th v-show="props.cols.has('medium')">{{ $t('filter.media') }}</th>
          <th v-show="props.cols.has('jahr')">{{ $t('filter.year') }}</th>
          <th v-show="props.cols.has('asl')">{{ $t('filter.modalities') }}</th>
          <th v-show="props.cols.has('autor')">{{ $t('table.author') }}</th>
          <th v-show="props.cols.has('code')">Code</th>
          <th v-show="props.cols.has('ble')">{{ $t('table.loanable') }}</th>
          <th v-show="props.cols.has('kommentar')">{{ $t('table.description') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.rows" :key="index">
          <th>
            <label>
              <input
                type="checkbox"
                class="checkbox"
                :value="row.id"
                :checked="props.selectedRows.has(row.id)"
                v-on:change="onChange"
              />
            </label>
          </th>
          <td v-show="props.cols.has('titel')">{{ row.titel }}</td>
          <td v-show="props.cols.has('sprachniveau')">
            <span
              v-for="(level, j) in (row.sprachniveau || '').split(' ')"
              :key="j"
              class="badge badge-ghost badge-sm"
            >
              {{ level }}
            </span>
          </td>
          <td v-show="props.cols.has('fertigkeit')">
            {{ fmtSplitAndLower(row.fertigkeit) }}
          </td>
          <td v-show="props.cols.has('fachbezug')">
            {{ fmtSubject(row.fachbezug) }}
          </td>
          <td v-show="props.cols.has('ausgangssprache')">
            {{ fmtLanguage(row.ausgangssprache) }}
          </td>
          <td v-show="props.cols.has('medium')">
            {{ fmtSplitAndLower(row.medium) }}
          </td>
          <td v-show="props.cols.has('jahr')">{{ row.jahr }}</td>
          <td v-show="props.cols.has('asl')">
            {{ fmtSplitAndLower(row.asl) }}
          </td>
          <td v-show="props.cols.has('autor')">{{ row.autor }}</td>
          <td v-show="props.cols.has('code')">
            {{ displayCode(row) }}
          </td>
          <td v-show="props.cols.has('ble')">
            {{ fmtBoolean(row.ausleihe_ble) }}
          </td>
          <td v-show="props.cols.has('kommentar')">{{ row.kommentar }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
