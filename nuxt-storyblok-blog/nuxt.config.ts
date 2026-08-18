// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    https: true,
  },
  modules: ["@storyblok/nuxt", "@nuxtjs/tailwindcss"],
  storyblok: {
    accessToken: process.env.STORYBLOK_TOKEN,
  },
});
