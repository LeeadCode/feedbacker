<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in filters"
        :key="filter.label"
        :class="{
          'bg-gray-200 bg-opacity-50': filter.active
        }"
        @click="() => handleSelect(filter)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <span 
            :class="filter.color.bg"
            class="inline-block w-2 h-2 mr-2 rounded-full"
            ></span>
            {{ filter.label }}
          </div>
          <span
            :class="filter.active ? filter.color.text : 'text-brand-darkgray'"
            class="font-bold"
          >
            {{ filter.amount }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useStore from '../../hooks/useStore'
import Services from '@/Services';

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' }
}

const emit = defineEmits(['select'])

const store = useStore('Global')
const hasErrors = ref(false)
const filters = ref([{label: null, amount: null, color: {text: null, bg: null}, active: null}])

function applyFiltersStructure(summary) {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: summary[cur]
    }

    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur 
    }

    return [...acc, currentFilter]
  }, [])
}

try {
    const { data } = await Services.feedbacks.getSummary()
    filters.value = applyFiltersStructure(data)
  } catch (error) {
    hasErrors.value = !!error
    filters.value = applyFiltersStructure({all: 0, issue: 0, idea: 0, other: 0})
}

function handleSelect({ type }) {
  if(store.isLoading) {
    return
  }

  filters.value = filters.value.map((f) => {
    if(f.type === type) {
      return { ...f, active: true }
    }

    return { ...f, active: false }
  })

  emit('select', type)
}
</script>