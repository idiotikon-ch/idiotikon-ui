<template>
  <v-container fluid class="footer pa-0 mt-auto">
    <!-- Upper footer -->
    <div v-if="!lowerOnly" class="upper-footer d-flex justify-center w-100 pb-4">
      <v-card flat :max-width="maxWidth" :width="contentWidth" class="pa-0">
        <v-row no-gutters v-if="hasFourthSlot" class="ma-0">
          <!-- 2x2 Grid layout when slot4 exists -->
          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="address">
              <p class="header">Adresse</p>
              <ContactInfo
                address="Schweizerisches Idiotikon\nAuf der Mauer 5\n8001 Zürich"
                email="info@idiotikon.ch"
                phone="+41 (0) 44 251 36 76"
                font-size="0.9rem"
                icon-size="1.2rem"
              />
            </slot>
          </v-col>

          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="social">
              <p class="header">Besuchen Sie uns auf Social Media</p>
              <SocialLinks :links="defaultSocialLinks" />
            </slot>
          </v-col>
        </v-row>

        <v-row no-gutters v-if="hasFourthSlot" class="ma-0">
          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="donations">
              <p class="header">Spenden</p>
              <p>
                80-9590-5 (IBAN: CH06 0900 0000 8000 9590 5)<br>
                <a href="https://idiotikon.ch/spenden">Spendenformular</a>
              </p>
            </slot>
          </v-col>

          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="column4" />
          </v-col>
        </v-row>

        <!-- 2-column layout when no slot4 (onch pattern) -->
        <v-row no-gutters v-if="!hasFourthSlot" class="ma-0">
          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="address">
              <p class="header">Adresse</p>
              <ContactInfo
                address="Schweizerisches Idiotikon\nAuf der Mauer 5\n8001 Zürich"
                email="info@idiotikon.ch"
                phone="+41 (0) 44 251 36 76"
              />
            </slot>

            <slot name="donations">
              <p class="header">Spenden</p>
              <p>
                80-9590-5 (IBAN: CH06 0900 0000 8000 9590 5)<br>
                <a href="https://idiotikon.ch/spenden">Spendenformular</a>
              </p>
            </slot>
          </v-col>

          <v-col cols="12" sm="6" class="mb-4 footer-content">
            <slot name="social">
              <p class="header">Besuchen Sie uns auf Social Media</p>
              <SocialLinks :links="defaultSocialLinks" />
            </slot>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- Lower footer -->
    <div class="lower-footer text-center w-100 py-2 px-4">
      <p class="mt-0 mb-2">
        Copyright © {{ currentYear }}
        <template v-if="$slots.legal">
          <span> | </span>
          <slot name="legal" />
        </template>
      </p>
      <slot name="sponsor">
        <a v-if="sagwLogo" href="https://www.sagw.ch/" target="_blank" rel="noopener noreferrer">
          <v-img height="100" :src="sagwLogo" />
        </a>
      </slot>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import ContactInfo from './ContactInfo.vue'
import SocialLinks from './SocialLinks.vue'
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiMastodon } from '@mdi/js'

const props = defineProps({
  maxWidth: {
    type: [String, Number],
    default: '1150px'
  },
  contentWidth: {
    type: String,
    default: '90%'
  },
  /** Path/URL to Bluesky logo image */
  blueskyLogo: {
    type: String,
    default: ''
  },
  /** Path/URL to SAGW logo image (renders default sponsor link if provided) */
  sagwLogo: {
    type: String,
    default: ''
  },
  lowerOnly: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()
const currentYear = computed(() => new Date().getFullYear())
const hasFourthSlot = computed(() => !!slots.column4)

const defaultSocialLinks = computed(() => {
  const links = [
    { url: 'https://www.facebook.com/Idiotikon/', label: 'Facebook', icon: mdiFacebook },
    { url: 'https://www.instagram.com/ch_idiotikon/', label: 'Instagram', icon: mdiInstagram },
    { url: 'https://www.linkedin.com/company/schweizerisches-idiotikon', label: 'LinkedIn', icon: mdiLinkedin },
    { url: 'https://swiss.social/@CH_Idiotikon', label: 'Mastodon', icon: mdiMastodon }
  ]
  
  // Add Bluesky with image if logo provided
  if (props.blueskyLogo) {
    links.unshift({
      url: 'https://bsky.app/profile/ch-idiotikon.bsky.social',
      label: 'Bluesky',
      imgSrc: props.blueskyLogo
    })
  }
  
  return links
})
</script>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  max-width: none !important;
}

.upper-footer,
.upper-footer .v-card {
  background-color: #272c31;
  color: #c4ced0;
}

/* Normalize typography & spacing inside upper footer column content */
:deep(.footer-content) {
  font-size: 0.9rem;
}

:deep(.footer-content > div),
:deep(.footer-content > p) {
  margin: 0 0 0.5rem;
  padding: 0;
}

/* Upper footer header layout */
.upper-footer :deep(.header) {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  padding: 0;
}

/* Footer link styling */
.upper-footer :deep(a),
.lower-footer :deep(a) {
  color: inherit;
}

.lower-footer {
  background-color: #1c1d1f;
  color: #c4ced0;
}
</style>