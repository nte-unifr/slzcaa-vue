<script setup>
import PageFooter from './components/PageFooter.vue'
import PageHeader from './components/PageHeader.vue'
import SearchFilter from './components/SearchFilter.vue'
import SimpleTable from './components/SimpleTable.vue'
</script>

<template>
  <PageHeader />
  <main class="mb-8 mx-4">
    <p class="text-center my-4">
      What language would you like to learn:
      <select class="select select-primary w-full max-w-xs">
        <option disabled selected>What language?</option>
        <option>English</option>
        <option>French</option>
        <option>German</option>
        <option>Italian</option>
        <option>Spanish</option>
        <option>TODO</option>
      </select>
    </p>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <SearchFilter />
      </div>
      <div>
        <div role="alert" class="alert">
          <p>1 to 50 of 1,028 entries (filtered from 7,134 totalentries)</p>
        </div>
        <SimpleTable />
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped></style>
