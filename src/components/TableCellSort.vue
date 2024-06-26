<script setup>
import IconSortAsc from './icons/IconSortAsc.vue'
import IconSortDesc from './icons/IconSortDesc.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  ascending: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['setSort'])

function onSort() {
  emit('setSort', props.field, props.ascending !== true)
}
</script>

<template>
  <button class="btn btn-outline" @click="() => onSort()">
    {{ props.title }}
    <template v-if="props.ascending !== null">
      <IconSortAsc v-if="props.ascending" />
      <IconSortDesc v-else />
    </template>
  </button>
</template>
