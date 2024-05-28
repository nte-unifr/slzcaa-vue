<script setup>
import { ref } from 'vue'

const emit = defineEmits(['changeYear'])

const items = ref([
  { key: '', label: 'All', checked: true },
  { key: '1990', label: '1990', checked: false },
  { key: '2000', label: '2000', checked: false },
  { key: '2010', label: '2010', checked: false }
])

function onChange(e) {
  const key = e.target.value
  if (key) {
    const param = JSON.stringify({ jahr: { _gte: key } })
    emit('changeYear', param)
  } else {
    emit('changeYear', '')
  }
}
</script>

<template>
  <details class="collapse collapse-arrow bg-base-200 border-2 border-slate-200 my-1">
    <summary class="collapse-title text-l font-medium">Year</summary>
    <div class="collapse-content bg-white">
      <div v-for="(item, index) in items" :key="index" class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">{{ item.label }}</span>
          <input
            type="radio"
            name="radio-10"
            class="radio checked:bg-black-500"
            :value="item.key"
            :checked="item.checked"
            v-on:change="onChange"
          />
        </label>
      </div>
    </div>
  </details>
</template>
