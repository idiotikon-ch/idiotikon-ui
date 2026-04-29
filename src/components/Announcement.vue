<template>
  <!-- Detail View -->
  <v-card v-if="!teaserOnly">
    <v-card-actions v-if="backLink">
      <v-btn @click="$emit('back')">
        {{ backText }}
      </v-btn>
    </v-card-actions>

    <v-card-title :class="detailView ? 'text-h3' : 'text-h5'">
      <a v-if="url" :href="url" @click.prevent="handleTitleClick">
        {{ title }}
      </a>
      <span v-else>{{ title }}</span>
    </v-card-title>

    <v-card-subtitle v-if="date">
      {{ date }}
    </v-card-subtitle>

    <v-row>
      <v-col :cols="imgUrl ? 12 : 12" :sm="imgUrl ? 6 : 12" :md="imgUrl ? 8 : 12">
        <v-card-text>
          <slot name="content">
            <div v-html="content" />
          </slot>
        </v-card-text>
      </v-col>
      <v-col v-if="imgUrl" cols="12" sm="6" md="4">
        <v-img :src="imgUrl" cover />
      </v-col>
    </v-row>
  </v-card>

  <!-- Teaser View -->
  <v-card 
    v-else 
    :href="url || undefined" 
    :link="!!url" 
    :hover="!!url" 
    @click="handleCardClick"
    class="announcement-card"
  >
    <v-card-title class="text-h5">
      {{ title }}
    </v-card-title>

    <v-card-subtitle v-if="date">
      {{ date }}
    </v-card-subtitle>

    <v-img v-if="imgUrl" :src="imgUrl" cover />

    <v-card-text v-if="teaserText">
      <div v-html="teaserText"></div>
    </v-card-text>

    <v-card-actions v-if="readMoreText">
      <span class="text-primary read-more-link">{{ readMoreText }}</span>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
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
    default: 'Back to overview'
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

function handleCardClick() {
  if (props.url) {
    emit('click', props.url)
  }
}

function handleTitleClick() {
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

<style scoped>
.read-more-link {
  text-decoration: underline;
}

.announcement-card {
  border: 2px solid white;
}
</style>
