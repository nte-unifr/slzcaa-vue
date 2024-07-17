<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import languagesEn from '../ressources/languages_en.json'

const emit = defineEmits(['onChange'])

const { t } = useI18n()
const languages = ref([])
const primaryLanguages = ['DAF', 'EFL', 'ESP', 'FLE', 'ILS']

function onChange(e) {
  emit('onChange', e.target.value)
}

onMounted(() => {
  const head = []
  const tail = []
  Object.keys(languagesEn)
    .filter((key) => key !== 'other')
    .forEach((key) => {
      const value = t(key)
      if (primaryLanguages.includes(key)) {
        head.push({ key: key, value: value })
      } else {
        tail.push({ key: key, value: value })
      }
    })
  head.sort((a, b) => a.value.localeCompare(b.value))
  tail.sort((a, b) => a.value.localeCompare(b.value))
  languages.value = head.concat(tail).map((e) => e.key)
  emit('onChange', languages.value[0])
})
</script>

<template>
  <p class="text-center my-4">
    {{ $t('header.what_language') }}
    <select class="select select-primary w-full max-w-xs" v-on:change="onChange">
      <option v-for="langKey in languages" :key="langKey" :value="langKey">
        {{ $t(langKey) }}
      </option>
    </select>
  </p>
</template>
