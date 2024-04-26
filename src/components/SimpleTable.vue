<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Target levels</th>
          <th>Skills</th>
          <th>Source languages</th>
          <th>Year</th>
          <th>Loanable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.rows" :key="index">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>{{ row.titel }}</td>
          <td>
            <span
              v-for="(level, j) in row.sprachniveau.split(' ')"
              :key="j"
              class="badge badge-ghost badge-sm"
            >
              {{ level }}
            </span>
          </td>
          <td>{{ row.fertigkeit }}</td>
          <td>{{ row.ausgangssprache }}</td>
          <td>{{ row.jahr }}</td>
          <td>{{ row.ausleihe_ble }}</td>
          <td>{{ row.kommentar }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
