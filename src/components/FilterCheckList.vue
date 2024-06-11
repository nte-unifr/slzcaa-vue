<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle'])

function onChange(e) {
  emit('toggle', e.target.value)
}

function onSelectAll() {
  const allChecked = props.items.every((item) => item.checked)
  const toToggle = (item) => allChecked || !item.checked
  props.items.filter(toToggle).forEach((item) => {
    emit('toggle', item.key)
  })
}
</script>

<template>
  <details class="collapse collapse-arrow bg-base-200 border-2 border-slate-200 my-1">
    <summary class="collapse-title text-l font-medium">
      {{ props.title }}
    </summary>
    <div class="collapse-content bg-white">
      <p class="text-center">
        <button class="btn btn-xs" v-on:click="onSelectAll">
          <span v-if="props.items.every((item) => item.checked)">{{
            $t('filter.unselect_all')
          }}</span>
          <span v-else>{{ $t('filter.select_all') }}</span>
        </button>
      </p>
      <ul>
        <li v-for="(item, index) in props.items" :key="index" class="border-t-2">
          <label class="label cursor-pointer">
            <span class="label-text">{{ item.label }}</span>
            <input
              type="checkbox"
              class="checkbox checkbox-xs"
              :value="item.key"
              :checked="item.checked"
              v-on:change="onChange"
            />
          </label>
        </li>
      </ul>
    </div>
  </details>
</template>
