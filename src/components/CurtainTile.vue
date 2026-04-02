<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card 
      v-bind="hoverProps"
      :height="height"
      @click="handleClick"
    >
      <v-img 
        cover 
        :src="imgUrl" 
        height="100%"
        :gradient="gradient"
      >
        <div 
          class="curtain-content d-flex flex-column justify-center pa-5 text-white h-100"
          :class="isActive(isHovering) ? 'bg-primary' : ''" 
          :style="{
            transform: isActive(isHovering) ? '' : 'translateY(45%)',
            opacity: isActive(isHovering) ? 0.8 : 1,
          }"
        >
          <div class="text-center text-h5 font-weight-bold" v-html="title" />
          <div 
            v-if="content" 
            class="text-body-2" 
            :style="{ opacity: isActive(isHovering) ? 1 : 0 }" 
            v-html="content" 
          />
          <div 
            v-if="actionText" 
            class="text-caption font-weight-bold" 
            v-html="actionText" 
          />
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
const props = defineProps<{
  imgUrl: string
  title: string
  content?: string
  actionText?: string
  gradient?: string
  height?: string | number
  /** External active state (e.g., from viewport tracking in consumer) */
  active?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()

const isActive = (hovering: boolean) => hovering || props.active

const handleClick = () => {
  emit('click')
}
</script>

<script lang="ts">
export default {
  name: 'CurtainTile'
}
</script>

<style scoped>
.curtain-content {
  transition: all .5s ease;
}
</style>
