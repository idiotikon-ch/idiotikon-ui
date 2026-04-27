<template>
  <v-container v-bind="$attrs" class="idi-container">
    <slot />
  </v-container>
</template>

<script setup lang="ts">
// Passes through all v-container props via $attrs
defineOptions({
  inheritAttrs: false
})
</script>

<script lang="ts">
export default {
  name: 'IdiContainer'
}
</script>

<style scoped>
.idi-container {
  padding: 0;
}
</style>
