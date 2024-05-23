<script setup>
const props = defineProps({
  cols: {
    type: Set,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})

function displayCode(row) {
  return [row.bereich, row.spr, row.sb, row.sm2].filter((element) => element).join(' | ')
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-show="props.cols.has('titel')">Title</th>
          <th v-show="props.cols.has('sprachniveau')">Target Levels</th>
          <th v-show="props.cols.has('fertigkeit')">Skills</th>
          <th v-show="props.cols.has('fachbezug')">Subject Areas</th>
          <th v-show="props.cols.has('ausgangssprache')">Source languages</th>
          <th v-show="props.cols.has('medium')">Media</th>
          <th v-show="props.cols.has('jahr')">Year</th>
          <th v-show="props.cols.has('asl')">Modalities</th>
          <th v-show="props.cols.has('autor')">Author</th>
          <th v-show="props.cols.has('code')">Code</th>
          <th v-show="props.cols.has('ble')">Loanable</th>
          <th v-show="props.cols.has('kommentar')">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.rows" :key="index">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
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
          <td v-show="props.cols.has('fertigkeit')">{{ row.fertigkeit }}</td>
          <td v-show="props.cols.has('fachbezug')">{{ row.fachbezug }}</td>
          <td v-show="props.cols.has('ausgangssprache')">{{ row.ausgangssprache }}</td>
          <td v-show="props.cols.has('medium')">{{ row.medium }}</td>
          <td v-show="props.cols.has('jahr')">{{ row.jahr }}</td>
          <td v-show="props.cols.has('asl')">{{ row.asl }}</td>
          <td v-show="props.cols.has('autor')">{{ row.autor }}</td>
          <td v-show="props.cols.has('code')">
            {{ displayCode(row) }}
          </td>
          <td v-show="props.cols.has('ble')">{{ row.ausleihe_ble }}</td>
          <td v-show="props.cols.has('kommentar')">{{ row.kommentar }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
