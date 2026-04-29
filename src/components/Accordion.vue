<template>
  <div class="accordion-root" :aria-label="ariaLabel" role="region">
    <v-expansion-panels 
      v-model="panel" 
      variant="accordion" 
      :multiple="multiple" 
      class="accordion-panels"
    >
      <v-expansion-panel 
        v-for="(item, i) in items" 
        :id="'q' + (i + 1).toString()" 
        :key="i"
        :class="item.customClass"
        :aria-expanded="multiple ? (panel && panel.includes(i)) : panel === i"
        :aria-controls="'panel-content-' + i"
        @group:selected="onPanelChange(i, $event)"
      >
        <v-expansion-panel-title 
          class="accordion-title" 
          :class="{ 'has-bg-image': titleBackgroundImage }"
          :color="titleColor"
          :style="titleStyles"
        >
          <v-icon v-if="item.icon" class="mr-2">{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
          <span v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</span>
        </v-expansion-panel-title>
        
        <v-expansion-panel-text :id="'panel-content-' + i">
          <!-- Primary slot pattern - apps control rendering -->
          <slot :name="`panel-${i}`" :item="item" :index="i">
            <!-- Fallback: render item.content if it's a string -->
            <div v-if="typeof item.content === 'string'" v-html="item.content" />
          </slot>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

export interface AccordionItem {
  title: string
  content?: any
  icon?: string
  subtitle?: string
  customClass?: string
  open?: boolean
}

const props = defineProps({
  items: {
    type: Array as () => AccordionItem[],
    required: true
  },
  ariaLabel: {
    type: String,
    default: 'Accordion'
  },
  titleColor: {
    type: String,
    default: 'primary'
  },
  titleBackgroundImage: {
    type: String,
    default: ''
  },
  titleBackgroundColor: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  /** Optional route object for hash navigation (e.g., from useRoute()) */
  route: {
    type: Object,
    default: null
  }
})

const emit = defineEmits<{
  open: [index: number]
  close: [index: number]
}>()

// Compute title styles based on props
const titleStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.titleBackgroundImage) {
    styles.backgroundImage = `url(${props.titleBackgroundImage})`
  } else if (props.titleBackgroundColor) {
    styles.backgroundColor = props.titleBackgroundColor
  }
  
  return styles
})

// Initialize open panels based on item.open property
const openInitial: number[] = []
props.items.forEach((item, index) => {
  if (item.open) {
    openInitial.push(index)
  }
})

const panel = ref<number | number[]>(openInitial.length ? openInitial : [])

// Hash navigation support (optional, only if route is provided)
onMounted(async () => {
  if (props.route?.hash) {
    await new Promise(resolve => setTimeout(resolve, 100))
    window.scrollBy(0, -134)
  }
})

if (props.route) {
  watch(
    () => props.route.hash,
    (newHash) => { 
      panel.value = getIndex(newHash) 
    }
  )
}

function getIndex(hash: string): number | number[] {
  if (hash) {
    return parseInt(hash.slice(2)) - 1
  }
  return openInitial
}

function onPanelChange(idx: number, event: any) {
  if (event.value) {
    emit('open', idx)
  } else {
    emit('close', idx)
  }
}
</script>

<script lang="ts">
export default {
  name: 'Accordion'
}
</script>

<style scoped>
.accordion-root {
  position: relative;
  width: 100%;
  padding: 0;
}

.accordion-panels {
  background: transparent;
}

.v-expansion-panel:not(:first-child) {
  margin-top: 10px;
}

.v-expansion-panel {
  background: transparent;
}

.v-expansion-panel-text {
  background: #fff;
}

.accordion-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  position: relative;
}

.accordion-title.has-bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: right center;
}

/* Remove overlay opacity when background image is present */
.accordion-title.has-bg-image :deep(.v-expansion-panel-title__overlay) {
  opacity: 0;
}

.accordion-title :deep(.v-expansion-panel-title__overlay) {
  opacity: 0.5;
}

.accordion-title .subtitle {
  font-size: 0.9rem;
  font-weight: normal;
  margin-left: 1em;
  color: #ccc;
}
</style>
