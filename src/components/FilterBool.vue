<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle'])

function onChange() {
  emit('toggle')
}
</script>

<template>
  <div tabindex="0" class="collapse collapse-close border border-base-300 bg-base-200 my-1">
    <div class="collapse-title text-l font-medium">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">{{ props.title }}</span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            :checked="props.checked"
            v-on:change="onChange"
          />
        </label>
      </div>
    </div>
    <div class="collapse-content">
      <p>tabindex="0" attribute is necessary to make the div focusable</p>
    </div>
  </div>
</template>
