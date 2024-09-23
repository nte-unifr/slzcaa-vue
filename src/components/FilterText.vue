<script setup>
import { ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'

const emit = defineEmits(['search'])
const bus = useEventBus('reset')

const query = ref('')

bus.on(() => {
  query.value = ''
})

watchEffect(() => {
  const fields = ['autor', 'titel', 'kommentar']
  const q = query.value.trim()
  if (q.length) {
    const conditions = fields.map((f) => {
      return { [f]: { _contains: q } }
    })
    const param = JSON.stringify({ _or: conditions })
    emit('search', param)
  } else {
    emit('search', '')
  }
})
</script>

<template>
  <div tabindex="0" class="collapse collapse-open border border-base-300 bg-base-200">
    <div class="collapse-title text-l font-medium">{{ $t('filter.search') }}</div>
    <div class="collapse-content">
      <input
        type="text"
        :placeholder="$t('filter.search')"
        class="input input-bordered w-full"
        v-model="query"
      />
    </div>
  </div>
</template>
