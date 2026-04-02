<template>
  <!-- Group with children -->
  <v-list-group
    v-if="item.sub_menus && item.sub_menus.length"
    :value="item.id || item.title"
  >
    <template #activator="{ props }">
      <v-list-item v-bind="props" :title="item.title">
        <template v-if="item.icon" #prepend>
          <v-icon>{{ iconMap[item.icon] || item.icon }}</v-icon>
        </template>
      </v-list-item>
    </template>

    <NavItems
      v-for="child in item.sub_menus"
      :key="child.id || child.title"
      :item="child"
      :icon-map="iconMap"
    />
  </v-list-group>

  <!-- Single item with link -->
  <v-list-item
    v-else
    :title="item.title"
    :to="item.link && !isExternalLink(item.link) ? item.link : undefined"
    :href="item.link && isExternalLink(item.link) ? item.link : undefined"
    :target="item.link && isExternalLink(item.link) ? '_blank' : undefined"
  >
    <template v-if="item.icon" #prepend>
      <v-icon>{{ iconMap[item.icon] || item.icon }}</v-icon>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  },
  iconMap: {
    type: Object,
    default: () => ({})
  }
})

function isExternalLink(link: string): boolean {
  return typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'))
}
</script>

<script lang="ts">
export default {
  name: 'NavItems'
}
</script>
