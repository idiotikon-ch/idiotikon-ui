<template>
  <div>
    <div v-if="address" class="d-flex align-start mb-2">
      <v-icon class="mr-2">{{ mdiMapMarker }}</v-icon>
      <div v-html="formatMultiline(address)" />
    </div>
    <div v-if="email" class="d-flex align-start mb-2">
      <v-icon class="mr-2">{{ mdiEmail }}</v-icon>
      <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
    <div v-if="phone" class="d-flex align-start mb-2">
      <v-icon class="mr-2">{{ mdiPhone }}</v-icon>
      <div v-html="formatMultiline(phone)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiMapMarker, mdiEmail, mdiPhone } from '@mdi/js'

defineProps<{
  address?: string
  email?: string
  phone?: string
}>()

function formatMultiline(str?: string) {
  if (!str) return ''
  return str.replace(/\\n|\n/g, '<br>')
}
</script>

<script lang="ts">
export default {
  name: 'ContactInfo'
}
</script>
