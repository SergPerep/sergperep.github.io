import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'image_src', href: '/cover-image.jpg'}],
    ['meta', { property: 'og:title', content: "Sergei Perepelkin" }],
    ['meta', { property: 'og:description', content: "Software Engineer, comic artist and storyteller based in Utrecht, the Netherlands" }]
  ],
  title: "Sergei Perepelkin",
  description: "Software Engineer, comic artist and storyteller based in Utrecht, the Netherlands"
})
