<template>
  <v-tooltip :model-value="showTooltip" :location="tooltipLocation">
    {{ tooltipText }}
    <template #activator="{ props }">
      <v-btn
        v-show="visible"
        @click="scrollToTop"
        :icon="icon"
        v-bind="props"
        :density="density"
        :color="color"
        :style="buttonStyles"
        style="z-index: 1; position: fixed"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mdiChevronUp } from '@mdi/js'

const props = defineProps({
  /** Show button when scrolled this many pixels */
  threshold: {
    type: Number,
    default: 10
  },
  icon: {
    type: String,
    default: mdiChevronUp
  },
  color: {
    type: String,
    default: 'primary'
  },
  density: {
    type: String,
    default: 'comfortable'
  },
  /** Position from bottom (px or string) */
  bottom: {
    type: [String, Number],
    default: 50
  },
  /** Position from right or left (px or string) */
  position: {
    type: [String, Number],
    default: 50
  },
  /** Which side to position on */
  side: {
    type: String as () => 'left' | 'right',
    default: 'right'
  },
  tooltipText: {
    type: String,
    default: 'Back to top'
  },
  tooltipLocation: {
    type: String,
    default: 'left'
  }
})

const visible = ref(false)
const showTooltip = ref(false)

const buttonStyles = computed(() => ({
  bottom: typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom,
  [props.side]: typeof props.position === 'number' ? `${props.position}px` : props.position
}))

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Export method to be called from parent's scroll handler
function updateVisibility(scrollTop: number) {
  visible.value = scrollTop >= props.threshold
}

defineExpose({
  updateVisibility
})
</script>

<script lang="ts">
export default {
  name: 'ScrollToTop'
}
</script>
