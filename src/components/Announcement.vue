<template>
  <!-- Detail View: FocusCard -->
  <FocusCard v-if="!teaserOnly && detailView">
    <v-btn v-if="backLink" @click="$emit('back')" class="top-btn">
      {{ backText }}
    </v-btn>
    <AnnouncementBody :title-class="'text-h3'" v-bind="sharedProps">
      <template #content><slot name="content"><div v-html="content" /></slot></template>
    </AnnouncementBody>
  </FocusCard>

  <!-- List View: White Border Tile -->
  <v-card v-else-if="!teaserOnly" class="preview-tile">
    <AnnouncementBody :title-class="'text-h5'" v-bind="sharedProps">
      <template #content><slot name="content"><div v-html="content" /></slot></template>
    </AnnouncementBody>
  </v-card>

  <!-- Teaser View -->
  <v-card
    v-else
    :to="isInternalUrl ? url : undefined"
    :href="!isInternalUrl && url ? url : undefined"
    :link="!!url"
    @click="handleCardClick"
    class="preview-tile teaser"
  >
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="date">{{ date }}</v-card-subtitle>
    <v-img v-if="imgUrl" :src="imgUrl" cover />
    <v-card-text v-if="teaserText">
      <div v-html="teaserText"></div>
    </v-card-text>
    <v-card-actions v-if="readMoreText">
      <span class="link-style">{{ readMoreText }}</span>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import FocusCard from './FocusCard.vue'
import AnnouncementBody from './AnnouncementBody.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  imgUrl: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  teaserOnly: {
    type: Boolean,
    default: false
  },
  teaserText: {
    type: String,
    default: ''
  },
  detailView: {
    type: Boolean,
    default: false
  },
  backLink: {
    type: Boolean,
    default: false
  },
  backText: {
    type: String,
    default: 'Zurück zur Übersicht'
  },
  titleLink: {
    type: Boolean,
    default: true
  },
  readMoreText: {
    type: String,
    default: 'Weiterlesen'
  }
})

const emit = defineEmits<{
  click: [url?: string]
  back: []
  'title-click': [url: string]
}>()

// Check if URL is internal (starts with /)
const isInternalUrl = computed(() => {
  return props.url && props.url.startsWith('/')
})

const sharedProps = computed(() => ({
  title: props.title,
  date: props.date,
  imgUrl: props.imgUrl,
  url: props.url,
  titleLink: props.titleLink,
  onTitleClick: handleTitleClick,
}))

function handleCardClick() {
  if (props.url) {
    emit('click', props.url)
  }
}

function handleTitleClick(event: MouseEvent) {
  // Allow ctrl/meta/middle-click to open in new tab natively
  if (event.ctrlKey || event.metaKey || event.button === 1) {
    return
  }
  event.preventDefault()
  if (props.url) {
    emit('title-click', props.url)
  }
}
</script>

<script lang="ts">
export default {
  name: 'Announcement'
}
</script>
