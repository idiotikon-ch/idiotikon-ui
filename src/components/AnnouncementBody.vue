<template>
  <v-card-title :class="titleClass">
    <a v-if="url && titleLink" :href="url" @click="$emit('title-click', $event)">
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
        <slot name="content" />
      </v-card-text>
    </v-col>
    <v-col v-if="imgUrl" cols="12" sm="6" md="4">
      <v-img :src="imgUrl" cover />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
  titleClass: { type: String, default: '' },
  date: { type: String, default: '' },
  imgUrl: { type: String, default: '' },
  url: { type: String, default: '' },
  titleLink: { type: Boolean, default: true },
})

defineEmits<{
  'title-click': [event: MouseEvent]
}>()
</script>

<script lang="ts">
export default {
  name: 'AnnouncementBody'
}
</script>

