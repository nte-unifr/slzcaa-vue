<script setup>
import { ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'

const emit = defineEmits(['changeYear'])
const bus = useEventBus('reset')

const items = ref([
  { key: '', label: 'All', checked: true },
  { key: '2000', label: '2000', checked: false },
  { key: '2010', label: '2010', checked: false },
  { key: '2020', label: '2020', checked: false }
])

bus.on(() => {
  items.value.forEach((item, i) => (item.checked = i === 0))
})

function onChange(e) {
  const key = e.target.value
  items.value.forEach((item) => (item.checked = item.key === key))
}

watchEffect(() => {
  const selected = items.value.find((item) => item.checked)
  const paramRequired = selected.key !== ''
  if (paramRequired) {
    const param = JSON.stringify({ jahr: { _gte: selected.key } })
    emit('changeYear', param)
  } else {
    emit('changeYear', '')
  }
})
</script>

<template>
  <details class="collapse collapse-arrow bg-base-200 border-2 border-slate-200 my-1">
    <summary class="collapse-title text-l font-medium">{{ $t('filter.year') }}</summary>
    <div class="collapse-content bg-white">
      <div v-for="(item, index) in items" :key="index" class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">
            <span v-if="item.key">
              {{ $t('filter.since') }}
            </span>
            {{ item.label }}
          </span>
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
