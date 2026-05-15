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
