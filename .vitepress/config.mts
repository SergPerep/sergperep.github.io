import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    anchor: { level: undefined },
    theme: {
      light: 'min-light',
      dark: 'github-light'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:image', content: '/thumbnail-image.jpg'}],
    ['meta', { property: 'og:title', content: "Sergei Perepelkin" }],
    ['meta', { property: 'og:description', content: "Software Engineer, comic artist and storyteller based in Utrecht, the Netherlands" }]
  ],
  title: "Sergei Perepelkin",
  description: "Software Engineer, comic artist and storyteller based in Utrecht, the Netherlands"
})
