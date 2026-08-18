<script setup lang="ts">
const storyblokApi = useStoryblokApi()

const { data } = await useAsyncData('home-posts', () =>
  storyblokApi.get('cdn/stories', {
    starts_with: 'blog/',
    version: 'draft'
  })
)

const posts = computed(() => data.value?.data?.stories ?? [])
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>

    <p v-if="posts.length === 0" class="text-gray-500">暂无文章</p>

    <ul v-else class="space-y-6">
      <li v-for="post in posts" :key="post.uuid" class="border-b pb-4">
        <NuxtLink :to="`/blog/${post.slug}`" class="text-xl font-semibold hover:underline">
          {{ post.content.title }}
        </NuxtLink>
        <p class="text-gray-600 mt-1">{{ post.content.intro }}</p>
      </li>
    </ul>
  </main>
</template>
