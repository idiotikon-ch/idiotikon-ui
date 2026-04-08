<template>
  <div>
    <div v-for="link in links" :key="link.url" class="mb-2">
      <a :href="link.url" :target="link.target || '_blank'" rel="noopener noreferrer">
        <v-img 
          v-if="link.imgSrc" 
          :src="link.imgSrc" 
          :alt="link.label"
          class="d-inline-block mr-2"
          height="16"
          width="16"
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
