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
    :class="isActiveRoute ? 'active_nav_item' : ''"
  >
    <template v-if="item.icon" #prepend>
      <v-icon>{{ iconMap[item.icon] || item.icon }}</v-icon>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  iconMap: {
    type: Object,
    default: () => ({})
  }
})

const route = useRoute()

const isActiveRoute = computed(() => {
  if (!props.item.link || isExternalLink(props.item.link)) {
    return false
  }
  return route.fullPath === props.item.link
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

<style scoped>
/* First-level nested items (direct children of list groups) */
.v-list-group__items .v-list-item {
  padding-inline-start: 72px;
  background-color: #e4e4e452;
}

/* Second-level nested items (children of children) */
.v-list-group__items .v-list-group__items .v-list-item {
  padding-inline-start: 85px;
  background-color: #e4e4e4f6;
}

/* Active navigation item at root level */
.v-list-item.active_nav_item {
  background-color: #cdcdcd;
}

/* Active navigation item at first nesting level */
.v-list-group__items .v-list-item.active_nav_item {
  background-color: #cdcdcd;
}

/* Active navigation item at second nesting level */
.v-list-group__items .v-list-group__items .v-list-item.active_nav_item {
  background-color: #cdcdcd;
}
</style>
