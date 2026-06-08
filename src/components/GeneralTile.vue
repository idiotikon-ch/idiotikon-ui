<template>
  <v-card 
    :class="['general-tile', tileClass]"
    :href="isClickable ? link : undefined"
    :to="isInternalLink ? link : undefined"
    :target="linkTarget !== '_self' ? linkTarget : undefined"
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
    <ImageTile v-if="imageUrl && imageViewer" :image="{ src: imageUrl }" class="tile-image" />

    <!-- Plain image mode -->
    <v-img v-else-if="imageUrl" :src="imageUrl" cover class="tile-image" />

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
  link: {
    type: String,
    default: ''
  },
  linkTarget: {
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
  }
})

const emit = defineEmits<{
  click: [link: string, target: string]
}>()

const isClickable = computed(() => {
  return !!props.link && props.linkTarget !== 'image'
})

const isInternalLink = computed(() => {
  return isClickable.value && props.link.startsWith('/') && props.linkTarget !== '_blank'
})

function handleClick() {
  if (isClickable.value) {
    emit('click', props.link, props.linkTarget)
  }
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
