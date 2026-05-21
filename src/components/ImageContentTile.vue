<template>
  <v-card class="d-flex flex-column w-100 content-tile" :href="href" :target="target" :to="to"
          @click="$emit('click')">
    <slot name="image">
      <v-img v-if="imageUrl" :src="imageUrl" cover :height="imageHeight" />
    </slot>
    <div class="d-flex flex-column flex-grow-1 content-tile-body">
      <v-card-item>
        <slot name="title">
          <v-card-title v-if="title" class="text-wrap" :class="titleClass">
            <span v-html="title" />
          </v-card-title>
        </slot>
        <slot name="subtitle">
          <v-card-subtitle v-if="subtitle" class="text-wrap">
            <span v-html="subtitle" />
          </v-card-subtitle>
        </slot>
        <slot name="text">
          <v-card-text v-if="text">
            <span v-html="text" />
          </v-card-text>
        </slot>
      </v-card-item>
      <slot name="link">
        <v-card-actions v-if="linkAction" class="mt-auto">
          <span class="link-style">
            {{ linkAction }}
          </span>
        </v-card-actions>
      </slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  imageUrl: { type: String, default: '' },
  imageHeight: { type: [String, Number], default: undefined },
  title: { type: String, default: '' },
  titleClass: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  text: { type: String, default: '' },
  linkAction: { type: String, default: '' },
  href: { type: String, default: undefined },
  target: { type: String, default: undefined },
  to: { type: String, default: undefined },
})

defineEmits(['click'])
</script>

<script lang="ts">
export default {
  name: 'ImageContentTile'
}
</script>