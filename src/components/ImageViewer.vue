<template>
  <v-dialog v-model="dialogOpen" fullscreen scrim="black" @click="handleDialogClick">
    <v-carousel 
      ref="carouselRef" 
      v-model="currentIndex" 
      height="100%" 
      hide-delimiters 
      :show-arrows="images.length > 1" 
      class="image-viewer-carousel"
    >
      <v-carousel-item v-for="(image, index) in images" :key="index">
        <v-img :src="image.src" :alt="image.alt || image.title || ''" contain class="h-100" />

        <!-- Close button -->
        <v-btn v-if="showControls" :icon="mdiClose" variant="outlined" color="white" class="close-btn"
          @click.stop="dialogOpen = false" />

        <!-- Title overlay -->
        <v-sheet v-if="image.title && showControls" class="title-overlay" color="rgba(0, 0, 0, 0.7)">
          <div class="text-white text-center pa-4" v-html="image.title" />
        </v-sheet>

        <!-- Legend/description overlay -->
        <v-sheet v-if="(image.legend || image.description) && showControls" class="legend-overlay"
          color="rgba(0, 0, 0, 0.7)" :style="{ minHeight: compactLegend ? 'auto' : '180px' }">
          <div class="text-white text-center pa-4" v-html="image.legend || image.description" />
        </v-sheet>
      </v-carousel-item>

      <!-- Custom navigation buttons -->
      <template #prev="{ props }">
        <v-btn v-if="showControls" :icon="mdiChevronLeft" variant="outlined" color="white"
          @click.stop="props.onClick" />
      </template>

      <template #next="{ props }">
        <v-btn v-if="showControls" :icon="mdiChevronRight" variant="outlined" color="white"
          @click.stop="props.onClick" />
      </template>
    </v-carousel>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js'

export interface ImageViewerImage {
  src: string
  title?: string
  alt?: string
  legend?: string
  description?: string
}

const props = defineProps({
  /** Array of images to display */
  images: {
    type: Array as () => ImageViewerImage[],
    required: true
  },
  /** Initial image index to display */
  startIndex: {
    type: Number,
    default: 0
  },
  /** Controls dialog visibility (v-model) */
  modelValue: {
    type: Boolean,
    required: true
  },
  /** Use compact legend layout */
  compactLegend: {
    type: Boolean,
    default: false
  },
  /** Carousel background opacity (number 0-1) or color (string) */
  scrim: {
    type: [String, Number],
    default: 0.85
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': [index: number]
}>()

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const currentIndex = ref(0)
const showControls = ref(true)
const carouselRef = ref<any>(null)

// Initialize index when dialog opens
watch(() => [props.modelValue, props.startIndex], ([isOpen, startIdx]) => {
  if (isOpen && typeof startIdx === 'number') {
    currentIndex.value = startIdx
    nextTick(() => {
      showControls.value = true
    })
  }
}, { immediate: true })

// Emit close event with final index
watch(dialogOpen, (isOpen) => {
  if (!isOpen) {
    emit('close', currentIndex.value)
  }
})

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (!dialogOpen.value) return

  if (e.key === 'ArrowRight') {
    navigateNext()
  } else if (e.key === 'ArrowLeft') {
    navigatePrev()
  } else if (e.key === 'Escape') {
    dialogOpen.value = false
  }
}

const navigatePrev = () => {
  currentIndex.value = currentIndex.value === 0
    ? props.images.length - 1
    : currentIndex.value - 1
}

const navigateNext = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

// Toggle controls on image click
const handleDialogClick = () => {
  if (props.images[currentIndex.value]) {
    showControls.value = !showControls.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<script lang="ts">
export default {
  name: 'ImageViewer'
}
</script>

<style scoped>
/* Dark background for carousel */
.image-viewer-carousel {
  background-color: rgba(0, 0, 0, 0.85);
}

/* Override Vuetify's default v-overlay opacity if present */
.image-viewer-carousel :deep(.v-overlay) {
  opacity: 0.85 !important;
}

.close-btn {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1000;
}

.title-overlay {
  position: fixed;
  top: 0;
  left: 5%;
  right: 5%;
}

.legend-overlay {
  position: fixed;
  bottom: 0;
  left: 5%;
  right: 5%;
}
</style>
