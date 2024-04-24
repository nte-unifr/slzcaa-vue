<script setup>
import TablePagination from './TablePagination.vue'
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
        <!-- row 1 -->
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>Some title</td>
          <td>
            <span class="badge badge-ghost badge-sm">A1</span>
            <span class="badge badge-ghost badge-sm">A2</span>
            <span class="badge badge-ghost badge-sm">B1</span>
          </td>
          <td>Vocabulary</td>
          <td>German</td>
          <td>1996</td>
          <td>No</td>
          <td>Some description here that can be very long.</td>
        </tr>
      </tbody>
    </table>
    <TablePagination />
  </div>
</template>
