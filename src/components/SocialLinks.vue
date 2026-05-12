<template>
  <div>
    <div v-for="link in links" :key="link.url" class="mb-2">
      <a
        :href="link.url"
        :target="link.target || '_blank'"
        rel="noopener noreferrer"
        class="social-link__anchor"
      >
        <span class="social-link__icon">
          <img
            v-if="link.imgSrc"
            :src="link.imgSrc"
            :alt="link.label"
            style="height: 1.1rem; width: 1.1rem; margin-right: 10px; margin-left: 2px; vertical-align: bottom;"
          />
          <v-icon v-else-if="link.icon" class="mr-2">{{ link.icon }}</v-icon>
        </span>
        <span class="social-link__label">{{ link.label }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  links: Array<{
    url: string
    label: string
    icon?: string
    imgSrc?: string
    target?: string
  }>
}>()
</script>

<script lang="ts">
export default {
  name: 'SocialLinks'
}
</script>

<style scoped>
/* Whole anchor is clickable but only the label has the underline */
.social-link__anchor {
  text-decoration: none;
}

.social-link__label {
  text-decoration: underline;
}
</style>

