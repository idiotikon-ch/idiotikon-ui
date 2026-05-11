<template>
  <div>
    <div v-if="address" class="d-flex align-start mb-2">
      <v-icon class="mr-2 mt-1" style="flex-shrink: 0;">{{ mdiMapMarkerOutline }}</v-icon>
      <span v-html="formatMultiline(address)" />
    </div>
    <div v-if="email" class="d-flex align-start mb-2">
      <v-icon class="mr-2 mt-1" style="flex-shrink: 0;">{{ mdiEmailOutline }}</v-icon>
      <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
    <div v-if="phone" class="d-flex align-start mb-2">
      <v-icon class="mr-2 mt-1" style="flex-shrink: 0;">{{ mdiPhoneOutline }}</v-icon>
      <span v-html="formatMultiline(phone)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiMapMarkerOutline, mdiEmailOutline, mdiPhoneOutline } from '@mdi/js'

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
