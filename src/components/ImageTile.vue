<template>
  <div class="image-tile" :style="{ width: widthValue }">
    <v-hover v-slot="{ isHovering, props: hoverProps }">
      <v-card
        v-bind="hoverProps"
        class="image-tile-card"
        @click="handleClick"
      >
        <v-img
          :src="image.src"
          :alt="image.alt || image.title || ''"
          cover
          :aspect-ratio="aspectRatio"
        >
          <!-- Magnify button on hover -->
          <v-btn
            v-show="isHovering"
            :icon="mdiMagnifyScan"
            color="black"
            variant="flat"
            class="magnify-btn"
            :style="{ opacity: 0.6 }"
          />
        </v-img>
      </v-card>
    </v-hover>

    <!-- Optional caption -->
    <div v-if="caption || image.caption" class="image-tile-caption text-center text-caption text-grey-darken-1 mt-2">
      {{ caption || image.caption }}
    </div>

    <!-- Integrated ImageViewer (enabled by default) -->
    <ImageViewer
      v-if="!disableViewer"
      v-model="viewerOpen"
      :images="viewerImages"
      :start-index="currentIndex"
      :compact-legend="compactLegend"
      :scrim="scrim"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mdiMagnifyScan } from '@mdi/js'
import ImageViewer from './ImageViewer.vue'
import type { ImageViewerImage } from './ImageViewer.vue'

const props = defineProps({
  /** Image object with src, title, alt, legend, description, caption */
  image: {
    type: Object as () => ImageViewerImage & { caption?: string },
    required: true
  },
  /** Optional array of images for gallery context (defaults to single image) */
  images: {
    type: Array as () => (ImageViewerImage & { caption?: string })[],
    default: undefined
  },
  /** Optional caption below image (overrides image.caption) */
  caption: {
    type: String,
    default: ''
  },
  /** Width of tile (CSS value: '100%', '50%', '300px', etc.) */
  width: {
    type: String,
    default: '100%'
  },
  /** Image aspect ratio */
  aspectRatio: {
    type: [Number, String],
    default: undefined
  },
  /** Disable integrated ImageViewer (use for custom click handling) */
  disableViewer: {
    type: Boolean,
    default: false
  },
  /** Use compact legend layout in viewer */
  compactLegend: {
    type: Boolean,
    default: false
  },
  /** Viewer scrim opacity */
  scrim: {
    type: [String, Number],
    default: 0.85
  }
})

const emit = defineEmits<{
  click: [image: ImageViewerImage, index: number]
}>()

const viewerOpen = ref(false)

const widthValue = computed(() => props.width)

// Use provided images array or create single-image array
const viewerImages = computed(() => {
  return props.images || [props.image]
})

// Find index of current image in the images array
const currentIndex = computed(() => {
  if (!props.images) return 0
  return props.images.findIndex(img => img.src === props.image.src)
})

const handleClick = () => {
  if (props.disableViewer) {
    // Emit click event for custom handling
    emit('click', props.image, currentIndex.value)
  } else {
    // Open integrated viewer
    viewerOpen.value = true
  }
}
</script>

<script lang="ts">
export default {
  name: 'ImageTile'
}
</script>

<style scoped>
.image-tile {
  display: flex;
  flex-direction: column;
}

.image-tile-card {
  position: relative;
  cursor: pointer;
}

.magnify-btn {
  position: absolute;
  bottom: 10%;
  right: 10%;
  z-index: 2;
}

.image-tile-caption {
  font-style: italic;
}
</style>
