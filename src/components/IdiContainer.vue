<template>
  <v-container 
    v-bind="$attrs" 
    fluid
    class="idi-container my-10"
    :style="containerStyle"
  >
    <slot />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  /** Responsive width - accepts object with breakpoint keys or string */
  width: {
    type: [String, Object],
    default: undefined
  },
  /** Max width constraint */
  maxWidth: {
    type: String,
    default: undefined
  }
})

defineOptions({
  inheritAttrs: false
})

const { mdAndUp } = useDisplay()

const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    if (typeof props.width === 'string') {
      style.width = props.width
    } else if (typeof props.width === 'object') {
      // Handle responsive width object like { md: '70%', default: '90%' }
      style.width = mdAndUp.value ? (props.width.md || props.width.default || '90%') : (props.width.default || '90%')
    }
  }
  
  if (props.maxWidth) {
    style.maxWidth = props.maxWidth
  }
  
  return style
})
</script>

<script lang="ts">
export default {
  name: 'IdiContainer'
}
</script>

<style scoped>
.idi-container {
  padding: 0;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
