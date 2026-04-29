<template>
  <v-card 
    :class="['general-tile', tileClass]"
    :hover="isClickable"
    @click="handleClick"
  >
    <v-card-title v-if="title" class="text-h5">
      <slot name="title">
        <span v-html="title" />
      </slot>
    </v-card-title>

    <v-img 
      v-if="imageUrl" 
      :src="imageUrl" 
      cover 
      class="tile-image"
    />

    <v-card-text v-if="content || $slots.content" class="tile-body">
      <slot name="content">
        <div v-html="content" />
      </slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
  }
})

const emit = defineEmits<{
  click: [link: string, target: string]
}>()

const isClickable = computed(() => {
  return !!props.link && props.linkTarget !== 'image'
})

function handleClick() {
  if (isClickable.value) {
    emit('click', props.link, props.linkTarget)
    
    // Default navigation behavior if parent doesn't handle
    if (props.linkTarget === '_blank') {
      window.open(props.link, '_blank')
    } else {
      // Parent app should handle internal routing
    }
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

.tile-image {
  /* Image sizing handled by v-img cover prop */
}

.tile-body {
  /* Content area - apps can style via slots */
}
</style>
