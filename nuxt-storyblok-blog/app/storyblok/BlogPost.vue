<script setup lang="ts">
defineProps<{ blok: any }>()
</script>

<template>
  <article v-editable="blok" class="space-y-4">
    <h1 class="text-3xl font-bold">{{ blok.title }}</h1>
    <p class="text-gray-500 text-sm">{{ blok.date }}</p>
    <p class="text-gray-600">{{ blok.intro }}</p>
    <img v-if="blok.image" :src="blok.image.filename" :alt="blok.image.alt" class="rounded" />
    <div class="prose">
      <StoryblokRichText :document="blok.content" />
    </div>
  </article>
</template>
