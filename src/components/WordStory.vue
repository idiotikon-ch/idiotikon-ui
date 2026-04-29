<template>
    <!-- Standard view (for overview pages) -->
    <v-card v-if="type === 'standard'" border class="mb-4">
        <v-card-title class="text-wrap">
            <a :href="`/wortgeschichten/${story.slug}`" style="text-decoration: none; color: inherit;">
                {{ story.title }}
            </a>
        </v-card-title>

        <v-card-subtitle class="text-wrap">
            <span v-if="story.author">{{ story.author }} · </span>
            <span>{{ formatDate(story.date) }}</span>
        </v-card-subtitle>

        <v-row>
            <v-col v-if="story.image" cols="12" sm="6" md="4">
                <v-img :src="story.image" cover style="cursor: pointer"
                    @click="$router.push(`/wortgeschichten/${story.slug}`)" />
            </v-col>
            <v-col v-if="smAndUp && story.teaser" cols="12" :sm="story.image ? 6 : 12" :md="story.image ? 8 : 12">
                <v-card-text>
                    {{ story.teaser }}
                </v-card-text>
                <v-card-actions>
                    <v-btn :to="`/wortgeschichten/${story.slug}`" class="read-more">Weiterlesen</v-btn>
                </v-card-actions>
            </v-col>
        </v-row>

        <v-row v-if="story.categories && story.categories.length">
            <v-col v-for="tag in story.categories" :key="tag" cols="auto">
                <v-chip size="small" variant="outlined">#{{ tag }}</v-chip>
            </v-col>
        </v-row>
    </v-card>

    <!-- Teaser view (for HomePage tiles) -->
    <v-card v-else-if="type === 'teaser'" border class="teaser-card"
        @click="$router.push(`/wortgeschichten/${story.slug}`)" style="cursor: pointer;">
        <v-card-title class="text-wrap">
            {{ story.title }}
        </v-card-title>

        <v-card-subtitle class="text-wrap">
            {{ formatDate(story.date) }}
        </v-card-subtitle>

        <v-row v-if="mdAndUp && story.image">
            <v-col cols="6" lg="8">
                <v-card-text v-if="story.teaser">
                    {{ story.teaser }}
                </v-card-text>
            </v-col>
            <v-col cols="6" lg="4">
                <v-img :src="story.image" cover height="100%" />
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-img v-if="story.image" :src="story.image" cover />
                <v-card-text v-if="story.teaser">
                    {{ story.teaser }}
                </v-card-text>
            </v-col>
        </v-row>

        <v-card-actions>
            <span class="text-primary read-more-link">Weiterlesen</span>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const props = defineProps<{
    story: {
        id: number
        title: string
        date: string
        teaser?: string
        content?: string
        image?: string
        author?: string
        categories?: string[]
        slug: string
    }
    type?: 'standard' | 'teaser'
}>()

const { smAndUp, mdAndUp } = useDisplay()

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
</script>

<script lang="ts">
export default {
    name: 'WordStory'
}
</script>

<style scoped>
.teaser-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.read-more-link {
    font-weight: 500;
}
</style>
