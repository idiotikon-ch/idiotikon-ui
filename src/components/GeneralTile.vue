<template>
  <v-card
    :class="['general-tile', tileClass]"
    :to="to"
    :href="href"
    :target="target"
    :hover="isClickable"
    :ripple="isClickable"
    @click="handleClick"
  >
    <v-card-title v-if="title || $slots.title" class="text-h5">
      <slot name="title">
        <span v-html="title" />
      </slot>
    </v-card-title>

    <!-- Image viewer mode: clicking image opens fullscreen -->
    <ImageTile v-if="imageUrl && imageViewer" :image="{ src: imageUrl }" class="mt-tile-image" @click.stop="onImageClick" />

    <!-- Plain image mode -->
    <v-img v-else-if="imageUrl" :src="imageUrl" cover class="mt-tile-image" />

    <v-card-text v-if="content || $slots.content" class="tile-body text-body-large cms-content">
      <slot name="content">
        <div v-html="content" />
      </slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ImageTile from './ImageTile.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: undefined
  },
  href: {
    type: String,
    default: undefined
  },
  target: {
    type: String,
    default: '_self'
  },
  tileClass: {
    type: String,
    default: 'sidebar tile-card'
  },
  imageViewer: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['click', 'image-click'])

const isClickable = computed(() => !!(props.to || props.href) && !props.imageViewer)

function handleClick() {
  if (isClickable.value) {
    emit('click', props.to ?? props.href, props.target)
  }
}

function onImageClick(e: MouseEvent) {
  emit('image-click', e)
}
</script>

<script lang="ts">
export default {
  name: 'GeneralTile'
}
</script>

<style scoped>
.general-tile {
  cursor: pointer;
}

.general-tile:not(.v-card--hover) {
  cursor: default;
}
</style>
