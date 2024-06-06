<script setup>
import { NB_ELEMENT_PER_PAGE } from '../config.js'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  nbEntriesFound: {
    type: Number,
    required: true
  },
  nbEntriesTotal: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['downloadPdf'])

function downloadPdf() {
  emit('downloadPdf')
}
</script>

<template>
  <div role="alert" class="alert">
    <p>
      {{ 1 + (props.currentPage - 1) * NB_ELEMENT_PER_PAGE }}
      to
      {{ Math.min(props.currentPage * NB_ELEMENT_PER_PAGE, props.nbEntriesFound) }}
      of {{ props.nbEntriesFound }} entries (filtered from {{ props.nbEntriesTotal }} total entries)
    </p>
    <p>
      <button class="btn btn-info" @click="downloadPdf">Download</button>
    </p>
  </div>
</template>
