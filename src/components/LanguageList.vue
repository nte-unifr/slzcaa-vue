<script setup>
import languagesEn from '../ressources/languages_en.json'

const emit = defineEmits(['onChange'])

const languages = languagesEn

function onChange(e) {
  emit('onChange', e.target.value)
}
</script>

<template>
  <p class="text-center my-4">
    What language would you like to learn:
    <select class="select select-primary w-full max-w-xs" v-on:change="onChange">
      <option value="EFL">{{ languages['EFL'] }}</option>
      <option v-for="(language, key) in languages" :key="key" :value="key">
        {{ language }}
      </option>
    </select>
  </p>
</template>
