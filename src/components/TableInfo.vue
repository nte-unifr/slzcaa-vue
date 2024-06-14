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
  },
  nbSelectedElements: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['downloadPdf', 'reset'])

function downloadPdf() {
  emit('downloadPdf')
}

function reset() {
  emit('reset')
}
</script>

<template>
  <div role="alert" class="alert">
    <p>
      {{
        $t('info.entries_range', [
          1 + (props.currentPage - 1) * NB_ELEMENT_PER_PAGE,
          Math.min(props.currentPage * NB_ELEMENT_PER_PAGE, props.nbEntriesFound)
        ])
      }}
      {{ $t('info.entries_among', [props.nbEntriesFound]) }}
      ({{ $t('info.entries_filtered', [props.nbEntriesTotal]) }})
    </p>
    <p v-if="props.nbSelectedElements > 0">
      <button class="btn btn-neutral" @click="reset">
        {{ $t('info.reset') }}
      </button>
      {{ ' ' }}
      <button class="btn btn-info" @click="downloadPdf">
        {{ $t('info.download') }}
        ({{ props.nbSelectedElements }})
      </button>
    </p>
  </div>
</template>
