<template>
  <v-overlay class="align-center justify-center" v-model="overlay">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="{ ...props, ...$attrs }" variant="plain" :icon="mdiShareVariant"></v-btn>
    </template>
    <v-card class="white-border-tile teaser share-card">
      <v-card-title>
        <v-row no-gutters align="center">
          <v-col class="text-wrap" align-self="center"><v-icon :icon="mdiLink" /> {{ title }}</v-col>
          <v-col cols="auto">
            <v-btn variant="plain" @click="overlay = false" :icon="mdiClose" />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters align="center">
          <v-col class="text-wrap">
            <v-text-field readonly hide-details :value="url" class="mr-1"
              @focus="($event.target as HTMLInputElement).select()" />
          </v-col>
          <v-col cols="auto">
            <v-btn variant="plain" :icon="copiedTooltip ? mdiFileCheckOutline : mdiContentCopy" @click="copyUrl" />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-4">
          <v-col cols="12" class="text-center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;">
            <v-btn variant="plain" :href="whatsappUrl" target="_blank">
              <v-icon :icon="mdiWhatsapp" size="36" />
            </v-btn>
            <v-btn variant="plain" :href="facebookUrl" target="_blank">
              <v-icon :icon="mdiFacebook" size="36" />
            </v-btn>
            <v-btn variant="plain" :href="mastodonUrl" target="_blank">
              <v-icon :icon="mdiMastodon" size="36" />
            </v-btn>
            <v-btn variant="plain" :href="emailUrl" target="_blank">
              <v-icon :icon="mdiEmail" size="36" />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  mdiShareVariant,
  mdiContentCopy,
  mdiWhatsapp,
  mdiFacebook,
  mdiEmail,
  mdiClose,
  mdiLink,
  mdiMastodon,
  mdiFileCheckOutline,
} from '@mdi/js'

const props = defineProps({
  /** Base URL of the app (e.g. 'https://example.com') */
  baseUrl: {
    type: String,
    default: ''
  },
  /** Dialog title */
  title: {
    type: String,
    default: 'Permalink/URI teilen'
  }
})

const route = useRoute()
const overlay = ref(false)
const copiedTooltip = ref(false)

const url = computed(() => props.baseUrl + route.fullPath)
const encodedUrl = computed(() => encodeURIComponent(url.value))

const whatsappUrl = computed(() => `https://wa.me/?text=${encodedUrl.value}`)
const facebookUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`)
const mastodonUrl = computed(() => `https://mastodonshare.com/?url=${encodedUrl.value}`)
const emailUrl = computed(() => `mailto:?body=${encodedUrl.value}`)

async function copyUrl() {
  await navigator.clipboard.writeText(url.value)
  copiedTooltip.value = true
  setTimeout(() => (copiedTooltip.value = false), 1000)
}
</script>

<script lang="ts">
export default {
  name: 'ShareBtn'
}
</script>

<style scoped>
.share-card {
  width: min(90vw, 400px);
  min-width: 280px;
}
</style>

