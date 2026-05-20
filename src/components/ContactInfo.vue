<template>
  <!-- Plain mode: simple paragraphs (for legal pages) -->
  <div v-if="plain">
    <p v-if="address" v-html="formatMultiline(address)" />
    <p>
      <template v-if="phone">Tel.: {{ phone }}</template>
      <template v-if="phone && email"><br></template>
      <template v-if="email">E-Mail: <a :href="`mailto:${email}`">{{ email }}</a></template>
      <template v-if="(phone || email) && website"><br></template>
      <template v-if="website">Website: <a :href="website">{{ website }}</a></template>
    </p>
  </div>

  <!-- Default mode: with icons -->
  <div v-else>
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
  website?: string
  plain?: boolean
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