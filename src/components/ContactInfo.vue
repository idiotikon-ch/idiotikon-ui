<template>
  <!-- Plain mode: simple paragraphs (for legal pages) -->
  <div v-if="plain">
    <p v-if="address" v-html="formatMultiline(address)" />
    <p>
      <template v-if="phone">{{ labels.phone }} {{ phone }}</template>
      <template v-if="phone && email"><br></template>
      <template v-if="email">{{ labels.email }} <a :href="`mailto:${email}`">{{ email }}</a></template>
      <template v-if="(phone || email) && website"><br></template>
      <template v-if="website">{{ labels.website }} <a :href="website">{{ website }}</a></template>
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
import { computed } from 'vue'
import { mdiMapMarkerOutline, mdiEmailOutline, mdiPhoneOutline } from '@mdi/js'
import { useIdiTranslate } from '../locale'

const props = defineProps<{
  address?: string
  email?: string
  phone?: string
  website?: string
  plain?: boolean
  /** Plain-mode label before the phone number, including the colon */
  phoneLabel?: string
  /** Plain-mode label before the e-mail address, including the colon */
  emailLabel?: string
  /** Plain-mode label before the website, including the colon */
  websiteLabel?: string
}>()

const t = useIdiTranslate()
const labels = computed(() => ({
  phone: props.phoneLabel ?? t('contactInfo.phone'),
  email: props.emailLabel ?? t('contactInfo.email'),
  website: props.websiteLabel ?? t('contactInfo.website'),
}))

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