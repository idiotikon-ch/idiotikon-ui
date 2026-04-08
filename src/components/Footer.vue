<template>
  <v-container :fluid="fluid" :class="containerClass">
    <!-- Upper footer with main content -->
    <v-card :flat="flat" :max-width="maxWidth" class="mx-auto">
      <slot name="content">
        <v-row>
          <slot name="sections" />
        </v-row>
      </slot>
    </v-card>

    <!-- Lower footer with copyright/legal -->
    <div v-if="$slots.lower" class="mt-4">
      <slot name="lower" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  fluid: {
    type: Boolean,
    default: false
  },
  flat: {
    type: Boolean,
    default: true
  },
  maxWidth: {
    type: [String, Number],
    default: '1150px'
  },
  containerClass: {
    type: String,
    default: ''
  }
})
</script>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>
