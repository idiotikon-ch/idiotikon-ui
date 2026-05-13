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
/* ===========================================
   BASE - container padding
   =========================================== */
.focus-card {
  padding: 1.5rem;
}

/* ===========================================
   DIRECT CHILDREN - reset padding/margins
   to maintain uniform edge distance
   =========================================== */
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

/* Tabs: v-card-text inside tabs is still top-level FocusCard content */
.focus-card :deep(> .v-tabs-window .v-tabs-window-item > .v-card-text),
.focus-card :deep(> .v-tabs-window .v-tabs-window-item > .v-card-title) {
  padding-left: 0;
  padding-right: 0;
}

/* ===========================================
   TITLE & SUBTITLE - top-level sizing
   =========================================== */

/* Main title: h3-sized, generous bottom spacing */
.focus-card :deep(> .v-card-title),
.focus-card :deep(.v-card-title:first-of-type) {
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.25;
  padding-top: 0;
  padding-bottom: 2rem;
}

/* Main subtitle */
.focus-card :deep(> .v-card-subtitle),
.focus-card :deep(.v-card-subtitle:first-of-type) {
  padding: 0 0 2rem 0;
  hyphens: none;
}

/* ===========================================
   LINKS - underline in content, plain in titles
   =========================================== */

/* Title links: no underline */
.focus-card :deep(.v-card-title a) {
  text-decoration: none;
}

/* Content links: underlined, primary color */
.focus-card :deep(p a),
.focus-card :deep(.v-card-text a),
.focus-card :deep(.content-section a) {
  text-decoration: underline;
  color: rgb(var(--v-theme-primary));
}

/* ===========================================
   CONTENT TEXT - color and paragraph spacing
   =========================================== */
.focus-card :deep(.v-card-text) {
  color: #454545;
  font-size: 1rem;
}

.focus-card :deep(p) {
  color: #454545;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 0.5rem;
}

/* ===========================================
   NESTED CARDS - spacing, title sizing
   =========================================== */

/* Direct child cards: bottom-only margin */
.focus-card :deep(> .v-card) {
  margin: 0 0 1.5rem 0;
}

.focus-card :deep(> .v-card:last-child) {
  margin-bottom: 0;
}

/* Nested card titles: h5-sized, medium weight */
.focus-card :deep(.v-card .v-card-title) {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: .0125em;
  padding-bottom: 6px;
}

.focus-card :deep(.v-card .v-card-subtitle) {
  font-size: 1rem;
  padding-bottom: 0;
}

.focus-card :deep(.v-card .v-card-text) {
  padding-top: 6px;
}

/* ===========================================
   LISTS - cards inside v-list
   =========================================== */

/* Direct list - remove padding */
.focus-card :deep(> .v-list) {
  padding-top: 0;
  padding-bottom: 0;
}

/* Cards inside list - remove all margins but add vertical spacing */
.focus-card :deep(> .v-list .v-card) {
  margin: 0 0 1rem 0;
}

.focus-card :deep(> .v-list .v-card:last-child) {
  margin-bottom: 0;
}

/* Clickable cards in list: pointer + hover shadow */
.focus-card :deep(> .v-list .v-card[link]),
.focus-card :deep(> .v-list .v-card.v-card--link) {
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
}

.focus-card :deep(> .v-list .v-card[link]:hover),
.focus-card :deep(> .v-list .v-card.v-card--link:hover) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.focus-card :deep(.v-list-item) {
  padding: 1rem 0;
}

/* ===========================================
   BUTTONS & ACTIONS
   =========================================== */

/* Direct v-btn: spaced below content (flagship pattern) */
.focus-card :deep(> .v-btn) {
  margin-top: 1rem;
}

/* No top margin when button is first child or marked .top-btn */
.focus-card :deep(> .v-btn:first-child),
.focus-card :deep(> .v-btn.top-btn) {
  margin-top: 0;
}

/* v-card-actions: flush left & make buttons behave like direct children */
.focus-card :deep(> .v-card-actions) {
  padding: 1rem 0 0 0;
}

.focus-card :deep(> .v-card-actions .v-btn) {
  margin: 0;
  padding-left: 0;
}
</style>
