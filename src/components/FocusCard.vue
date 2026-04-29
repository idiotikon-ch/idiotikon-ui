<template>
  <v-card :class="['focus-card', { clickable: link || hover }]" v-bind="cardProps">
    <slot />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  link: Boolean,
  hover: Boolean,
  to: String,
  href: String,
  // Pass through any other v-card props
})

const cardProps = computed(() => {
  const { link, hover, ...rest } = props
  return {
    ...rest,
    flat: true,
    link: link || !!props.to || !!props.href,
    hover: hover || link || !!props.to || !!props.href
  }
})
</script>

<script lang="ts">
export default {
  name: 'FocusCard'
}
</script>

<style scoped>
.focus-card {
  /* Uniform padding on the card container */
  padding: 1.5rem;
}

/* Remove padding from direct children to maintain uniform edge distance */
.focus-card :deep(> .v-card-title),
.focus-card :deep(> .v-card-subtitle),
.focus-card :deep(> .v-card-text),
.focus-card :deep(> .v-card-actions),
.focus-card :deep(> .v-card-item),
.focus-card :deep(> .v-list) {
  padding-left: 0;
  padding-right: 0;
}

/* v-card-item gets padding-top/bottom too when title passed as prop */
.focus-card :deep(> .v-card-item) {
  padding-top: 0;
  padding-bottom: 0;
}

/* Remove margins from direct v-row child */
.focus-card :deep(> .v-row) {
  margin: 0;
}

/* Direct child title - larger, bolder, more bottom padding */
.focus-card :deep(> .v-card-title),
.focus-card :deep(.v-card-title:first-of-type) {
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: normal;
  padding-top: 0;
  padding-bottom: 1.5rem;
}

.focus-card :deep(> .v-card-subtitle),
.focus-card :deep(.v-card-subtitle:first-of-type) {
  padding: 0 0 2rem 0;
  hyphens: none;
}

/* Direct list - remove padding */
.focus-card :deep(> .v-list) {
  padding-top: 0;
  padding-bottom: 0;
}

/* Direct actions - remove padding */
.focus-card :deep(> .v-card-actions) {
  padding-top: 1rem;
  padding-bottom: 0;
}

/* Card text and paragraphs */
.focus-card :deep(.v-card-text) {
  color: #454545;
  font-size: 1rem;
}

.focus-card :deep(p) {
  color: #454545;
}

/* Cards inside list - remove all margins but add vertical spacing */
.focus-card :deep(> .v-list .v-card) {
  margin: 0 0 1rem 0;
}

.focus-card :deep(> .v-list .v-card:last-child) {
  margin-bottom: 0;
}

/* Clickable/hoverable cards in list */
.focus-card :deep(> .v-list .v-card[link]),
.focus-card :deep(> .v-list .v-card.v-card--link) {
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
}

.focus-card :deep(> .v-list .v-card[link]:hover),
.focus-card :deep(> .v-list .v-card.v-card--link:hover) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Nested cards within focus - h5 size for titles */
.focus-card :deep(.v-card .v-card-title) {
  font-size: 1.25rem;
  line-height: 1.375;
  letter-spacing: normal;
  padding-bottom: 6px;
}

.focus-card :deep(.v-card .v-card-subtitle) {
  font-size: 1rem;
  padding-bottom: 0;
}

.focus-card :deep(.v-card .v-card-text) {
  padding-top: 6px;
}

/* List items within focus */
.focus-card :deep(.v-list-item) {
  padding: 1rem 0;
}
</style>
