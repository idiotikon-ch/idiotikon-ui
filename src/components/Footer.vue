<template>
  <v-container fluid class="footer pa-0">
    <!-- Upper footer -->
    <div class="upper-footer d-flex justify-center w-100">
      <v-card flat :max-width="maxWidth" :width="contentWidth">
        <v-row class="ma-0">
          <!-- Address column (always present) -->
          <v-col cols="12" sm="6" class="px-0">
            <slot name="address" />
          </v-col>

          <!-- Column 2 (optional) -->
          <v-col v-if="$slots.column2" cols="12" sm="6" class="px-0">
            <slot name="column2" />
          </v-col>
        </v-row>

        <v-row v-if="$slots.column3 || $slots.column4" class="ma-0">
          <!-- Column 3 (optional) -->
          <v-col v-if="$slots.column3" cols="12" sm="6" class="px-0">
            <slot name="column3" />
          </v-col>

          <!-- Column 4 (optional) -->
          <v-col v-if="$slots.column4" cols="12" sm="6" class="px-0">
            <slot name="column4" />
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- Lower footer -->
    <div class="lower-footer text-center w-100 py-2 px-4">
      <p class="mb-0">
        Copyright © {{ currentYear }}
        <template v-if="$slots.legal">
          <span> | </span>
          <slot name="legal" />
        </template>
      </p>
      <slot name="sponsor" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps({
  maxWidth: {
    type: [String, Number],
    default: '1150px'
  },
  contentWidth: {
    type: String,
    default: '70%'
  }
})

const currentYear = computed(() => new Date().getFullYear())
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

.upper-footer .v-card :deep(div) {
  font-size: 0.9rem;
  line-height: 1.1rem;
  margin-bottom: 1rem;
}

.upper-footer :deep(.header) {
  font-size: 1rem;
  font-weight: bold;
}

.upper-footer :deep(a) {
  color: inherit;
}

.lower-footer {
  background-color: #1c1d1f;
  color: #c4ced0;
}

.lower-footer :deep(a) {
  color: inherit;
}
</style>