<script setup>
import languagesEn from '../ressources/languages_en.json'

// TODO: change the hardcoded choice
const languages = languagesEn
</script>

<template>
  <p class="text-center my-4">
    What language would you like to learn:
    <select class="select select-primary w-full max-w-xs">
      <option value="EFL">{{ languages['EFL'] }}</option>
      <option v-for="(language, key) in languages" :key="key" :value="key">
        {{ language }}
      </option>
    </select>
  </p>
</template>
