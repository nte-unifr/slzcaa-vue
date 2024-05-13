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

const emit = defineEmits(['toggleFilter'])

function onChange(e) {
  const labelAndInput = e.target.labels[0]
  const labelNode = labelAndInput.firstChild
  const label = labelNode.innerText
  emit('toggleFilter', label)
}
</script>

<template>
  <details class="collapse collapse-arrow bg-base-200 border-2 border-slate-200 my-1">
    <summary class="collapse-title text-l font-medium">
      {{ props.title }}
    </summary>
    <div class="collapse-content bg-white">
      <p>
        <button class="btn btn-xs">Select all</button>
        |
        <button class="btn btn-xs">Clear all</button>
      </p>
      <ul>
        <li v-for="(item, index) in props.items" :key="index" class="border-t-2">
          <label class="label cursor-pointer">
            <span class="label-text">{{ item.name }}</span>
            <input
              type="checkbox"
              class="checkbox checkbox-xs"
              :checked="item.checked"
              v-on:change="onChange"
            />
          </label>
        </li>
      </ul>
    </div>
  </details>
</template>
