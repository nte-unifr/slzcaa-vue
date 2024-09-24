<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import subjectsMatch from '../ressources/label_subjects_match.json'
import subjectsEverydayEn from '../ressources/label_subjects_everyday_en.json'
import subjectsProEn from '../ressources/label_subjects_pro_en.json'

const emit = defineEmits(['toggle'])
const bus = useEventBus('reset')
const { t } = useI18n()

const itemsEveryday = ref([])
const itemsPro = ref([])

bus.on(() => {
  itemsEveryday.value.forEach((item) => (item.checked = true))
  itemsPro.value.forEach((item) => (item.checked = true))
})

function onChangeEveryday(e) {
  const param = e.target.value
  const index = itemsEveryday.value.findIndex((item) => item.key === param)
  itemsEveryday.value[index].checked = !itemsEveryday.value[index].checked
}

function onChangePro(e) {
  const param = e.target.value
  const index = itemsPro.value.findIndex((item) => item.key === param)
  itemsPro.value[index].checked = !itemsPro.value[index].checked
}

function onSelectAll() {
  const items = itemsEveryday.value.concat(itemsPro.value)
  const allChecked = items.every((item) => item.checked)
  const toToggle = (item) => allChecked || !item.checked
  items.filter(toToggle).forEach((item) => {
    item.checked = !item.checked
  })
}

onMounted(() => {
  const everydayTmp = Object.keys(subjectsEverydayEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  everydayTmp.sort((a, b) => a.value.localeCompare(b.value))
  itemsEveryday.value = everydayTmp

  const proTmp = Object.keys(subjectsProEn).map((key) => {
    return { key: key, value: t(key), checked: true }
  })
  proTmp.sort((a, b) => a.value.localeCompare(b.value))
  itemsPro.value = proTmp
})

watchEffect(() => {
  const nbSubject = itemsEveryday.value.length + itemsPro.value.length
  const selected = itemsEveryday.value.concat(itemsPro.value).filter((item) => item.checked)
  const paramRequired = selected.length > 0 && selected.length < nbSubject
  if (paramRequired) {
    const rows = []
    selected.forEach((e) => {
      subjectsMatch[e.key].forEach((keyword) => {
        if (keyword) {
          rows.push({ fachbezug: { _contains: keyword } })
        } else {
          rows.push({ fachbezug: { _null: true } })
        }
      })
    })
    const param = JSON.stringify({ _or: rows })
    emit('toggle', param)
  } else {
    emit('toggle', '')
  }
})
</script>

<template>
  <!-- Note: we cannot use the `FilterCheckList` component because there are two groups. -->
  <details class="collapse collapse-arrow bg-base-200 border-2 border-slate-200 my-1">
    <summary class="collapse-title text-l font-medium">
      {{ $t('filter.subject_areas') }}
    </summary>
    <div class="collapse-content bg-white">
      <p class="text-center">
        <button class="btn btn-xs" v-on:click="onSelectAll">
          <span v-if="itemsEveryday.concat(itemsPro).every((item) => item.checked)">{{
            $t('filter.unselect_all')
          }}</span>
          <span v-else>{{ $t('filter.select_all') }}</span>
        </button>
      </p>
      <p class="my-4">{{ $t('filter.subject_everyday') }}</p>
      <ul>
        <li v-for="(item, index) in itemsEveryday" :key="index" class="border-t-2">
          <label class="label cursor-pointer">
            <span class="label-text">{{ $t(item.key) }}</span>
            <input
              type="checkbox"
              class="checkbox"
              :value="item.key"
              :checked="item.checked"
              v-on:change="onChangeEveryday"
            />
          </label>
        </li>
      </ul>
      <p class="my-4">{{ $t('filter.subject_pro') }}</p>
      <ul>
        <li v-for="(item, index) in itemsPro" :key="index" class="border-t-2">
          <label class="label cursor-pointer">
            <span class="label-text">{{ $t(item.key) }}</span>
            <input
              type="checkbox"
              class="checkbox"
              :value="item.key"
              :checked="item.checked"
              v-on:change="onChangePro"
            />
          </label>
        </li>
      </ul>
    </div>
  </details>
</template>
