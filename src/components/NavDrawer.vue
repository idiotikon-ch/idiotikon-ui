<template>
  <v-navigation-drawer
    :width="width"
    :temporary="temporary"
    :model-value="modelValue"
    :location="location"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-list v-model:opened="openedGroups">
      <NavItems
        v-for="item in items"
        :key="item.id || item.title"
        :item="item"
        :icon-map="iconMap"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavItems from './NavItems.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: 'left'
  },
  width: {
    type: [String, Number],
    default: 256
  },
  temporary: {
    type: Boolean,
    default: false
  },
  iconMap: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['update:modelValue'])

const openedGroups = ref<string[]>([])
</script>

<script lang="ts">
export default {
  name: 'NavDrawer'
}
</script>
