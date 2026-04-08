<template>
  <div>
    <div v-for="link in links" :key="link.url" class="mb-2">
      <a :href="link.url" :target="link.target || '_blank'" rel="noopener noreferrer">
        <img 
          v-if="link.imgSrc" 
          :src="link.imgSrc" 
          :alt="link.label"
          style="display: inline; height: 1rem; width: 1rem; margin-right: 10px; margin-left: 4px"
        />
        <v-icon v-else-if="link.icon" class="mr-2">{{ link.icon }}</v-icon>
        {{ link.label }}
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
