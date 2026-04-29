<template>
  <v-form @submit.prevent="handleSearch">
    <v-text-field 
      v-model="internalQuery" 
      :placeholder="placeholder" 
      :clearable="clearable"
      :append-inner-icon="searchIcon" 
      :bg-color="bgColor" 
      :variant="variant" 
      :density="density"
      :autofocus="autofocus" 
      @click:append-inner="handleSearch" 
    />
  </v-form>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { mdiMagnify } from '@mdi/js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Suche'
  },
  searchIcon: {
    type: String,
    default: mdiMagnify
  },
  bgColor: {
    type: String,
    default: 'white'
  },
  variant: String,
  density: {
    type: String,
    default: 'compact'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  autofocus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const internalQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function handleSearch() {
  emit('search', internalQuery.value || '')
}
</script>

<script lang="ts">
export default {
  name: 'SearchField'
}
</script>
