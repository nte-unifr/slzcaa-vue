<script setup>
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['search'])

const query = ref('')

function onChange(e) {
  query.value = e.target.value.trim()
}

watchEffect(() => {
  const fields = ['autor', 'titel', 'kommentar']
  if (query.value.length) {
    const conditions = fields.map((f) => {
      return { [f]: { _contains: query.value } }
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
        @input="onChange"
      />
    </div>
  </div>
</template>
