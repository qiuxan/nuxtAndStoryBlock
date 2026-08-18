<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { story } = await useAsyncStoryblok(`blog/${slug}`, {
  api: { version: 'draft' }
})

if (!story.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-10">
    <StoryblokComponent :blok="story.content" />
  </main>
</template>
